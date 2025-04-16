import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'
export default function Layout() {
  return(
  <Stack>
    <Stack.Screen
      name="register"
      options={{
        title:"Register",
        headerShown:false,
      }}
    />
    <Stack.Screen
      name="login"
      options={{
        title:"Login",
        headerShown:false,
      }}
    />
  </Stack>)
}