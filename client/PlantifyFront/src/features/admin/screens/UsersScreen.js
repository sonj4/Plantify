import React, {useState, useEffect} from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ItemCard from "../../../common/components/ItemCard";
import { fetchUsers } from "../services/userService";
import { useAuth } from "../../authentication/AuthContext";
import Button from "../../../common/components/Button";
import { colors } from "../../../common/global styles/GlobalStyles";

const UsersScreen = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const {token} = useAuth();

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const fetchedUsers = await fetchUsers(token);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error loading users:", error);
            }
        };

        loadUsers();
    }, []);

    const handlePress = () => {
        navigation.navigate("AddEditUser", {add: true})
        console.log(" test")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>USERS:</Text>
            <FlatList
                data={users.filter(user => user.username !== "admin")}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <ItemCard 
                        item={{
                            imageUrl: item.imageUrl,
                            name: `${item.username} (ID: ${item._id})`
                        }}
                        navigation={navigation}
                        screenName="User" 
                    />
                )}
            />
            {/* <TouchableOpacity onPress={handlePress}>
                <Text>Add New User</Text>
            </TouchableOpacity> */}
            <Button onPress={handlePress}>
                <Text>Add New User</Text>
            </Button>
    </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: colors.primary
    },
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingBottom: 130
    }
})

export default UsersScreen;