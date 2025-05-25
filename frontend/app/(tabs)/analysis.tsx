
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import React from 'react'
import BMI from '../component/BMI'
import Steps from '../component/Steps'
import Calo from '../component/Calo';
export default function analysis() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <BMI />
        <Steps />
        <Calo />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
  },
  hello: {
    fontSize: 14,
    margin: 10
  }
});
