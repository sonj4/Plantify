import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlantsScreen from "../features/plants/screens/PlantsScreen";
import PlantScreen from "../features/plants/screens/PlantScreen";

const Stack = createStackNavigator();

const PlantNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Plants" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Plants" component={PlantsScreen} />
            <Stack.Screen name="Plant" component={PlantScreen} />
        </Stack.Navigator>
    )
}

export default PlantNavigator;