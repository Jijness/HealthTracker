import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import Header from '../(home)/header';
import HealthCard from '../(home)/healthCard'
import ActivitySummary from '../(home)/activitySummary';
import TabS from '../(home)/tabSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';


export default function Home() {
  const [steps, setSteps] = useState(0);
  const [sleepTime, setSleepTime] = useState<string | null>(null);
  const [wakeTime, setWakeTime] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayStats = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Authentication token not found.');
          return;
        }

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
        }

        const data = await response.json();
        if (data && data.stats) {
          setSteps(data.stats.steps || 0);
          setSleepTime(data.stats.sleepTime || null);
          setWakeTime(data.stats.wakeTime || null);
        } else {
          setSteps(0);
          setSleepTime(null);
          setWakeTime(null);
        }

      } catch (error) {
        console.error('Error fetching today\'s daily stat:', error);
      }
    };

    fetchTodayStats();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <TabS />
        <HealthCard />
        <ActivitySummary initialSteps={steps} initialSleepTime={sleepTime} initialWakeTime={wakeTime} />
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
