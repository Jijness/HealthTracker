import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { icons } from '@/constants/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { Pedometer } from 'expo-sensors';

type ActivitySummaryProps = {
  initialSteps: number;
  initialSleepTime: string | null;
  initialWakeTime: string | null;
};

export default function ActivitySummary({ initialSteps, initialSleepTime, initialWakeTime }: ActivitySummaryProps) {
  const [steps, setSteps] = useState(initialSteps || 0);
  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const [lastSentSteps, setLastSentSteps] = useState(initialSteps || 0);

  useEffect(() => {
    if (initialSleepTime && initialWakeTime) {
      const sleep = new Date(initialSleepTime);
      const wake = new Date(initialWakeTime);
      // Tính thời gian ngủ bằng mili giây
      let difference = wake.getTime() - sleep.getTime();
      // Nếu wakeTime nhỏ hơn sleepTime (ngủ qua đêm) thì cộng thêm 24 giờ vào wakeTime
      if (difference < 0) {
        difference += 24 * 60 * 60 * 1000;
      }
      // Chuyển đổi mili giây sang giờ
      const hours = difference / (1000 * 60 * 60);
      setSleepHours(hours);
    } else {
      setSleepHours(null);
    }
  }, [initialSleepTime, initialWakeTime]);

  useEffect(() => {
    setSteps(initialSteps || 0);
    const intervalId = setInterval(() => {
      setSteps(prevSteps => prevSteps + Math.floor(Math.random() * 3)); // Mock tăng bước chân
    }, 1000);
    return () => clearInterval(intervalId);
  }, [initialSteps]);

  // Track step bang sensor
  useEffect(() => {
    let subscription: any = null;
    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      if (isAvailable) {
        subscription = Pedometer.watchStepCount(result => {
          setSteps(result.steps);
        });
      } else {
        console.log("Pedometer is not available on this device.");
      }
    }
    subscribe();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    }
  }, []);

  // Gui step cho backend sau khi gia tri thay doi 1 khoang dang ke
  useEffect(() => {
    const updateStepsOnBackend = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Authentication token not found.');
          return;
        }
        if (Math.abs(steps - lastSentSteps) >= 50) {
          const response = await fetch(`${API_BASE_URL}/dailyStat/step`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ steps }),
          });
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Failed to update steps:', errorData);
          } else {
            console.log('Steps updated on backend:', steps);
            setLastSentSteps(steps);
          }
        }
      } catch (error) {
        console.error('Error updating steps:', error);
      }
    };

    updateStepsOnBackend();
  }, [steps, lastSentSteps]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Summary</Text>

      <View style={styles.row}>
        {/* Steps */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#4CAF50' }]}>
            <Image source={icons.foot} style={styles.icon} />
          </View>
          <Text style={styles.label}>Steps counter</Text>
          <Text style={styles.value}>
            {steps} <Text style={styles.unit}>Steps</Text>
          </Text>
        </View>

        {/* Calories, chỗ này cũng cần tính toán hiển thị động cho frontend */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#FF7043' }]}>
            <Image source={icons.fire} style={styles.icon} />
          </View>
          <Text style={styles.label}>Calories burn from walk</Text>
          <Text style={styles.value}>
            384 <Text style={styles.unit}>KCal</Text>
          </Text>
        </View>
      </View>

      {/* Sleep */}
      <View style={[styles.box, styles.sleepBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#42A5F5' }]}>
          <Image source={icons.sleep} style={styles.icon} />
        </View>
        <View style={styles.sleepContent}>
          <Text style={styles.label}>Sleep</Text>
          <Text style={styles.value}>
            {sleepHours !== null ? sleepHours.toFixed(1) : '--'} <Text style={styles.unit}>Hours</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: '#E5DAC3',
    width: '48%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  sleepBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  unit: {
    fontSize: 14,
    color: '#888',
  },
  sleepContent: {
    marginLeft: 12,
  },
});
