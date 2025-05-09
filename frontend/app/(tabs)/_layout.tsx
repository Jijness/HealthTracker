import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
export default function TabLayout(){
  return (
    <Tabs screenOptions={{
      headerShown:false,
    }}>
      <Tabs.Screen name="home"
       options={{
        tabBarIcon:({color,size})=><Ionicons name="home" size={size} color={color} />,
        tabBarLabel:'Home1'
       }}
       />

      <Tabs.Screen name="about" 
         options={{
          tabBarIcon:({color,size})=><Ionicons name="information-circle" size={size} color={color} />,
          tabBarLabel:'About'
         }}
      />
      <Tabs.Screen name="analysis" 
         options={{
          tabBarIcon:({color,size})=><Ionicons name="analytics-outline" size={size} color={color} />,
          tabBarLabel:'Analysis'
         }}
      />
      <Tabs.Screen name="profile" 
         options={{
          tabBarIcon:({color,size})=><Ionicons name="person" size={size} color={color} />,
          tabBarLabel:'Profile'
         }}
      />
    </Tabs>
  )
}