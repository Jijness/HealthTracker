import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import '../../i18n';


export default function TabLayout() {
   const { t } = useTranslation();
   const insets = useSafeAreaInsets();

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: {
               bottom: insets.bottom,
               backgroundColor: '#fff',
               borderTopWidth: 0,
            },
         }}>
            <Tabs.Screen name="home"
               options={{
                  tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
                  tabBarLabel: t('Home')
               }}
            />
            <Tabs.Screen name="analysis"
               options={{
                  tabBarIcon: ({ color, size }) => <Ionicons name="analytics-outline" size={size} color={color} />,
                  tabBarLabel: t('Analysis')
               }}
            />
            <Tabs.Screen name="profile"
               options={{
                  tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                  tabBarLabel: t('Profile')
               }}
            />

            <Tabs.Screen name="setting"
               options={{
                  tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
                  tabBarLabel: t('Setting')
               }}
            />
         </Tabs>
      </SafeAreaView>
   )
}