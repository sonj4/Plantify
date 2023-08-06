import React from 'react';
import { Text, View, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import { colors } from '../../../common/global styles/GlobalStyles';

const SinglePlantScreen = ({ route }) => {
    const plant = route?.params?.plant;
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Image section */}
      <Image
        source={require('../../../assets/images/plant.jpg')}
        style={styles.image}
        resizeMode="contain"
      />

      {/* Title section */}
      <Text style={styles.title}>{plant.name}</Text>

      {/* Instructions section */}
      <ScrollView contentContainerStyle={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          eu dui sit amet justo egestas vehicula. Nam vitae turpis euismod,
          cursus ligula a, vulputate turpis. In tempus sagittis ipsum, ac
          pharetra elit pellentesque a. Nullam eu eleifend mi, vel egestas
          felis. Nullam quis vulputate elit. 
        </Text>
      </ScrollView>
    </ScrollView>
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
        marginBottom: 120
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
    height: '50%', // Image takes the first half of the screen
    borderRadius: 20,
    //marginBottom: -20,
    position: 'relative',
    marginTop: 20,
    top: 0
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
 
});

export default SinglePlantScreen;
