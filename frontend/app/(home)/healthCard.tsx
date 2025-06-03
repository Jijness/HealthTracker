import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icon';
import { ProgressBar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import '../../i18n';

interface HealthSnap {
  weight: number;
  height: number;
  bodyFat: number | null;
  muscleMass: number | null;
}

interface UserInfor {
  birth_year: number;
  gender: String;
  activity_level: String;
}

interface HealthCardProps {
  healthSnap: HealthSnap;
  userInfor: UserInfor;
}

const HealthCard = ({ healthSnap, userInfor }: HealthCardProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);
  const [healthPercentage, setHealthPercentage] = useState<number>(0);
  const [bmiCategory, setBmiCategory] = useState<string>('');
  const [calorieSuggestion, setCalorieSuggestion] = useState<string>('');

  const handlePress = () => {
    router.push('../component/healthSnapForm');
  };
  useEffect(() => {
    if (healthSnap && userInfor && userInfor.birth_year && userInfor.gender && userInfor.activity_level) {
      calculateHealthInfo();
    } else {
      console.log('Missing user or health data for calculation');
    }
  }, [healthSnap, userInfor]);

  // Logic để tính toán phần trăm khỏe mạnh từ healthSnap
  const calculateHealthInfo = () => {
    const { weight, height, bodyFat, muscleMass } = healthSnap;
    const { birth_year, gender, activity_level } = userInfor;

    if (weight && height && birth_year && gender && activity_level) {
      const heightMeter = height / 100;
      const calculatedBmi = weight / (heightMeter * heightMeter);
      setBmi(parseFloat(calculatedBmi.toFixed(1)));
      // Tính BMR
      
      let calculatedBmr;
      if (gender === 'male') {
        calculatedBmr = 66.5 + 13.75 * weight + 5.003 * height - 6.775 * (new Date().getFullYear() - birth_year);
      } else {
        calculatedBmr = 665.1 + 9.563 * weight + 1.85 * height - 4.676 * (new Date().getFullYear() - birth_year);
      }
      let calculatedBmrLeanMass;
      if (typeof bodyFat === 'number' && !isNaN(bodyFat)) {
        let lbm = typeof muscleMass === 'number' ? (muscleMass + (weight * (1 - bodyFat / 100))) / 2 : (weight * (1 - bodyFat / 100));
        calculatedBmrLeanMass = 370 + (21.6 * lbm);
        calculatedBmr = (calculatedBmr + calculatedBmrLeanMass) / 2;
      }

      setBmr(parseFloat(calculatedBmr.toFixed(0)));

      // Tính TDEE
      let activityFactor = 1.2; // Sedentary
      if (activity_level === 'light') activityFactor = 1.375;
      else if (activity_level === 'moderate') activityFactor = 1.55;
      else if (activity_level === 'active') activityFactor = 1.725;
      else if (activity_level === 'very_active') activityFactor = 1.9;
      const tdee = calculatedBmr * activityFactor;
      setTdee(parseFloat(tdee.toFixed(0)));

      // Tính phần trăm khỏe mạnh
      let healthScore = 50; // Điểm cơ bản
      if (calculatedBmi >= 18.5 && calculatedBmi <= 24.9) {
        healthScore += 30; // BMI khỏe mạnh
      } else if (calculatedBmi < 18.5) {
        healthScore += 10; // Thiếu cân
      } else {
        healthScore += 20; // Thừa cân
      }
      // Bạn có thể thêm logic dựa trên bodyFat và muscleMass nếu có
      setHealthPercentage(Math.min(100, healthScore));

      // Xác định trạng thái BMI và gợi ý calo
      if (calculatedBmi < 18.5) {
        setBmiCategory(t('Underweight'));
        setCalorieSuggestion(t('Eat more, aim for around') + ` ${Math.round(calculatedBmr + 300)} ` + t('calories'));
      } else if (calculatedBmi >= 25) {
        setBmiCategory(t('Overweight'));
        setCalorieSuggestion(t('Eat less, aim for around') + ` ${Math.round(calculatedBmr - 300)} ` + t('calories'));
      } else {
        setBmiCategory(t('Normal'));
        setCalorieSuggestion(t('Maintain current intake'));
      }
    }
  };
  const progress = healthPercentage / 100;
  const statusText = healthPercentage > 70 ? t('Good Health') : t('Needs Attention');
  const progressBarColor = healthPercentage > 50 ? '#FDD835' : '#FFAB91';
  const subText = healthPercentage > 70 ? t('Keep it up!') : t('Focus on improvement');

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      {/* Phần trăm và icon trái tim */}
      <View style={styles.headerContainer}>
        <View style={styles.iconContainer}>
          <Image source={icons.heart} style={styles.icon} />
        </View>
        <Text style={styles.percentage}>{healthPercentage.toFixed(0)}%</Text>
      </View>

      <Text style={styles.status}>{statusText}</Text>

      {/* Thanh tiến trình */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color={progressBarColor} style={styles.progressBar} />
        <Text style={styles.subtext}>{subText}</Text>
      </View>

      {/* Thông tin chi tiết */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>{t('Your Health Metrics')}</Text>

        <View style={styles.metricRow}>
          {bmi !== null && (
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('BMI')}</Text>
              <Text style={styles.metricValue}>{bmi} ({bmiCategory})</Text>
            </View>
          )}
          {bmr !== null && (
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('BMR')}</Text>
              <Text style={styles.metricValue}>{bmr} {t('calories/day')}</Text>
            </View>
          )}
          {tdee !== null && (
            <View style={styles.metricItem}>
              <Text style={styles.metricLabel}>{t('TDEE')}</Text>
              <Text style={styles.metricValue}>{tdee} {t('calories/day')}</Text>
            </View>
          )}
        </View>

        {bmiCategory && <Text style={styles.suggestionText}>{calorieSuggestion}</Text>}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#E53935',
    borderRadius: 16,
    padding: 20,
    margin: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
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
    marginBottom: 10,
  },
  percentage: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 10,
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
  infoContainer: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff3',
  },
  infoTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metricItem: {
    flex: 1,
    marginRight: 10,
  },
  metricLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  metricValue: {
    color: 'white',
    fontSize: 14,
  },
  suggestionText: {
    color: '#FFF',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 4,
  },
});

export default HealthCard;