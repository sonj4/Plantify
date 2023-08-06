import React from "react";
import { View, StyleSheet, Image , Text} from "react-native";
import { colors } from "../../../../common/global styles/GlobalStyles";

const PlantCard = ({plant}) => {
    return (
        <View style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderRadius: 10,
            gap: 10,
            width: '90%',
            height: 100,
            marginHorizontal: 20,
            marginVertical: 10,
            position: 'relative',
            paddingHorizontal: 30,
            paddingVertical: 20,
            
            ...styles.shadow
        }}>
            <Image source={require('../../../../assets/images/plant.jpg')} style={styles.image}/>
            <Text style={styles.name}>Plant Name</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        width: 100,
        height: 80,
        resizeMode: 'contain'
    },
    name: {
        color: "#363636",
        fontFamily: 'Roboto-Regular',
        fontSize: 20
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
})

export default PlantCard;