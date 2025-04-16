import { View, Text } from 'react-native'
import { Stack } from "expo-router";
import React from 'react'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          title: "home",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
