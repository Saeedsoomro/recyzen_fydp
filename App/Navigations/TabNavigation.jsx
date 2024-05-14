import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import ProfileScreen from '../Screens/ProfileScreen/ProfileScreen';
import ScrapPriceScreen from '../Screens/ScrapRate/ScrapPriceScreen';
import Colors from '../Utils/Colors';
import BookingNavigation from './BookingNavigation';
import HomeNavigation from './HomeNavigation';
const Tab = createBottomTabNavigator();

export default function TabNavigation() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: Colors.PRIMARY
        }}>
            <Tab.Screen name='home' component={HomeNavigation}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Home</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen name='booking' component={BookingNavigation}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Booking</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="bookmark" size={size} color={color} />
                    )
                }} />
            <Tab.Screen name='Rates' component={ScrapPriceScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Rates</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (

                        <FontAwesome name="table" size={size} color={color} />)
                }} />
            <Tab.Screen name='wallet' component={ProfileScreen}
                options={{
                    tabBarLabel: ({ color }) => (
                        <Text style={{ color: color, fontSize: 12, marginTop: -7 }}>
                            Profile</Text>
                    ),
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user-circle" size={size} color={color} />
                    )
                }} />
        </Tab.Navigator>
    )
}