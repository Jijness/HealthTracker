import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../(home)/header';
import HealthCard from '../(home)/healthCard'
import ActivitySummary from '../(home)/activitySummary';
import TabS from '../(home)/tabSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';


export default function Home() {
  const [dailyStat, setDailyStat] = useState(null);
  const [latestHealthSnap, setLatestHealthSnap] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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
          console.log("DailyStat after fetch:", data?.stats);
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
          console.log("LatestHealthSnap after fetch:", data?.healthSnap);
        }
      } catch (error) {
        console.error('Error fetching latest health snap:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <TabS />
        {latestHealthSnap && <HealthCard healthSnap={latestHealthSnap} />}
        {latestHealthSnap && <ActivitySummary dailyStat={dailyStat} healthSnap={latestHealthSnap} />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
  },
  hello: {
    fontSize: 14,
    margin: 10
  }
});
