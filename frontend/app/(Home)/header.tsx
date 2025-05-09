import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {images} from "@/constants/images"
import {icons} from "@/constants/icon"
export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={images.logo} style={styles.icon} />
      <Image source={icons.bell} style={styles.bell}/>
      <Image source={icons.user} style={styles.avatar} />
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    margin: 20,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  name: {
    fontWeight: 'bold',
  },
  bell:{
    width:40,
    height:40,
    left:240,
    marginRight:10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    left:240,
    marginRight:10
  },
});
