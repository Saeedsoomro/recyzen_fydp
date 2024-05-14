import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BusinessListByCategoryScreen from '../Screens/BusinesListByCategoryScreen/BusinessListByCategoryScreen';
import BusinessDetailsScreen from '../Screens/BusinessDetailsScreen/BusinessDetailsScreen';
import CustomerManagementScreen from '../Screens/CustomerManagementScreen/CustomerManagementScreen'; // Import CustomerManagementScreen
import CustomersEditingDeletingScreen from '../Screens/CustomersEditingDeletingScreen/CustomersEditingDeletingScreen';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';

const Stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='home' component={HomeScreen} />
      <Stack.Screen name='business-list' component={BusinessListByCategoryScreen} />
      <Stack.Screen name='business-detail' component={BusinessDetailsScreen} />
      {/* Add CustomerManagementScreen to the navigation stack */}
      <Stack.Screen name='CustomerManagement' component={CustomerManagementScreen} />
      <Stack.Screen
        name="CustomersEditingDeletingScreen"
        component={CustomersEditingDeletingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
