import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { images } from '@/constants/images';
import { icons } from '@/constants/icon';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.appName}>Health Tracker1</Text>
      </View>
      <View style={styles.rightIcons}>
        <View style={styles.bellWrapper}>
          <Image source={icons.bell} style={styles.bellIcon} />
        </View>
        <Image source={icons.user} style={styles.avatar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFC72C',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 8,
  },
  appName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3E7C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bellIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    tintColor: '#000',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
