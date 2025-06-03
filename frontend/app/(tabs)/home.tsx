import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../(home)/header';
import HealthCard from '../(home)/healthCard'
import ActivitySummary from '../(home)/activitySummary';
import TabS from '../(home)/tabSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { useFocusEffect } from '@react-navigation/native';


export default function Home() {

  const [dailyStat, setDailyStat] = useState(null);
  const [latestHealthSnap, setLatestHealthSnap] = useState(null);
  const [userInformation, setUserInformation] = useState(null);

  const fetchData = useCallback(async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('Authentication token not found.');
      return;
    }
    // Fetch DailyStat hôm nay
    try {
      const response = await fetch(`${API_BASE_URL}/dailyStat/today`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to fetch daily stats:', errorData);
        return;
      } else {
        const data = await response.json();
        setDailyStat(data?.stats || null);
      }
    } catch (error) {
      console.error('Error fetching today\'s daily stat:', error);
    }

    // Fetch HealthSnap mới nhất
    try {
      const healthSnapResponse = await fetch(`${API_BASE_URL}/healthSnap/latest`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!healthSnapResponse.ok) {
        const errorData = await healthSnapResponse.json();
        console.error('Failed to fetch latest health snap:', errorData);
      } else {
        const data = await healthSnapResponse.json();
        setLatestHealthSnap(data?.healthSnap || null);
      }
    } catch (error) {
      console.error('Error fetching latest health snap:', error);
    }

    // Fetch thông tin người dùng
    try {
      const userResponse = await fetch(`${API_BASE_URL}/users/infor`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error('Failed to fetch user information:', errorData);
      } else {
        const data = await userResponse.json();
        setUserInformation(data?.user || null);
      }
    } catch (err) {
      console.error('Error fetching user information:', err);
    }
  }, []);


  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <TabS />
        {latestHealthSnap && userInformation && <HealthCard healthSnap={latestHealthSnap} userInfor={userInformation} />}
        {latestHealthSnap && <ActivitySummary dailyStat={dailyStat} healthSnap={latestHealthSnap} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hello: {
    fontSize: 14,
    margin: 10
  }
});
