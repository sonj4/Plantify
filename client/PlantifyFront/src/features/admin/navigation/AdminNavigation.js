import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../../profile/screens/ProfileScreen";
import NotificationsScreen from "../../notifications/screens/NotificationsScreen";
import { StyleSheet, Text, View, Image, TouchableOpacity} from "react-native";
import { colors } from "../../../common/global styles/GlobalStyles";
import UsersNavigator from "./UsersNavigation";

const Tab = createBottomTabNavigator();

const tabItems = [
  {
    name: "Users",
    component: UsersNavigator,
    icon: require('../../../assets/icons/group.png'),
    label: "Users",
  },
  {
    name: "Profile",
    component: ProfileScreen,
    icon: require('../../../assets/icons/user.png'),
    label: "Profile",
  },
  {
    name: "Notifications",
    component: NotificationsScreen,
    icon: require('../../../assets/icons/notification.png'),
    label: "Notifications",
  },
];

const CustomTabBarIcon = ({ focused, iconName, label }) => (
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Image
      source={iconName}
      resizeMode="contain"
      style={{
        width: 25,
        height: 25,
        tintColor: focused ? '#46b47f' : '#a0abb5',
      }}
    />
    <Text style={{
      color: focused ? '#46b47f' : '#a0abb5',
      fontSize: 12,
    }}>{label}</Text>
  </View>
);

const AdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: "white",
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
      }}
    >
      {tabItems.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => (
              <CustomTabBarIcon
                focused={focused}
                iconName={tab.icon}
                label={tab.label}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#75DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default AdminNavigator;