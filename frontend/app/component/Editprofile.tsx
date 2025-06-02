import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { useTranslation } from 'react-i18next';
import '../../i18n';
interface Option {
  label: string;
  value: string;
}
interface SimpleOptionSelectorProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  items: Option[];
  t: (key: string) => string;
}

const SimpleOptionSelector: React.FC<SimpleOptionSelectorProps> = ({ label, value, onValueChange, items }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleSelectOption = (itemValue: string) => {
    onValueChange(itemValue);
    setIsOptionsVisible(false);
  };

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={() => setIsOptionsVisible(!isOptionsVisible)}>
        <Text>{value ? items.find(item => item.value === value)?.label || `Choose ${label.toLowerCase()}` : `Choose ${label.toLowerCase()}`}</Text>
      </TouchableOpacity>
      {isOptionsVisible && (
        <View style={styles.optionsContainer}>
          {items.map(item => (
            <TouchableOpacity key={item.value} style={styles.optionItem} onPress={() => handleSelectOption(item.value)}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

// Phần còn lại của component EditProfile giữ nguyên

export default function EditProfile() {
  const { t } = useTranslation();

  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [loading, setLoading] = useState(true);

  const genderList: Option[] = [
    { label: t('Male'), value: 'male' },
    { label: t('Female'), value: 'female' },
  ];

  const activityList: Option[] = [
    { label: t('label'), value: 'sedentary' },
    { label: t('label2'), value: 'light' },
    { label: t('label3'), value: 'moderate' },
    { label: t('label4'), value: 'active' },
    { label: t('label5'), value: 'very_active' },
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/(authenticate)/login');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/users/infor`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user profile:', response.status);
          return;
        }

        const data = await response.json();
        setFullName(data.user.full_name || '');
        setGender(data.user.gender || '');
        setBirthYear(String(data.user.birth_year || ''));
        setActivityLevel(data.user.activity_level || '');
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/(authenticate)/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/users/updateInfor`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          gender: gender,
          birth_year: parseInt(birthYear),
          activity_level: activityLevel,
        }),
      });

      if (!response.ok) {
        console.error('Failed to update profile:', response.status);
        return;
      }

      console.log('Updated profile!');
      router.back();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text>{t('Loading')}</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{t('EYP')}</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('FN')}</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder={t('YN')}
          />
        </View>

        <SimpleOptionSelector
          label={t('G')}
          value={gender}
          onValueChange={setGender}
          items={genderList}
          t={t} // Truyền hàm t xuống
        />

        <View style={styles.inputGroup}>
          <Text style={styles.label}>{t('BY')}</Text>
          <TextInput
            style={styles.input}
            value={birthYear}
            onChangeText={setBirthYear}
            placeholder={t('BY_p')}
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>

        <SimpleOptionSelector
          label={t('AL')}
          value={activityLevel}
          onValueChange={setActivityLevel}
          items={activityList}
          t={t} // Truyền hàm t xuống
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>{t('Save')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFC730',
  },
  scrollContainer: {
    paddingTop: 60,
    paddingBottom: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    color: '#3d3d3d',
  },
  inputGroup: {
    width: '85%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3d3d3d',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  pickerButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
  },
  optionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionItemLast: {
    borderBottomWidth: 0,
  },
  saveButton: {
    backgroundColor: '#d9d9d9',
    paddingVertical: 14,
    borderRadius: 8,
    width: '85%',
    marginTop: 30,
  },
  saveText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    color: '#333',
  },
});