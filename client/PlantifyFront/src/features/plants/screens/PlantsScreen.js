import React from 'react';
import { Text, View, FlatList, StyleSheet }from 'react-native';
import PlantCard from '../common/components/PlantCard';
import { colors } from '../../../common/global styles/GlobalStyles';

const PlantsScreen = ({navigation}) => {

  const dummyPlantsData = [
    { id: 1, name: 'Plant 1' },
    { id: 2, name: 'Plant 2' },
    { id: 3, name: 'Plant 3' },
    { id: 4, name: 'Plant 4' },
    { id: 5, name: 'Plant 5' },
    { id: 6, name: 'Plant 6' },
    { id: 7, name: 'Plant 7' },
    { id: 8, name: 'Plant 8' },
    { id: 9, name: 'Plant 9' },
    { id: 10, name: 'Plant 10' },
  ];
  
  const renderItem = ({ item }) => { 
    return <PlantCard plant={item} navigation={navigation}/>;
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>MY PLANTS: </Text>
        <FlatList
          data={dummyPlantsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
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