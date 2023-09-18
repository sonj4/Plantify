import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  View,
} from 'react-native';
import {colors} from '../../../common/global styles/GlobalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from '../../../utils/axios';
import {useAuth} from '../../authentication/AuthContext';
import Button from '../../../common/components/Button';
import openMap from 'react-native-open-maps';
import CustomModal from '../../../common/components/CustomModal';

const SinglePlantScreen = ({route, navigation}) => {
  const {token} = useAuth();
  const plant = route?.params?.plant;
  console.log(plant.imageUrl);
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

  };

  const handleDelete = async () => {
    try {
      console.log('delete');
      await axios.delete(`/user/plants/${plant._id}`, {
        headers: {
          Authorization: token,
        },
      });
      setMsg('Plant Deleted Successfully!')
      handleShowModal();
      console.log('Plant deleted successfully');
      if (route.params?.onPlantDeleted) {
        console.log("ima fju za brisanje")
        route.params.onPlantDeleted(plant._id);
      }
  
      setTimeout(() => {
        navigation.goBack();
      }, 2000)
    } catch (error) {
      console.error('Error deleting plant:', error);
      setMsg('Error while deleting plant!');
    }
  };
  function openUserLocation(x, y) {
    console.log('X: ', x, 'Y: ', y);
    openMap({latitude: x, longitude: y});
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{uri: plant.imageUrl}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.nameIconWrapper}>
          <Text style={styles.title}>{plant.name}</Text>
          <TouchableOpacity onPress={handleDelete}>
            <Image
              source={require('../../../assets/icons/delete.png')}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>{plant.careInstructions}</Text>
        </ScrollView>
        {plant.identificationStatus === 'Identified' ? (
          <Button
            onPress={() =>
              openUserLocation(
                plant.locations[0].coordinates[1],
                plant.locations[0].coordinates[0],
              )
            }>
            <Text>Open Map</Text>
          </Button>
        ) : (
          <Text></Text>
        )}
      </ScrollView>
      <CustomModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        message={msg}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    marginBottom: 120,
  },
  shadow: {
    shadowColor: '#75DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    width: '95%',
    height: '50%',
    borderRadius: 20,
    position: 'relative',
    marginTop: 20,
    top: 0,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat-Medium',
    color: colors.primary,
    marginTop: 20,
  },
  instructionsContainer: {
    marginTop: 20,
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#363636',
    fontFamily: 'Roboto-Regular',
    lineHeight: 24,
  },
  deleteIcon: {
    width: 30,
    height: 30,
  },
  nameIconWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 30,
  },
});

export default SinglePlantScreen;
