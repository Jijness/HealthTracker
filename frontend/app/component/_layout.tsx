import { View, Text } from 'react-native'
import { Stack, Tabs } from "expo-router";
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="Myprofile"
        options={{
          title: "myprofile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Editprofile"
        options={{
          title: "editprofile",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditUser"
        options={{
          title: "edituser",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="healthSnapForm"
        options={{
          title: "New health snapshot",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SleepInput"
        options={{
          title: "SleepInput",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
