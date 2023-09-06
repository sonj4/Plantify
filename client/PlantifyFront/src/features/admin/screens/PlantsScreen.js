import {View,Text, StyleSheet, FlatList} from 'react-native';
import { colors } from '../../../common/global styles/GlobalStyles';
import { useAuth } from "../../authentication/AuthContext";
import React, {useState, useEffect} from 'react';
import Button from '../../../common/components/Button';
import ItemCard from '../../../common/components/ItemCard';
const PlantsScreen = ({route, navigation}) => {
    const { userData } = route.params;
    const {token} = useAuth();
    return (
        <View>
            <Text style={styles.title}>PLANTS:</Text>
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


export default PlantsScreen;