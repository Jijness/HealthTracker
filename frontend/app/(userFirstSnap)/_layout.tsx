import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="height"
        options={{
          title: "Height",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="weight"
        options={{
          title: "Weight",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
