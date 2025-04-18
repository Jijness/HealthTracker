import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {images} from "@/constants/images"
import {icons} from "@/constants/icon"
export default function ActivitySummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Summary</Text>

      <View style={styles.row}>
        {/* Steps */}
        <View style={[styles.box, { backgroundColor: '#D1D5DB' }]}>
          <Image
            source={icons.foot}
            style={styles.icon1}
          />
          <Text style={styles.label}>Steps token</Text>
          <Text style={styles.value}>4090 Steps</Text>
        </View>

        {/* Calories */}
        <View style={[styles.box, { backgroundColor: '#D1D5DB' }]}>
          <Image
            source={icons.fire}
            style={styles.icon2}
          />
          <Text style={styles.label}>Calories</Text>
          <Text style={styles.value}>384 KCal</Text>
        </View>
      </View>

      {/* Hydrate */}
      <View style={[styles.box2, { backgroundColor: '#D1D5DB' }]}>
        <Image
          source={icons.water}
          style={styles.icon3}
        />
        <Text style={styles.label}>Hydrate</Text>
        <Text style={styles.value}>1700 ML</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
    width: '40%',
    borderRadius: 16,
    padding: 10,
    margin: 10,
  },
  box2: {
    width: '100%',
    height:200,
    borderRadius: 16,
    padding: 10,
    margin: 10,
  },
  icon1: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  icon2: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  icon3: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
