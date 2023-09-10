import React from 'react';
import {View, Text} from 'react-native';

const SinglePlantScreen = ({route, navigation}) => {
    const {item} = route.params;
    console.log("ADMIN SINGLE PLANT: ,", item)
    return <View><Text>PLANT SCREEN</Text></View>
}


export default SinglePlantScreen;