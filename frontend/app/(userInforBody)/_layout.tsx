import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="gender"
        options={{
          title: "Gender",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="birthYear"
        options={{
          title: "Birth Year",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="activityLevel"
        options={{
          title: "Activity Level",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
