import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../splash/SplashScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import MainNavigator from "../../navigation/MainNavigator";
import AdminNavigator from "../admin/navigation/AdminNavigation";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainNavigator} />
            <Stack.Screen name="Admin" component={AdminNavigator} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;