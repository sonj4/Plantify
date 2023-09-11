import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import Button from '../../../common/components/Button';
import { colors } from '../../../common/global styles/GlobalStyles';
import openMap from 'react-native-open-maps';



const SinglePlantScreen = ({ route, navigation }) => {
    const { item } = route.params;
    console.log("SINGLE ADMIN PLANT SCREEN: ",item)


    const handleIdentify = () => {
        navigation.navigate('IdentifyPlant', { item: item })
        console.log('Identify button pressed');
    };
    function openUserLocation(x, y) {
        console.log("X: ", x, "Y: ",y)
        openMap({ latitude: x, longitude: y });
      }

    return (
        <SafeAreaView contentContainerStyle={styles.container}>
            {item.identificationStatus === "Unidentified" ? 
            <ScrollView >
            <View style={styles.unidentified}>
                
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <Text style={styles.statusText}>Plant is still Unidentified</Text>
                {/* <Button title="Identify" onPress={handleIdentify} /> */}
                <Button onPress={handleIdentify}><Text>Identify</Text></Button>
            </View>
               
            </ScrollView> : 
            <ScrollView>
            <View>
                <Text style={styles.statusText}>Name:</Text>
                <Text style={styles.statusText}>{item.name}</Text>
                <Text style={styles.statusText}>Care Instructions:</Text>
                <Text style={styles.statusText}>{item.careInstructions}</Text>
                <Text style={styles.statusText}>To See Where the Plant Grows Click on the Button Below:</Text>
                <Button onPress={() => openUserLocation( item.locations[0].coordinates[1],item.locations[0].coordinates[0])}><Text>Open Map</Text></Button>
                
            </View>
        </ScrollView>
        }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    unidentified: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 20
    },
    image: {
        borderRadius: 10,
        width: '100%',  
        height: 300,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    statusText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary
    },
    identified: {
        // Styles for identified plants
    },
    map: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    }
    
})

export default SinglePlantScreen;
