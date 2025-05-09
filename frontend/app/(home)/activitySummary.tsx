import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { icons } from '@/constants/icon';

export default function ActivitySummary() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Activity Summary hello</Text>

      <View style={styles.row}>
        {/* Steps */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#4CAF50' }]}>
            <Image source={icons.foot} style={styles.icon} />
          </View>
          <Text style={styles.label}>Steps token</Text>
          <Text style={styles.value}>
            4090 <Text style={styles.unit}>Steps</Text>
          </Text>
        </View>

        {/* Calories */}
        <View style={styles.box}>
          <View style={[styles.iconCircle, { backgroundColor: '#FF7043' }]}>
            <Image source={icons.fire} style={styles.icon} />
          </View>
          <Text style={styles.label}>Calories</Text>
          <Text style={styles.value}>
            384 <Text style={styles.unit}>KCal</Text>
          </Text>
        </View>
      </View>

      {/* Hydrate */}
      <View style={[styles.box, styles.hydrateBox]}>
        <View style={[styles.iconCircle, { backgroundColor: '#42A5F5' }]}>
          <Image source={icons.water} style={styles.icon} />
        </View>
        <View style={styles.hydrateContent}>
          <Text style={styles.label}>Hydrate</Text>
          <Text style={styles.value}>
            1700 <Text style={styles.unit}>ML</Text>
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
    height: 20,
    tintColor: 'black',
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
  hydrateContent: {
    marginLeft: 12,
  },
});
