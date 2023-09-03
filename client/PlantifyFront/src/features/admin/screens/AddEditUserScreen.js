import React, {useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomTextInput from "../../../common/components/CustomTextInput";
import { colors } from "../../../common/global styles/GlobalStyles";
import Button from "../../../common/components/Button";
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from "react-native-gesture-handler";

const AddEditUserScreen = ({route, navigation}) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [imageSource, setImageSource] = useState("");

    const { add } = route.params;

    const selectImageFromGallery = () => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (!response.didCancel && !response.error) {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setImageSource(imageUri);
            }
        });
    };

    async function uploadImageToFirebase(filePath) {
        if (!filePath) return;

        const imageName = filePath.split('/').pop();
        const reference = storage().ref('users/' + imageName);

        try {
            await reference.putFile(filePath);
            const url = await reference.getDownloadURL();
            return url;
        } catch (error) {
            console.error('Error during upload:', error);
            throw error;
        }
    }

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
            <Button>
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