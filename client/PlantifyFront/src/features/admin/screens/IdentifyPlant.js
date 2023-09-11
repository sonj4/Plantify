import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Text, TextInput, StyleSheet } from 'react-native';
import Button from '../../../common/components/Button';
import { colors } from '../../../common/global styles/GlobalStyles';
import axios from '../../../utils/axios';
import { useAuth } from '../../authentication/AuthContext';
import CustomModal from '../../../common/components/CustomModal';

const IdentiftyPlant = ({ route, navigation }) => {
    const { item } = route.params;
    console.log("IDENT PLANT: ", item)
    const {token} = useAuth();
    const [name, setName] = useState('');
    const [careInstructions, setCareInstructions] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [showModal, setShowModal] = useState(false);
  const [msg, setMsg] = useState('');
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);

  };

    const handleSubmit = async () => {

        const plantData = {
            name,
            careInstructions,
            longitude,
            latitude
        };
    
        console.log(plantData);
        try {
            const plantId = item._id;
            const response = await axios.put(`/admin/identify/plants/${plantId}`, plantData, {
                headers: {
                    Authorization: token
                }
            })
            if (response.status === 200) {
                console.log('Plant successfully identified and updated.');
                setMsg('Plant successfully identified and updated.')
                handleShowModal();
                
                // Optionally, navigate or show a success message to the admin
            }
        } catch (error) {
            console.error(error);
            throw error;
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.label}>Plant Name:</Text>
                <TextInput 
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter plant name"
                />

                <Text style={styles.label}>Care Instructions:</Text>
                <TextInput 
                    style={styles.input}
                    value={careInstructions}
                    onChangeText={setCareInstructions}
                    placeholder="Enter care instructions"
                    multiline
                />

                <Text style={styles.label}>Longitude:</Text>
                <TextInput 
                    style={styles.input}
                    value={longitude}
                    onChangeText={setLongitude}
                    placeholder="Enter longitude"
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Latitude:</Text>
                <TextInput 
                    style={styles.input}
                    value={latitude}
                    onChangeText={setLatitude}
                    placeholder="Enter latitude"
                    keyboardType="numeric"
                />

                <Button onPress={handleSubmit}> 
                    <Text>Identify</Text>
                </Button>
                </View>
            </ScrollView>
            <CustomModal showModal={showModal} handleCloseModal={handleCloseModal} message={msg} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: colors.primary
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        color: colors.primary
    }
});

export default IdentiftyPlant;
