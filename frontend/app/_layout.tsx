import { Slot } from 'expo-router';
import 'react-native-reanimated';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
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
  const statusBarColor = '#FFC730';

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40, backgroundColor: statusBarColor }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <StatusBar style="dark" backgroundColor={statusBarColor} translucent={true} />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(authenticate)" />
            <Stack.Screen name="(home)" />
            <Stack.Screen name="(userFirstSnap)" />
            <Stack.Screen name="(userInforBody)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default RootLayout;