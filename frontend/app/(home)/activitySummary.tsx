import React, { useState, useCallback, useEffect, useRef } from 'react';
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
  // số bước bán đầu từ backend cho ngày hiện tại
  const initialStepsFromDailyStat = dailyStat?.steps || 0;

  // currentSteps sẽ là tổng số bước hiển thị trên UI
  const [currentSteps, setCurrentSteps] = useState(initialStepsFromDailyStat);
  // Số bước cuối cùng được gửi lên backend
  const [lastSentSteps, setLastSentSteps] = useState(initialStepsFromDailyStat);
  // Ref để theo dõi trạng thái sẵn sàng của Pedometer (có khả dụng và có quyền không)
  const pedometerAvailable = useRef(false);
  // Lưu trữ số bước *tổng cộng của thiết bị* tại thời điểm bắt đầu theo dõi
  // Dùng để tính toán số bước *tăng thêm trong phiên hiện tại*
  const deviceTotalStepsAtSessionStart = useRef<number | null>(null);

  // Ref cho thời điểm cuối cùng dữ liệu được gửi lên backend
  const lastSendTime = useRef(Date.now());
  const sendInterval = useRef(30000); // Khoảng thời gian mặc định để gửi (30 giây)



  const [sleepHours, setSleepHours] = useState<{ hours: number; minutes: number } | null>(null);
  const [calories, setCalories] = useState(0);


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


  // Effect để cập nhật currentSteps và lastSentSteps khi initialDailySteps từ backend thay đổi (ví dụ: sang ngày mới)
  useEffect(() => {
    setCurrentSteps(initialStepsFromDailyStat);
    setLastSentSteps(initialStepsFromDailyStat);
    lastSendTime.current = Date.now();
    // Khi initialDailySteps thay đổi, cần reset điểm neo của pedometer
    // để nó được tính toán lại cho ngày mới.
    deviceTotalStepsAtSessionStart.current = null;
  }, [initialStepsFromDailyStat]);

  // 1, Kiểm tra quyền và tính khả dụng của Pedometer, thiết lập điểm neo ban đầu
  useEffect(() => {
    const checkPedometerAvailability = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      pedometerAvailable.current = isAvailable;
      if (isAvailable) {
        const { status } = await Pedometer.getPermissionsAsync(); // Lấy trạng thái quyền hiện tại
        if (status !== 'granted') {
          console.log('Pedometer permission not granted, requesting...');
          const { status: newStatus } = await Pedometer.requestPermissionsAsync();
          if (newStatus === 'granted') {
            console.log('Pedometer permission granted!');
            pedometerAvailable.current = true; // Cập nhật lại trạng thái
          } else {
            console.error('Pedometer permission not granted after request!');
            pedometerAvailable.current = false;
            return;
          }
        } else {
          console.log('Pedometer permission already granted.');
          pedometerAvailable.current = true;
        }
      } else {
        console.log("Pedometer is not available on this device.");
        pedometerAvailable.current = false;
      }
    };
    checkPedometerAvailability();
  }, []);


  // 2, Theo dõi bước chân từ Pedometer và tính toán số bước hiển thị
  useEffect(() => {
    let subscription: any = null;

    const subscribeToSteps = async () => {
      if (pedometerAvailable.current) {
        console.log("Subscribing to Pedometer updates.");
        subscription = Pedometer.watchStepCount(result => {
          // 'result.steps' là TỔNG số bước mà thiết bị đã ghi nhận từ đầu ngày.
          // Chúng ta cần tính toán số bước *mới được thêm* kể từ điểm neo của mình.
          if (deviceTotalStepsAtSessionStart.current === null) {
            // Nếu đây là lần đầu tiên watchStepCount báo cáo, lấy đây làm điểm neo của thiết bị
            deviceTotalStepsAtSessionStart.current = result.steps;
            console.log(`Pedometer: First update, setting device total steps anchor to ${result.steps}`);
          }
          // Số bước mới được ghi nhận trong phiên hiện tại từ pedometer
          // Đảm bảo không âm, nếu điểm neo chưa có thì coi như 0
          const stepsGainedInSession = deviceTotalStepsAtSessionStart.current !== null
            ? Math.max(0, result.steps - deviceTotalStepsAtSessionStart.current)
            : 0;
          // Tổng số bước hiển thị là:
          // số bước ban đầu từ backend + số bước mới được Pedometer ghi nhận trong phiên này.
          const newTotalDisplaySteps = initialStepsFromDailyStat + stepsGainedInSession;
          // Cập nhật state currentSteps, đảm bảo số bước không bao giờ giảm
          setCurrentSteps((prev: number) => Math.max(prev, newTotalDisplaySteps));

          // Log để gỡ lỗi
          console.log(`Pedometer update: Device total=${result.steps}, Anchor: (session start total)=${deviceTotalStepsAtSessionStart.current}, Steps in session=${stepsGainedInSession}, Display Total=${newTotalDisplaySteps}`);
        });
      } else {
        console.log("Pedometer not ready or initial anchor not set, not subscribing to watch.");
      }
    };
    if (pedometerAvailable.current) {
      subscribeToSteps();
    } else {
      console.log("Pedometer not available yet, waiting for permission/availability.");
    }
    return () => {
      if (subscription) {
        console.log("Unsubscribing from Pedometer updates.");
        subscription.remove();
        subscription = null;
      }
    };
  }, [initialStepsFromDailyStat, pedometerAvailable.current]);

  // 3. Tối ưu gửi dữ liệu lên Backend
  // Sử dụng useCallback để hàm này không bị tạo lại mỗi khi component re-render,
  // giúp cho useEffect sử dụng nó không bị chạy lại không cần thiết.
  const sendStepsToBackend = useCallback(async (stepsToSend: number) => {
    // Chỉ gửi nếu số bước hiện tại lớn hơn số bước cuối cùng đã gửi
    if (stepsToSend > lastSentSteps) {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.log('No token found. Cannot send steps.');
          router.replace('/(authenticate)/login');
          return;
        }

        // Gọi API PATCH để cập nhật bước chân
        const response = await fetch(`${API_BASE_URL}/dailyStat/step`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ steps: stepsToSend }), // Gửi một giá trị duy nhất như backend mong đợi
        });

        if (response.ok) {
          console.log('Steps sent to backend successfully:', stepsToSend);
          setLastSentSteps(stepsToSend); // Cập nhật state lastSentSteps
          lastSendTime.current = Date.now(); // Cập nhật thời gian gửi cuối cùng
        } else {
          const errorData = await response.json();
          console.error('Failed to send steps to backend:', errorData.message || response.statusText);
        }
      } catch (error) {
        console.error('Error sending steps to backend:', error);
      }
    }
  }, [lastSentSteps]);

  // 4. Thiết lập useEffect để gửi dữ liệu lên backend định kỳ
  // Effect để kiểm tra và gửi dữ liệu lên backend định kỳ
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastSendTime.current;
      const stepsDifference = Math.abs(currentSteps - lastSentSteps);

      // Điều kiện gửi: 
      // 1. Số bước đã tăng lên đáng kể (>= 20) HOẶC đủ thời gian đã trôi qua (>= sendIntervalRef.current)
      // 2. Số bước hiện tại phải lớn hơn số bước cuối cùng đã gửi
      if ((stepsDifference >= 20 || timeElapsed >= sendInterval.current) && currentSteps > lastSentSteps) {
        console.log(`Triggering send: currentSteps=${currentSteps}, lastSentSteps=${lastSentSteps}, stepsDiff=${stepsDifference}, timeElapsed=${timeElapsed}`);
        sendStepsToBackend(currentSteps);
        // Điều chỉnh thời gian gửi dựa trên tốc độ thay đổi bước chân
        sendInterval.current = stepsDifference < 100 ? 30000 : 15000; // Gửi nhanh hơn nếu đi nhanh (delta lớn)
      }
    }, 10000); // Kiểm tra mỗi 10 giây một lần

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [currentSteps, lastSentSteps, sendStepsToBackend]);

  // Tinh toan calo dot chay dua tren buoc chan
  useEffect(() => {
    const calulateCalories = () => {
      const weight = healthSnap?.weight;
      const height = healthSnap.height / 100;
      const stepsWalked = currentSteps;

      if (weight && height && stepsWalked !== undefined && stepsWalked !== null) { // Add null/undefined check for stepsWalked
        const strideLength = height * 0.45; // Estimated stride length
        const distanceKm = (stepsWalked * strideLength) / 1000; // Distance walked in km
        const caloriesPerKgPerKm = 1; // Approx 1 cal/kg/km for walking
        const burned = distanceKm * weight * caloriesPerKgPerKm;
        setCalories(burned);
      } else {
        setCalories(0);
      }
    };
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