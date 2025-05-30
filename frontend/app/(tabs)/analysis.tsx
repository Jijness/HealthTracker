import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import BMIChart from '../component/BMIChart'
import WeightChart from '../component/WeightChart'
import SleepChart from '../component/SleepChart'
import StepsChart from '../component/StepsChart'
import Calo from '../component/Calo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';


export default function analysis() {
  const [healthSnapData, setHealthSnapData] = useState<any[]>([]);
  const [dailyStatData, setDailyStatData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysisData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found.');
          return;
        }
        // Lấy dữ liệu healthSnap (BMI, Weight)
        const healthSnapResponse = await fetch(`${API_BASE_URL}/healthSnap`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!healthSnapResponse.ok) {
          throw new Error(`HTTP error! status: ${healthSnapResponse.status}`);
        } else {
          const healthSnapJson = await healthSnapResponse.json();
          setHealthSnapData(healthSnapJson.snaps);
        }

        const dailyStatResponse = await fetch(`${API_BASE_URL}/dailyStat`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!dailyStatResponse.ok) {
          console.error('Error fetching dailyStat data:', dailyStatResponse.status);
        } else {
          const dailyStatJson = await dailyStatResponse.json();
          setDailyStatData(dailyStatJson.stats);
        }

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);


  if (loading) {
    return <Text>Loading analysis data...</Text>;
  }

  if (error) {
    return <Text>Error loading analysis data: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BMIChart data={healthSnapData} />
        <WeightChart data={healthSnapData} />
        <SleepChart data={dailyStatData} />
        <StepsChart data={dailyStatData} />
      </ScrollView>
    </SafeAreaView>
  )
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
