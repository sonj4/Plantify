import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import CustomTextInput from '../../../common/components/CustomTextInput';
import {colors} from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import {launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {createUser, updateUser} from '../services/userService';
import uploadImageToFirebase from '../../../common/services/uploadImageToFirebase';
import {useAuth} from '../../authentication/AuthContext';
import CustomModal from '../../../common/components/CustomModal';

const AddEditUserScreen = ({route, navigation}) => {
  const {add, onNewUser, userData} = route.params;
  console.log('AEU: ', userData);

  const [email, setEmail] = useState(userData ? userData.email : '');
  const [username, setUsername] = useState(userData ? userData.username : '');
  const [password, setPassword] = useState('');
  const [imageSource, setImageSource] = useState(
    userData ? userData.imageUrl : '',
  );

  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const {token} = useAuth();

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
        const imageUrl = await uploadImageToFirebase(imageSource, 'users');
        const userData = {
          email,
          username,
          password,
          imageUrl,
        };
        console.log('userData: ', userData);

        const createdUser = await createUser(token, userData);
        if (createdUser) {
          setMsg('User Created Successfully!');
          handleShowModal();
          onNewUser(createdUser);
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        } else {
          setMsg('User Was not created Successfully');
          handleShowModal();
          console.error('User creation failed.');
        }
      } else {
        let updateData = {
          userId: userData._id,
          email,
          username,
        };
        console.log('RN UPDATE DATA: ', updateData);

        if (password && password !== '') {
          updateData.password = password;
        }

        // Check if the image has changed
        if (userData.imageUrl !== imageSource) {
          const imageUrl = await uploadImageToFirebase(imageSource, 'users');
          updateData.imageUrl = imageUrl;
        }

        const updatedUser = await updateUser(token, updateData);
        if (updatedUser) {
          setMsg('User Updated Successfully!');
          handleShowModal();
          
          setTimeout(() => {
            navigation.goBack();
          }, 2000);
        } else {
          console.error('User update failed.');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Picture</Text>
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
      <Text style={styles.label}>Email</Text>
      <CustomTextInput
        input={email}
        placeholder={'Email'}
        setInput={setEmail}
      />
      <Text style={styles.label}>Username</Text>
      <CustomTextInput
        input={username}
        placeholder={'Username'}
        setInput={setUsername}
      />
      <Text style={styles.label}>Password</Text>
      <CustomTextInput
        input={password}
        placeholder={'Password'}
        setInput={setPassword}
      />
      <Button onPress={handleButtonPress}>
        {add && <Text style={styles.buttonText}>Create User</Text>}
        {!add && <Text style={styles.buttonText}>Update User</Text>}
      </Button>
      <CustomModal
        handleCloseModal={handleCloseModal}
        message={msg}
        showModal={showModal}
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

export default AddEditUserScreen;
