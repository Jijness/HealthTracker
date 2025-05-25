import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/component/EditUser')}>
          <Text style={styles.buttonText}>Thay đổi mật khẩu</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Thay đổi ngôn ngữ</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Thay đổi nền ứng dụng</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
    padding: 20
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})