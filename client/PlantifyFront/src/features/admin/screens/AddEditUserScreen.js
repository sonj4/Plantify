import React, {useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomTextInput from "../../../common/components/CustomTextInput";
import { colors } from "../../../common/global styles/GlobalStyles";
import Button from "../../../common/components/Button";
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from "react-native-gesture-handler";
import { createUser, updateUser } from "../services/userService";
import uploadImageToFirebase from "../../../common/services/uploadImageToFirebase";
import { useAuth } from "../../authentication/AuthContext";

const AddEditUserScreen = ({route, navigation}) => {

    const { add, onNewUser, userData } = route.params;
    console.log("AEU: ", userData)

    const [email, setEmail] = useState(userData ?  userData.email : "");
    const [username, setUsername] = useState(userData? userData.username : "");
    const [password, setPassword] = useState(userData? userData.password : "");
    const [imageSource, setImageSource] = useState(userData ? userData.imageUrl : "");
    const { token } = useAuth();

    const selectImageFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageSource(imageUri);
            }
        });
    };

    const handleButtonPress = async () => {
      
        try {
            if (add) {
                const imageUrl = await uploadImageToFirebase(imageSource, 'users');
                const userData = {
                    email,
                    username,
                    password,
                    imageUrl,
                };
                console.log("userData: ", userData)
        
                const createdUser = await createUser(token, userData);
                if (createdUser) {
                    onNewUser(createdUser);
                    navigation.goBack();
                } else {
                    console.error('User creation failed.');
                }
            } else {
                let updateData = {
                    userId: userData._id,
                    email,
                    username,
                    password,
                };
                console.log("RN UPDATE DATA: ", updateData)
    
                // Check if the image has changed
                if (userData.imageUrl !== imageSource) {
                    const imageUrl = await uploadImageToFirebase(imageSource, 'users');
                    updateData.imageUrl = imageUrl;
                }
    
                const updatedUser = await updateUser(token, updateData);
                if (updatedUser) {
                    navigation.goBack();
                } else {
                    console.error('User update failed.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Profile Picture</Text>
            <TouchableOpacity onPress={selectImageFromGallery}>
                <Image
                    source={imageSource ? { uri: imageSource } : require('../../../assets/icons/add-image.png')}
                    style={styles.profilePicture}
                />
            </TouchableOpacity>
            <Text style={styles.label}>Email</Text>
            <CustomTextInput input={email} placeholder={"Email"} setInput={setEmail} />
            <Text style={styles.label}>Username</Text>
            <CustomTextInput input={username} placeholder={"Username"} setInput={setUsername}/>
            <Text style={styles.label}>Password</Text>
            <CustomTextInput input={password} placeholder={"Password"} setInput={setPassword}/>
            <Button onPress={handleButtonPress}>
                {add && <Text style={styles.buttonText}>Create User</Text>}
                {!add && <Text style={styles.buttonText}>Update User</Text>}
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

export default AddEditUserScreen; 