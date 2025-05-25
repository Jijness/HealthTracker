import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditProfile() {
  const router = useRouter();
  const [name, setName] = useState('Hoàng Trọng');
  const [gender, setGender] = useState('Male');
  const [height, setHeight] = useState('170cm');
  const [weight, setWeight] = useState('77.0 Kg');

  const handleSave = () => {
    console.log('Dữ liệu đã lưu:', { name, gender, height, weight });
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ và tên</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nhập tên của bạn"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giới tính</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Nhập giới tính"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Chiều cao</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Nhập chiều cao (cm)"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cân nặng</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Nhập cân nặng (Kg)"
            keyboardType="numeric"
          />
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
