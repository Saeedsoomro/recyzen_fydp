import { View, Text } from "react-native";
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessListByCategoryScreen from "../Screens/BusinesListByCategoryScreen/BusinessListByCategoryScreen";
import BusinessDetailsScreen from "../Screens/BusinessDetailsScreen/BusinessDetailsScreen";
import SignInScreen from "../Screens/LoginScreen/SignInScreen";
import SignUpScreen from "../Screens/LoginScreen/SignUpScreen";

const Stack = createStackNavigator();
export default function HomeNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="signin"
        component={SignInScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="signup"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen
        name="business-list"
        component={BusinessListByCategoryScreen}
      />
      <Stack.Screen name="business-detail" component={BusinessDetailsScreen} />
    </Stack.Navigator>
  );
}
