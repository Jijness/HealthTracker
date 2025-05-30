import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';

export default function SleepInput() {
  const router = useRouter();

  const now = new Date();
  const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);

  const [sleepTime, setSleepTime] = useState(sixHoursAgo);
  const [wakeTime, setWakeTime] = useState(now);
  const [modePicker, setModePicker] = useState<'sleep' | 'wake' | null>(null);

  const showPicker = (mode: 'sleep' | 'wake') => setModePicker(mode);
  const hidePicker = () => setModePicker(null);

  const handleConfirm = (date: Date) => {
    if (modePicker === 'sleep') setSleepTime(date);
    else if (modePicker === 'wake') setWakeTime(date);
    hidePicker();
  };


  const handleSaveSleepTime = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const sleepHours = sleepTime.getHours().toString().padStart(2, '0');
      const sleepMinutes = sleepTime.getMinutes().toString().padStart(2, '0');
      const sleepTimeString = `${sleepHours}:${sleepMinutes}`;

      const wakeHours = wakeTime.getHours().toString().padStart(2, '0');
      const wakeMinutes = wakeTime.getMinutes().toString().padStart(2, '0');
      const wakeTimeString = `${wakeHours}:${wakeMinutes}`;

      const data = JSON.stringify({
        sleepTime: sleepTimeString,
        wakeTime: wakeTimeString,
      });

      const response = await fetch(`${API_BASE_URL}/dailyStat/sleep`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: data,
      })
      if (response.ok) {
        console.log("updated sleep-wake time");
      } else {
        console.log("update sleep-wake failed");
      }
      router.back(); // Quay lại trang ActivitySummary
    } catch (err) {
      console.error('Error updating sleep infor:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Sleep Time</Text>

      {/* Sleep */}
      <TouchableOpacity onPress={() => showPicker('sleep')} style={styles.button}>
        <Text>Sleep: {sleepTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {/* Wake */}
      <TouchableOpacity onPress={() => showPicker('wake')} style={styles.button}>
        <Text>Wake:  {wakeTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={modePicker !== null}
        mode="time"
        display={Platform.OS === 'android' ? 'spinner' : 'spinner'}
        date={modePicker === 'sleep' ? sleepTime : wakeTime}
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />



      <TouchableOpacity style={styles.saveButton} onPress={handleSaveSleepTime}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5DC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E8B57',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  timePickerButton: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#FFF',
    color: '#333',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
  },
  saveText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 20
  },
});