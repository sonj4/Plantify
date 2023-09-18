import React, {useState} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {colors} from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import {deleteUser} from '../services/userService';
import {useAuth} from '../../authentication/AuthContext';
import CustomModal from '../../../common/components/CustomModal';

const UserScreen = ({route, navigation}) => {
  const {item} = route.params;
  const {token} = useAuth();
  console.log('USER SCREEN:', item);
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleEdit = () => {
    navigation.navigate('AddEditUser', {add: false, userData: item});
  };

  const handlePlants = () => {
    navigation.navigate('Plants', {userData: item});
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUser(token, item._id);
      if (res) {
        setMsg('User Deleted Successfully!');
        setShowModal(true);
        if (route.params?.onUserDelete) {
          console.log('ima fju za brisanje');
          route.params.onUserDelete(item._id);
        }

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        setMsg('Error While Deleting User');
        setShowModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Profile Picture:</Text>
      <Image
        source={
          item.imageUrl
            ? {uri: item.imageUrl}
            : require('../../../assets/icons/add-image.png')
        }
        style={styles.profilePicture}
      />
      <Text style={styles.label}>ID: {item._id}</Text>
      <Text style={styles.label}>Email: {item.email}</Text>
      <Text style={styles.label}>Username: {item.username}</Text>
      <Button onPress={handleEdit}>
        <Text>Edit User</Text>
      </Button>
      <Button onPress={handlePlants}>
        <Text>See Users Plants</Text>
      </Button>
      <Button onPress={handleDelete}>
        <Text>Delete User</Text>
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

export default UserScreen;
