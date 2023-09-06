import React, {useState, useEffect} from "react";
import { Text, View, FlatList, StyleSheet, RefreshControl } from "react-native";
import ItemCard from "../../../common/components/ItemCard";
import { fetchUsers } from "../services/userService";
import { useAuth } from "../../authentication/AuthContext";
import Button from "../../../common/components/Button";
import { colors } from "../../../common/global styles/GlobalStyles";
import { createUser } from "../services/userService";

const UsersScreen = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const {token} = useAuth();
    const [refreshing, setRefreshing] = useState(false);

    const handleNewUser = (newUser) => {
        setUsers((prevUsers) => [...prevUsers, newUser]);
    };
    
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const fetchedUsers = await fetchUsers(token);
            setUsers(fetchedUsers);
        } catch (error) {
            console.error("Error loading users:", error);
        } finally {
            setRefreshing(false);
        }
    };

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
        navigation.navigate("AddEditUser", {add: true, onNewUser: handleNewUser});
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
                        item={item}
                        navigation={navigation}
                        screenName="User" 
                    />
                )}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
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