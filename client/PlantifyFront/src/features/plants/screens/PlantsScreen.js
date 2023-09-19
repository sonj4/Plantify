import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import PlantCard from '../common/components/PlantCard';
import {colors} from '../../../common/global styles/GlobalStyles';
import axios from '../../../utils/axios';
import {useAuth} from '../../authentication/AuthContext';
import {getPlants} from '../../../services/userServices';
import {useFocusEffect} from '@react-navigation/native';

const PlantsScreen = ({navigation}) => {
  const {token} = useAuth();
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log('token  L : ', token);
  const loadPlants = async () => {
    try {
      const fetchedPlants = await getPlants(token);
      setPlants(fetchedPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
    }
  };

  useEffect(() => {
    loadPlants();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadPlants();
      return () => {}; // cleanup if needed
    }, []),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const fetchedPlants = await getPlants(token);
      setPlants(fetchedPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const removePlantById = id => {
    setPlants(prevPlants => prevPlants.filter(plant => plant._id !== id));
  };

  const renderItem = ({item}) => {
    return (
      <PlantCard
        plant={item}
        navigation={navigation}
        onPlantDeleted={removePlantById}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MY PLANTS: </Text>
      {plants.length !== 0 ? (
        <FlatList
          data={plants}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.title}>Current user has no plants.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: colors.primary,
    letterSpacing: 1,
  },
  listContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 120,
  },
});

export default PlantsScreen;
