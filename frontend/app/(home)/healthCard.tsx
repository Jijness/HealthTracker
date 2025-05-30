import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icon';
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface HealthSnap {
  totalScore?: number;
  // Add other properties if needed
}

interface HealthCardProps {
  healthSnap: HealthSnap;
}

export default function HealthCard({ healthSnap }: HealthCardProps) {
  const router = useRouter();
  const handlePress = () => {
    router.push('../component/healthSnapForm');
  }

  // Logic để tính toán phần trăm khỏe mạnh từ healthSnap
  const calculateHealthPercentage = (snap: any) => {
    const weight = snap.weight;
    const height = snap.height;
    if (weight && height) {
      const heightMeter = height / 100;
      const bmi = weight / (heightMeter * heightMeter);

      // Định nghĩa ngưỡng BMI khỏe mạnh (ví dụ: 18.5 - 24.9)
      const healthyBmiMin = 18.5;
      const healthyBmiMax = 24.9;
      if (bmi >= healthyBmiMin && bmi <= healthyBmiMax) {
        return 100; // Coi như 100% khỏe mạnh nếu BMI trong khoảng chuẩn
      } else if (bmi < healthyBmiMin) {
        // Tính phần trăm dựa trên khoảng cách đến ngưỡng dưới
        const percentage = (bmi / healthyBmiMin) * 50; // Giả sử dưới ngưỡng khỏe mạnh thì % tối đa là 50
        return Math.max(0, percentage);
      } else {
        // Tính phần trăm dựa trên khoảng cách đến ngưỡng trên
        const percentage = (healthyBmiMax / bmi) * 50; // Giả sử trên ngưỡng khỏe mạnh thì % tối đa là 50
        return Math.max(0, percentage);
      }
    }
    return 0;
  };
  const healthPercentage = calculateHealthPercentage(healthSnap);
  const progress = healthPercentage / 100;
  const statusText = healthPercentage > 70 ? 'You are healthy' : 'Keep improving';
  const progressBarColor = healthPercentage > 50 ? '#FDD835' : '#FFAB91';
  const subText = healthPercentage > 70 ? 'Keep it up! Healthy lifestyle on track' : 'Small steps lead to big changes';

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.iconCircle}>
            <Image source={icons.heart} style={styles.icon} />
          </View>
          <Ionicons name="qr-code" size={24} color="white" />
        </View>
        <Text style={styles.status}>{statusText}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.percentage}>{healthPercentage.toFixed(0)}%</Text>
          <View style={styles.progressSection}>
            <ProgressBar progress={progress} color={progressBarColor} style={styles.progressBar} />
            <Text style={styles.subtext}>{subText}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E53935',
    borderRadius: 16,
    padding: 20,
    margin: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  status: {
    color: 'white',
    fontSize: 16,
    fontStyle: 'italic',
    marginVertical: 8,
  },
  percentage: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginRight: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressSection: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 10,
    backgroundColor: '#fff3',
    marginBottom: 4,
  },
  subtext: {
    color: '#FFF',
    fontSize: 13,
  },
});
