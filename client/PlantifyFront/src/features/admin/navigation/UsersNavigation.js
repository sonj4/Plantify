import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import UsersScreen from "../screens/UsersScreen";
import UserScreen from "../screens/UserScreen";
import { colors } from "../../../common/global styles/GlobalStyles";
import AddEditUserScreen from "../screens/AddEditUserScreen";
import PlantsScreen from "../screens/PlantsScreen";
import SinglePlantScreen from "../screens/SinglePlantScreen";

const UsersNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Users" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="User" component={UserScreen} options={{
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50
                    },
                    headerTintColor: 'white',
                    headerTitle: null
                }}/>
            <Stack.Screen name="AddEditUser" component={AddEditUserScreen} options={{
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50
                    },
                    headerTintColor: 'white',
                    headerTitle: null
                }}/>
                <Stack.Screen name="Plants" component={PlantsScreen}  options={{
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50
                    },
                    headerTintColor: 'white',
                    headerTitle: null
                }} />

<Stack.Screen name="SinglePlant" component={SinglePlantScreen}  options={{
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50
                    },
                    headerTintColor: 'white',
                    headerTitle: null
                }} />
        </Stack.Navigator>
    )
}

export default UsersNavigator;