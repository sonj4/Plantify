import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Button from '../../../common/components/Button';
import {colors} from '../../../common/global styles/GlobalStyles';
import openMap from 'react-native-open-maps';
import {deletePlant} from '../services/plantService';
import {useAuth} from '../../authentication/AuthContext';
import CustomModal from '../../../common/components/CustomModal';

const SinglePlantScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [plantData, setPlantData] = useState(item);
  const {token} = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log('SINGLE ADMIN PLANT SCREEN: ', plantData);

  const updatePlantData = updatedData => {
    setPlantData(updatedData);
  };

  const handleIdentify = () => {
    navigation.navigate('IdentifyPlant', {
      item: plantData,
      onIdentification: updatePlantData, // This is the callback
    });
    console.log('Identify button pressed');
  };

  function openUserLocation(x, y) {
    console.log('X: ', x, 'Y: ', y);
    openMap({latitude: x, longitude: y});
  }

  const handleDelete = async () => {
    try {
      const success = await deletePlant(token, plantData._id); // Assuming you have the token in this component
      if (success) {
        console.log('Plant successfully deleted.');
        setMsg('Plant Successfully deleted!');
        handleShowModal();
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        console.error('Failed to delete plant.');
      }
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  const handleEdit = () => {
    navigation.navigate('AddEditPlantScreen', {add: false, plantData: item})
  }

  return (
    <View style={styles.container}>
      {item.identificationStatus === 'Unidentified' ? (
        <ScrollView>
          <View style={styles.unidentified}>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
            <Text style={styles.statusText}>Plant is still Unidentified</Text>
            {/* <Button title="Identify" onPress={handleIdentify} /> */}
            <Button onPress={handleIdentify}>
              <Text>Identify</Text>
            </Button>
          </View>
        </ScrollView>
      ) : (
        <ScrollView>
          <View>
            <Image source={{uri: item.imageUrl}} style={styles.image} />
            <Text style={styles.statusText}>Name:</Text>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.statusText}>Care Instructions:</Text>
            <Text style={styles.statusText}>{item.careInstructions}</Text>
            <Text style={styles.statusText}>Location:</Text>
            <Button
              onPress={() =>
                openUserLocation(
                  item.locations[0].coordinates[1],
                  item.locations[0].coordinates[0],
                )
              }>
              <Text>Open Map</Text>
            </Button>
            <TouchableOpacity onPress={handleDelete}>
              <Image
                source={require('../../../assets/icons/delete.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
            <Button onPress={handleEdit}><Text>Edit Plant</Text></Button>
          </View>
          <CustomModal
            handleCloseModal={handleCloseModal}
            message={msg}
            showModal={showModal}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: colors.lightGreen,
    height: '100%',
  },
  unidentified: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  image: {
    borderRadius: 10,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.primary,
  },

  deleteIcon: {
    marginTop: 30,
    width: 30,
    height: 30,
  },
});

export default SinglePlantScreen;
