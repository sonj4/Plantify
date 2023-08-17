import React, {useState, useEffect} from 'react';
import { Text, View, ScrollView, Image, StyleSheet }from 'react-native'
import axios from '../../../utils/axios';
import { useAuth } from '../../authentication/AuthContext';
import { colors } from '../../../common/global styles/GlobalStyles';

const ProfileScreen = () => {

    const { token } = useAuth();
    const [userData, setUserData] = useState(null);


    useEffect(() => {
        async function fetchUserProfile() {
          try {
            const response = await axios.get('/user/profile', {
              headers: {
                Authorization: token,
              },
            });
            setUserData(response.data);
          } catch (error) {
            console.log('Error fetching user profile:', error);
          }
        }
    
        fetchUserProfile();
      }, [token]);

    return (
        <View style={styles.container}>
            {userData ? (
            <>
                <Image
                source={require('../../../assets/icons/add-image.png')} style={styles.profilePicture}
            />
                <Text style={styles.username}>{userData.username}</Text>
                <Text style={styles.email}>{userData.email}</Text>
                
            </>
            ) : (
            <Text>Loading...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.background,
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
      color: colors.primary
    },
    email: {
      fontSize: 16,
      color: colors.gray,
      marginBottom: 20,
      color: colors.primary
    },
  });

export default ProfileScreen;