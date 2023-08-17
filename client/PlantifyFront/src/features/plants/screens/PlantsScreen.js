import React, {useEffect, useState} from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator  }from 'react-native';
import PlantCard from '../common/components/PlantCard';
import { colors } from '../../../common/global styles/GlobalStyles';
import axios from '../../../utils/axios';
import { useAuth } from '../../authentication/AuthContext';

const PlantsScreen = ({navigation}) => {
  const { token } = useAuth();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log('token  L : ', token)

  useEffect(() => {
    async function fetchPlants() {
      try {
        const response = await axios.get('/user/plants', {
          headers: {
            Authorization: token,
          },
        });
        setPlants(response.data);
        console.log(response.data)
        console.log('dataaaa')
      } catch (error) {
        console.log("Error while fetching plants:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlants();
  }, [token]);
  
  
  const renderItem = ({ item }) => { 
    return <PlantCard plant={item} navigation={navigation}/>;
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>MY PLANTS: </Text>
        {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={plants}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    backgroundColor: colors.background
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
      color: colors.primary,
      letterSpacing: 1
    },
    listContainer: {
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 120,
    },
  });
  

export default PlantsScreen;