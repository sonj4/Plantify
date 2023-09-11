import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import UsersScreen from "../screens/UsersScreen";
import UserScreen from "../screens/UserScreen";
import { colors } from "../../../common/global styles/GlobalStyles";
import AddEditUserScreen from "../screens/AddEditUserScreen";
import PlantsScreen from "../screens/PlantsScreen";
import SinglePlantScreen from "../screens/SinglePlantScreen";
import IdentiftyPlant from "../screens/IdentifyPlant";

const defaultScreenOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },
    headerTintColor: 'white',
    headerTitle: null
};

const UsersNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Users" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Users" component={UsersScreen} />
            <Stack.Screen name="User" component={UserScreen} options={{ ...defaultScreenOptions }} />
            <Stack.Screen name="AddEditUser" component={AddEditUserScreen} options={{ ...defaultScreenOptions }} />
            <Stack.Screen name="Plants" component={PlantsScreen} options={{ ...defaultScreenOptions }} />
            <Stack.Screen name="SinglePlant" component={SinglePlantScreen} options={{ ...defaultScreenOptions }} />
            <Stack.Screen name="IdentifyPlant" component={IdentiftyPlant} options={{ ...defaultScreenOptions }} />
        </Stack.Navigator>
    )
}

export default UsersNavigator;
