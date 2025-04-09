import { Stack } from "expo-router";
import './global.css';
export default function RootLayout() {
  return(
  <Stack>
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown:false, 
      }}
    />
    <Stack.Screen
      name="index"
      options={{
        title:"Intro",
        headerShown:false,
      }}
    />
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
