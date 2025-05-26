import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';

export default function EditProfile() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [loading, setLoading] = useState(true);

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
        // Xử lý lỗi cập nhật
        return;
      }

      console.log('Thông tin đã được cập nhật thành công!');
      router.back(); // Quay lại trang MyProfile sau khi lưu
    } catch (error) {
      console.error('Error updating profile:', error);
      // Xử lý lỗi
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text>Đang tải thông tin...</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Nhập tên của bạn"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giới tính</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn giới tính" value="" />
              <Picker.Item label="Nam" value="male" />
              <Picker.Item label="Nữ" value="female" />
            </Picker>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Năm sinh</Text>
          <TextInput
            style={styles.input}
            value={birthYear}
            onChangeText={setBirthYear}
            placeholder="Nhập năm sinh (YYYY)"
            keyboardType="number-pad"
            maxLength={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mức độ hoạt động</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={activityLevel}
              onValueChange={(itemValue) => setActivityLevel(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Chọn mức độ" value="" />
              <Picker.Item label="Ít vận động" value="sedentary" />
              <Picker.Item label="Nhẹ" value="light" />
              <Picker.Item label="Vừa phải" value="moderate" />
              <Picker.Item label="Năng động" value="active" />
              <Picker.Item label="Rất năng động" value="very_active" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Lưu</Text>
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
  },
  picker: {
    height: 45,
    width: '100%',
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
