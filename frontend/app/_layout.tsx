import { Slot } from 'expo-router';
import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Stack } from "expo-router";
import './global.css';
const InitialLayout = () => {
    return <Slot />;
  };
const RootLayout = () => {
    const colorScheme = useColorScheme();
  
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <StatusBar style="auto" />
                <Stack
                  screenOptions={{
                    headerShown: false,
                  }}
                >
<<<<<<< HEAD
                  <Stack.Screen name="(authentic)" />
                  <Stack.Screen name="(information)" />
                  <Stack.Screen name="(userFirstSnap)" />
                  <Stack.Screen name="(usetInforBody)" /> 
                  <Stack.Screen name="(tabs)" />  
=======
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="(authentic)" />
                  <Stack.Screen name="(information)" />
>>>>>>> 2c7b14e54ceb0f147796277cad1a037775fd4c9b
                  <Stack.Screen name="index" />
                </Stack>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
  };
  