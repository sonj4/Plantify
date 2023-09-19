import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomTextInput from '../../../common/components/CustomTextInput';
import {colors} from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomModal from '../../../common/components/CustomModal';
import uploadImageToFirebase from '../../../common/services/uploadImageToFirebase';
import {useAuth} from '../../authentication/AuthContext';
import {createPlant, updatePlant} from '../services/plantService';

const AddEditPlantScreen = ({route, navigation}) => {
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const userData = route.params?.userData;
  const add = route.params.add;
  const plantData = route.params?.plantData;
  console.log('AEU: ', plantData);

  const [name, setName] = useState(plantData ? plantData.name : '');
  const [instructions, setInstructions] = useState(
    plantData ? plantData.careInstructions : '',
  );
  const [longitude, setLongitude] = useState(
    plantData && plantData.locations && plantData.locations[0]
      ? plantData.locations[0].coordinates[0].toString()
      : '',
  );
  const [latitude, setLatitude] = useState(
    plantData && plantData.locations && plantData.locations[0]
      ? plantData.locations[0].coordinates[1].toString()
      : '',
  );
  const [imageSource, setImageSource] = useState(
    plantData ? plantData.imageUrl : '',
  );
  const {token} = useAuth();
  console.log(longitude, latitude);

  const selectImageFromGallery = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.error) {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setImageSource(imageUri);
      }
    });
  };

  const handleButtonPress = async () => {
    try {
      if (add) {
        const imageUrl = await uploadImageToFirebase(imageSource, 'plants');
        const plantData = {
          userId: userData._id,
          name,
          instructions,
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
          imageUrl,
        };
        console.log('plantData: ', plantData);

        const createdPlant = await createPlant(token, plantData);
        if (createdPlant) {
          setMsg('Created Plant Successfully!');
          handleShowModal();
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        } else {
          console.error('Plant creation failed.');
        }
      } else {
        const updatedPlantData = {
          plantId: plantData._id,
          name,
          instructions,
          longitude,
          latitude,
         // imageUrl,
        };

        // if (plantData.imageUrl !== imageSource) {
        //   const imageUrl = await uploadImageToFirebase(imageSource, 'plants');
        //   updatedPlantData.imageUrl = imageUrl;
        // }

        const updatedPlant = await updatePlant(token, updatedPlantData);
        if (updatedPlant) {
          setMsg('Plant Updated Successfully!');
          handleShowModal();
          setTimeout(() => {
            navigation.navigate('Plants');
          }, 2000);
        } else {
          console.error('Plant update failed.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Plant Image</Text>
      <TouchableOpacity onPress={selectImageFromGallery}>
        <Image
          source={
            imageSource
              ? {uri: imageSource}
              : require('../../../assets/icons/add-image.png')
          }
          style={styles.profilePicture}
        />
      </TouchableOpacity>
      <Text style={styles.label}>Name</Text>
      <CustomTextInput
        value={name}
        input={name}
        // placeholder={'Name'}
        setInput={setName}
      />
      <Text style={styles.label}>Care Inctructions</Text>
      <CustomTextInput
        input={instructions}
        placeholder={'Care Instructions'}
        setInput={setInstructions}
      />
      <Text style={styles.label}>Longitude</Text>
      <CustomTextInput
        input={longitude}
        placeholder={'Longitude'}
        setInput={setLongitude}
      />
      <Text style={styles.label}>Latitude</Text>
      <CustomTextInput
        input={latitude}
        placeholder={'Latitude'}
        setInput={setLatitude}
      />
      <Button onPress={handleButtonPress}>
        {add && <Text style={styles.buttonText}>Create Plant</Text>}
        {!add && <Text style={styles.buttonText}>Update Plant</Text>}
      </Button>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        message={msg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 30,
  },
  label: {
    fontSize: 20,
    color: colors.primary,
  },
  buttonText: {
    fontSize: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});

export default AddEditPlantScreen;
