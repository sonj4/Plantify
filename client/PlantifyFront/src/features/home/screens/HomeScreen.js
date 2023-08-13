import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { colors, globalStyles } from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import axios from 'axios';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../../common/components/CustomModal';


const API_BASE_URL = 'http://192.168.37.117:5000/api/user/plants';

const HomeScreen = ({ navigation }) => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  const [showCamera, setShowCamera] = useState(false);
  const [imageSource, setImageSource] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageSource('');
  };

  useEffect(() => {
    async function getPermission() {
      const newCameraPermission = await Camera.requestCameraPermission();
      console.log(newCameraPermission);
    }
    getPermission();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto({});
      setImageSource(photo.path);
      setShowCamera(false);
      console.log(photo.path);
    }
  };

  const handleCameraPress = () => {
    if (device) {
      setShowCamera(true);
    } else {
      console.log('Camera not available');
    }
  };

  async function uploadImageToFirebase(filePath) {
    const imageName = filePath.split('/').pop();
    const reference = storage().ref('plants/'+imageName);
    
    try {
        await reference.putFile(filePath);
        const url = await reference.getDownloadURL();
        return url;
    } catch(error) {
        console.error("Error during upload:", error);
        throw error; // re-throwing so you can catch it outside this function too
    }
}



  const handleIdentify = async () => {
    try {
      if (imageSource !== '') {
        const imageUrl = await uploadImageToFirebase(imageSource);
        const userToken = await AsyncStorage.getItem('userToken');

        const headers = {
          Authorization: `${userToken}`,
        };
        await axios.post(API_BASE_URL, { imageUrl }, { headers });

      console.log("Image successfully uploaded and URL sent to backend");
      setMsg('Request successfully sent!');
      handleShowModal(); 
    } else {
        console.warn("No image to identify");
        setMsg('No image to identify.')
    }
    } catch(error) {
      console.error("Failed to identify plant:", error);
      setMsg("Failed to send the request.");
    }
  }

  if (device == null) {
    return <Text>Camera not available</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>IDENTIFY YOUR PLANT</Text>
      {showCamera ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.camButton} onPress={capturePhoto} />
          </View>
        </>
      ) : (
        <>
          {imageSource !== '' ? (
            <Image style={styles.image} source={{ uri: `file://${imageSource}` }} resizeMode="contain"/>
          ) : null}

          {imageSource !== '' && <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Button onPress={() => setShowCamera(true)}>
                <Text style={globalStyles.buttonText}>Retake</Text>
              </Button>
              
              <Button onPress={() => handleIdentify()}>
                <Text style={globalStyles.buttonText}>Identify</Text>
              </Button>
            </View>
          </View>}
          

          {imageSource === '' && <TouchableOpacity style={styles.cameraIconContainer} onPress={handleCameraPress}>
            <Image
              source={require('../../../assets/icons/camera.png')}
              resizeMode="contain"
              style={{
                width: 70,
                height: 70,
                tintColor: 'white',
              }}
            />
          </TouchableOpacity>}
        </>
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
    backgroundColor: colors.background
  },
  buttonContainer: {
    //backgroundColor: 'rgba(0,0,0,0.1)',
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
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
  image: {
    width: '50%',
    height: '50%',
    //aspectRatio: 9 / 16,
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
    top: 50
  }
});

export default HomeScreen;
