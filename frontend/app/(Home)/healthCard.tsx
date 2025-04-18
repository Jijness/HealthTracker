import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {images} from "@/constants/images"
import {icons} from "@/constants/icon"
export default function HealthCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={icons.heart} style={styles.icon} />
        <Ionicons name="qr-code" size={24} color="white" />
      </View>
      <Text style={styles.status}>You are healthy</Text>
      <Text style={styles.percentage}>70%</Text>
      <Text style={styles.subtext}>Keep it up! Healthy lifestyle on track</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width:370,
    height:228,
    backgroundColor: 'red',
    borderRadius: 16,
    padding: 20,
    margin: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  status: {
    color: 'white',
    fontSize: 16,
    marginVertical: 6,
  },
  percentage: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtext: {
    color: 'white',
    fontSize: 14,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  }
});
