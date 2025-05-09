import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabSelector() {
  return (
    <View style={styles.tabContainer}>
      <Text style={[styles.tab, styles.activeTab]}>Daily Summary</Text>
      <Text style={styles.tab}>Workouts</Text>
      <Text style={styles.tab}>Energy Efficiency</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  tab: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 20,
    fontSize: 14,
  },
  activeTab: {
    backgroundColor: 'black',
    color: 'white',
  },
});
