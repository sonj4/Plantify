import {colors} from '../../../common/global styles/GlobalStyles';
import {useAuth} from '../../authentication/AuthContext';
import React, {useState, useEffect} from 'react';
import Button from '../../../common/components/Button';
import ItemCard from '../../../common/components/ItemCard';
import {getPlants} from '../services/userService';
import {Text, View, FlatList, StyleSheet, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const PlantsScreen = ({route, navigation}) => {
  //   const {userData} = route.params;
  const userData = route.params?.userData;

  console.log('USER DATA FROM PLANTS SCREEN: ', userData);
  const {token} = useAuth();
  const [plants, setPlants] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const loadPlants = async () => {
    setLoading(true);
    try {
      const fetchedPlants = await getPlants(token, userData._id);
      setPlants(fetchedPlants);
      console.log(fetchedPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
      setError('Failed to load plants. Please try again.');
    } finally {
      setLoading(false);
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

  const handlePress = () => {
    navigation.navigate('AddEditPlantScreen', {add: true, userData: userData});
  };
  if (loading) {
    return <Text>Loading plants...</Text>;
  }
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PLANTS:</Text>
      {plants.length != 0 ? (
        <FlatList
          data={plants}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <ItemCard
              item={item}
              navigation={navigation}
              screenName="SinglePlant"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text style={styles.title}>Current user has no plants.</Text>
      )}
      <Button onPress={handlePress}>
        <Text>Add New Plant</Text>
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: colors.primary,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingBottom: 130,
  },
});

export default PlantsScreen;
