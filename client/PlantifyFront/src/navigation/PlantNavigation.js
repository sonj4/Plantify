import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PlantsScreen from "../features/plants/screens/PlantsScreen";
import SinglePlantScreen from "../features/plants/screens/SinglePlantScreen";
import { colors } from "../common/global styles/GlobalStyles";

const Stack = createStackNavigator();

const PlantNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Plants" >
            <Stack.Screen name="Plants" component={PlantsScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SinglePlantScreen" component={SinglePlantScreen} 
                options={{
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: colors.primary,
                        borderBottomLeftRadius: 50,
                        borderBottomRightRadius: 50
                    },
                    headerTintColor: 'white',
                    headerTitle: null
                }}
            />
        </Stack.Navigator>
    )
}

export default PlantNavigator;