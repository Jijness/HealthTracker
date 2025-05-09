import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'
export default function Layout() {
  return(
  <Stack>
    <Stack.Screen
      name="gender"
      options={{
        title:"Gender",
        headerShown:false,
      }}
    />
    <Stack.Screen
      name="age"
      options={{
        title:"Age",
        headerShown:false,
      }}
    />
    <Stack.Screen
      name="height"
      options={{
        title:"height",
        headerShown:false,
      }}
    />
    <Stack.Screen
      name="weight"
      options={{
        title:"weight",
        headerShown:false,
      }}
    />
  </Stack>)
}