import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors, globalStyles } from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import storage from '@react-native-firebase/storage';
import CustomModal from '../../../common/components/CustomModal';
import axios from '../../../utils/axios';
import { useAuth } from '../../authentication/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [imageSource, setImageSource] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');

  const { token } = useAuth();

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageSource('');
  };

  const capturePhoto = () => {
    console.log("wtf")
    // launchCamera({ mediaType: 'photo' }, (response) => {
    //   if (!response.didCancel && !response.error) {
    //     let imageUri = response.uri || response.assets?.[0]?.uri;
    //     setImageSource(imageUri);
    //   }
    // });
    launchCamera({ mediaType: 'photo' }, (response) => {
      console.log(response); // Log the entire response object
      if (response.error) {
         console.error("Camera Error:", response.error);
      }
      if (!response.didCancel && !response.error) {
         let imageUri = response.uri || response.assets?.[0]?.uri;
         setImageSource(imageUri);
      }
   });
   
  };

  const selectImageFromGallery = async () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImageSource(imageUri);
      }
    });
  }

  async function uploadImageToFirebase(filePath) {
    const imageName = filePath.split('/').pop();
    const reference = storage().ref('plants/' + imageName);

    try {
      await reference.putFile(filePath);
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Error during upload:', error);
      throw error;
    }
  }

  const handleIdentify = async () => {
    try {
      if (imageSource !== '') {
        const imageUrl = await uploadImageToFirebase(imageSource);

        await axios.post('/user/plants', { imageUrl }, {
          headers: {
            Authorization: token,
          },
        });

        console.log('Image successfully uploaded and URL sent to backend');
        setMsg('Request successfully sent!');
        handleShowModal();
      } else {
        console.warn('No image to identify');
        setMsg('No image to identify.');
      }
    } catch (error) {
      console.error('Failed to identify plant:', error);
      setMsg('Failed to send the request.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>IDENTIFY YOUR PLANT</Text>
      {imageSource ? (
        <>
          <Image style={styles.image} source={{ uri: imageSource }} resizeMode="contain" />

          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Button onPress={capturePhoto}>
                <Text style={globalStyles.buttonText}>Camera</Text>
              </Button>

              <Button onPress={selectImageFromGallery}>
                <Text style={globalStyles.buttonText}>Gallery</Text>
              </Button>

              <Button onPress={handleIdentify}>
                <Text style={globalStyles.buttonText}>Identify</Text>
              </Button>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.camerasContainer}>
          <TouchableOpacity style={styles.cameraIconContainer} onPress={capturePhoto}>
            <Image
              source={require('../../../assets/icons/camera.png')}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cameraIconContainer} onPress={selectImageFromGallery}>
            <Image
              source={require('../../../assets/icons/add-image.png')}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>
        </View>
      )}
      <CustomModal showModal={showModal} handleCloseModal={handleCloseModal} message={msg} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  buttonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 120,
    padding: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: '50%',
    height: '50%',
  },
  cameraIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    color: colors.primary,
    fontSize: 28,
    letterSpacing: 2,
    fontFamily: 'Montserrat-Medium',
    position: 'absolute',
    top: 50,
  },
  camerasContainer: {
    flexDirection: "row",
    gap: 20
  }
});

export default HomeScreen;
