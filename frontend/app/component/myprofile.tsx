import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { icons } from '@/constants/icon';

export default function MyProfile() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Trang của bạn</Text>

        <View style={styles.avatarContainer}>
          <Image source={icons.user} style={styles.avatar} />
          <Link href="/component/Editprofile" asChild>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editText}>Sửa</Text>
            </TouchableOpacity>
          </Link>
          <Text style={styles.name}>Hoàng Trọng</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>Male</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>170cm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>77.0 Kg</Text>
          </View>
        </View>
        <Link href="/(authenticate)/login" asChild>
          <TouchableOpacity style={styles.Button}>
            <Text style={styles.Text}>Log out</Text>
          </TouchableOpacity>
        </Link>
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
  avatarContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: '500',
    color: '#3d3d3d',
  },
  infoBox: {
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
    marginTop: 30,
    padding: 20,
    width: '85%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  Button: { backgroundColor: '#d9d9d9', paddingVertical: 14, borderRadius: 8, width: '86%', marginTop: 8 },
  Text: { color: 'black', textAlign: 'center', fontWeight: '600', fontSize: 20 },
});
