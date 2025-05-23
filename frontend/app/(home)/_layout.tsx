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
      <Stack.Screen
        name="healthSnapForm" // Khai báo route cho healthSnapForm
        options={{
          title: "New health snapshot", // Tùy chỉnh title header nếu muốn
          headerShown: false, // Hiển thị header cho trang này (tùy chọn)
        }}
      />
    </Stack>
  );
}
