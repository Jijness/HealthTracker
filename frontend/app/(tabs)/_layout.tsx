import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function TabLayout() {
   return (
      <Tabs screenOptions={{
         headerShown: false,
         tabBarStyle: { backgroundColor: "#FFC730" },
      }}>
         <Tabs.Screen name="home"
            options={{
               tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
               tabBarLabel: 'Home'
            }}
         />
         <Tabs.Screen name="analysis"
            options={{
               tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" size={size} color={color} />,
               tabBarLabel: 'Analysis'
            }}
         />
         <Tabs.Screen name="profile"
            options={{
               tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
               tabBarLabel: 'Profile'
            }}
         />

         <Tabs.Screen name="setting"
            options={{
               tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
               tabBarLabel: 'Setting'
            }}
         />
      </Tabs>
   )
}