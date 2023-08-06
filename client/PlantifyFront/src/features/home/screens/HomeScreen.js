import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image }from 'react-native'
import { globalStyles, colors } from '../../../common/global styles/GlobalStyles';
import { Camera } from 'react-native-vision-camera';


const HomeScreen = ({navigation}) => {

    useEffect(() => {
        async function getPermission() {
          const permission = await Camera.requestCameraPermission();
          console.log(`Camera permission status: ${permission}`);
          
        }
        getPermission();
      }, []);


    const handleCameraPress = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus();
        if (cameraPermission === 'authorized') {
          // Camera permission is already granted, continue with camera usage.
          console.log('Camera permission is granted.');
        } else if (cameraPermission === 'not-determined') {
          // Camera permission is not determined, request the permission.
          const newCameraPermission = await Camera.requestCameraPermission();
          if (newCameraPermission === 'authorized') {
            // Camera permission is now granted, continue with camera usage.
            console.log('Camera permission is granted.');
          } else {
            console.log('Camera permission request was denied or restricted.');
          }
        } else {
          console.log('Camera permission is denied or restricted.');
        }
      };
    

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Identify Your Plant</Text>
            <TouchableOpacity style={styles.cameraIconContainer} onPress={() => handleCameraPress()}>
                <Image 
                    source={require('../../../assets/icons/camera.png')} 
                    resizeMode="contain"
                    style={{
                        width: 70,
                        height: 70,
                        tintColor: colors.primary
                        // tintColor: focused ? '#46b47f' : '#a0abb5',
                    }}
                />
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: colors.primary,
        paddingHorizontal: 20,
        paddingTop: 30,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
      },
      cameraIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 100,
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 30,
      },
})

export default HomeScreen;