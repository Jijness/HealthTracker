import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { icons } from '@/constants/icon';
import { ProgressBar } from 'react-native-paper';

export default function HealthCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Image source={icons.heart} style={styles.icon} />
        </View>
        <Ionicons name="qr-code" size={24} color="white" />
      </View>
      <Text style={styles.status}>You are healthy</Text>
      <View style={styles.progressContainer}>
        <Text style={styles.percentage}>70%</Text>
        <View style={styles.progressSection}>
          <ProgressBar progress={0.9} color="#FDD835" style={styles.progressBar} />
          <Text style={styles.subtext}>Keep it up! Healthy lifestyle on track</Text>
        </View>
      </View>
    </View>
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
