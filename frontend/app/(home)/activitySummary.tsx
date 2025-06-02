import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Platform } from 'react-native';
import { icons } from '@/constants/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { Pedometer } from 'expo-sensors';
import { PermissionStatus } from 'expo-modules-core';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import '../../i18n';

interface ActivitySummaryProps {
  dailyStat: any;
  healthSnap: any;
}

export default function ActivitySummary({ dailyStat, healthSnap }: ActivitySummaryProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const steps = dailyStat?.steps || 0;
  const [sleepHours, setSleepHours] = useState<{ hours: number; minutes: number } | null>(null);

  const [currentSteps, setCurrentSteps] = useState(steps);

  const [calories, setCalories] = useState(0);

  const [lastSentSteps, setLastSentSteps] = useState(steps);
  const lastSendTime = useRef(Date.now());
  const sendInterval = useRef(30000);

  const pedometerAvailable = useRef(false);

  useEffect(() => {
    if (dailyStat?.sleepTime && dailyStat?.wakeTime) {
      const sleep = new Date(dailyStat.sleepTime);
      const wake = new Date(dailyStat.wakeTime);
      let differenceInMillis = wake.getTime() - sleep.getTime();
      // Xử lý trường hợp ngủ qua đêm
      if (differenceInMillis < 0) {
        differenceInMillis += 24 * 60 * 60 * 1000;
      }
      // Tính toán giờ và phút
      const totalMinutes = Math.floor(differenceInMillis / (1000 * 60));
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setSleepHours({ hours, minutes });
    } else {
      setSleepHours(null);
    }
  }, [dailyStat?.sleepTime, dailyStat?.wakeTime]);

  useEffect(() => {
    setCurrentSteps(steps);
    setLastSentSteps(steps);
    lastSendTime.current = Date.now();
  }, [steps]);

  // Kiểm tra quyền và tính khả dụng của Pedometer
  useEffect(() => {
    const checkPedometerAvailability = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      pedometerAvailable.current = isAvailable;
      if (isAvailable) {
        if (status !== 'granted') {
          const { status: newStatus } = await Pedometer.requestPermissionsAsync();
          if (newStatus !== 'granted') {
            console.error('Pedometer permission not granted!');
            pedometerAvailable.current = false;
          }
        }
      } else {
        console.log("Pedometer is not available on this device.");
      }
    };
    checkPedometerAvailability();
  }, []);


  // Theo dõi bước chân bằng watchStepCount (cho Android khi getStepCountAsync không hỗ trợ)
  useEffect(() => {
    let subscription: any = null;
    const subscribeToSteps = async () => {
      if (pedometerAvailable.current) {
        subscription = Pedometer.watchStepCount(result => {
          // Quan trọng: Sử dụng hàm cập nhật state để tránh race conditions
          setCurrentSteps((prevSteps: number) => Math.max(prevSteps, steps) + result.steps);
        });
      }
    };
    subscribeToSteps();
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [steps, pedometerAvailable]);

  // Gui step cho backend sau khi gia tri thay doi 1 khoang dang ke
  useEffect(() => {
    const sendStepsOnBackend = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('Authentication token not found.');
          return;
        }
        const currentTime = Date.now();
        const timeElapsed = currentTime - lastSendTime.current;
        const stepsDifference = Math.abs(currentSteps - lastSentSteps);

        if ((stepsDifference >= 20 || timeElapsed >= sendInterval.current) &&
          currentSteps > lastSentSteps) {
          const response = await fetch(`${API_BASE_URL}/dailyStat/step`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ steps: currentSteps }),
          });
          if (response.ok) {
            console.log('Steps updated on backend:', currentSteps);
            setLastSentSteps(currentSteps);
            lastSendTime.current = currentTime;
            // Điều chỉnh thời gian gửi dựa trên tốc độ thay đổi bước chân
            sendInterval.current = stepsDifference < 100 ? 30000 : 15000; // Gửi nhanh hơn nếu đi nhanh
          } else {
            console.error('Failed to update steps:', await response.json());
          }
        }
      } catch (error) {
        console.error('Error updating steps:', error);
      }
    };

    const intervalId = setInterval(sendStepsOnBackend, 10000); // Kiểm tra mỗi 10 giây
    return () => clearInterval(intervalId);
  }, [currentSteps, lastSentSteps]);

  // Tinh toan calo dot chay dua tren buoc chan
  useEffect(() => {
    const calulateCalories = () => {
      const weight = healthSnap?.weight;
      const height = healthSnap.height / 100;
      const stepsWalked = currentSteps;

      const strideLength = height * 0.45;
      const distanceKm = (stepsWalked * strideLength) / 1000;
      const caloriesPerKgPerKm = 1; // 1 calo/kg/km
      const burned = distanceKm * weight * caloriesPerKgPerKm;
      setCalories(burned);
    }
    calulateCalories();
  }, [currentSteps, healthSnap.height, healthSnap.weight]);

  const handleSleepPress = () => {
    router.push('/component/SleepInput');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('TitleA')}</Text>

      <View style={styles.row}>
        {/* Steps */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#4CAF50' }]}>
            <Image source={icons.foot} style={styles.icon} />
          </View>
          <Text style={styles.label}>{t('StepT')}</Text>
          <Text style={styles.value}>
            {currentSteps} <Text style={styles.unit}>{t('Step')}</Text>
          </Text>
        </View>

        {/* Calories, chỗ này cũng cần tính toán hiển thị động cho frontend */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#FF7043' }]}>
            <Image source={icons.fire} style={styles.icon} />
          </View>
          <Text style={styles.label}>{t('Calories')}</Text>
          <Text style={styles.value}>
            {calories.toFixed(0)} <Text style={styles.unit}>{t('C')}</Text>
          </Text>
        </View>
      </View>

      {/* Sleep */}
      <Pressable onPress={handleSleepPress} style={[styles.box, styles.sleepBox]}>
        <View style={[styles.iconCircle, { backgroundColor: 'white' }]}>
          <Image source={icons.sleep} style={styles.icon} />
        </View>
        <View style={styles.sleepContent}>
          <Text style={styles.label}>{t('EST')}</Text>
          <Text style={styles.value}>
            {sleepHours !== null ?
              `${sleepHours.hours} Hour${sleepHours.hours !== 1 ? 's' : ''} ${sleepHours.minutes} Min${sleepHours.minutes !== 1 ? 's' : ''}`
              : '--'}
          </Text>
        </View>
      </Pressable>



      <View style={[styles.box, styles.hydrateBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#42A5F5' }]}>
          <Image source={icons.water} style={styles.icon} />
        </View>
        <View style={styles.hydrateContent}>
          <Text style={styles.label}>{t('Hydrate')}</Text>
          <Text style={styles.value}>
            1700 <Text style={styles.unit}>{t('ML')}</Text>
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
  hydrateBox: { 
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
    height: 20
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
    flex: 1,
  },
  hydrateContent: {
    marginLeft: 12,
    flex: 1
  },
});