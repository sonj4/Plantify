import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { colors } from "../../../common/global styles/GlobalStyles";
import Button from "../../../common/components/Button";

const UserScreen = ({route, navigation}) => {

    const {item} = route.params;
    console.log(item)

    const handleEdit = () => {
        navigation.navigate("AddEditUser", {add: false, userData: item})
    }

    const handlePlants = () => {
        
    }

    const handleDelete = () => {
        
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Profile Picture:</Text>
            <Image
                source={item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/icons/add-image.png')}
                style={styles.profilePicture}
            />
            <Text style={styles.label}>ID: {item._id}</Text>
            <Text style={styles.label}>Email: {item.email}</Text>
            <Text style={styles.label}>Username: {item.username}</Text>
            <Button onPress={handleEdit}>
                <Text>Edit User</Text>
            </Button>
            <Button onPress={handlePlants}>
                <Text>See Users Plants</Text>
            </Button>
            <Button onPress={handleDelete}>
                <Text>Delete User</Text>
            </Button>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        gap:10,
        backgroundColor: colors.lightGreen,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 30
    },
    label: {
        fontSize: 20,
        color: colors.primary
    },
    buttonText: {
        fontSize: 20
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
        
    },
})

export default UserScreen;