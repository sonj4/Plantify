import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, TextInput } from 'react-native';
import axios from '../../../utils/axios';
import { useAuth } from '../../authentication/AuthContext';
import { colors } from '../../../common/global styles/GlobalStyles';
import Button from '../../../common/components/Button';
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import { useNavigation } from '@react-navigation/native';


const ProfileScreen = () => {
    const navigation = useNavigation(); 
    const { token, logout } = useAuth();
    const [userData, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUsername, setEditedUsername] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [imageSource, setImageSource] = useState('');

    async function fetchUserProfile() {
        try {
            const response = await axios.get('/user/profile', {
                headers: {
                    Authorization: token,
                },
            });
            setUserData(response.data);
            setEditedUsername(response.data.username);
            setEditedEmail(response.data.email);
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, [token]);

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

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleChangeProfilePicture = () => {
        selectImageFromGallery();
    };

    const handleSaveChanges = async () => {
        try {
            let updatedProfileData = {
                username: editedUsername,
                email: editedEmail
            };

            if (imageSource && imageSource !== userData.imageUrl) {
                try {
                    const imageUrl = await uploadImageToFirebase(imageSource);
                    updatedProfileData.imageUrl = imageUrl;
                } catch (err) {
                    console.log("Error during image upload:", err);
                }
            }

            await axios.put('/user/profile', updatedProfileData, {
                headers: {
                    Authorization: token,
                },
            });

            setIsEditing(false);
            fetchUserProfile();
        } catch (error) {
            console.log('Error updating user profile:', error);
        }
    };

    const handleLogout = () => {
        logout(() => {
            navigation.navigate('Splash'); // Navigate to SplashScreen after logout
        });
    };

    const dummyFunction = () => {
        console.log("dummy")
    }

    return (
        <View style={styles.container}>
            {userData ? (
                <>
                    <TouchableOpacity onPress={ isEditing ? handleChangeProfilePicture : dummyFunction}>
                        <Image
                            source={imageSource ? { uri: imageSource } : (userData.imageUrl || userData.imageUrl === "default-picture-url" ? { uri: userData.imageUrl } : require('../../../assets/icons/add-image.png'))}
                            style={styles.profilePicture}
                        />
                    </TouchableOpacity>
                    {isEditing ? (
                        <>
                            <TextInput
                                value={editedUsername}
                                onChangeText={setEditedUsername}
                                style={styles.input}
                            />
                            <TextInput
                                value={editedEmail}
                                onChangeText={setEditedEmail}
                                style={styles.input}
                            />
                            <Button onPress={handleSaveChanges}>
                                <Text>Save Changes</Text>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Text style={styles.username}>username: {userData.username}</Text>
                            <Text style={styles.email}>email: {userData.email}</Text>
                            <Button onPress={handleEditProfile}>
                                <Text>Edit Profile</Text>
                            </Button>
                            <Button onPress={handleLogout}>
                                <Text>Log Out</Text>
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.background,
        paddingVertical: 130
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: colors.primary,
    },
    email: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.primary,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        color: 'black'
    },
});

export default ProfileScreen;
