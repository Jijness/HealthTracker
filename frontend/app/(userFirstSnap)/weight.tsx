
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import API_BASE_URL from '../../apiConfig';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { height: windowHeight } = Dimensions.get('window');
const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5;

const WeightPickerScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedWeight, setSelectedWeight] = useState(50);
  const router = useRouter();
  const listRef = useRef<FlatList<number>>(null);
  const params = useLocalSearchParams<{ height?: string }>();
  const heightParam = params.height ?? '';

  const weightData = Array.from({ length: 120 }, (_, i) => i + 30);


  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const onMomentumScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedWeight(weightData[index]);
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: index * ITEM_HEIGHT, animated: true });
    }
  };

  const handleSubmit = async () => {
    const h = parseInt(heightParam, 10);
    const w = selectedWeight;
    if (isNaN(h) || isNaN(w)) {
      Alert.alert('Invalid height or weight!');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No auth token found!');

      const res = await axios.post(`${API_BASE_URL}/healthSnap/`, {
        height: h,
        weight: w,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.status === 201) {
        router.replace('/(home)/home');
      }
    } catch (error: any) {
      console.log('HealthSnap API error:', error.response?.status, error.response?.data);
      Alert.alert('Error', error.response?.data?.message || 'Try again later');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your weight?</Text>
      <Text style={styles.subtitle}>This help us create your persionalized plan</Text>

      <View style={styles.wheelWrapper}>
        <View style={styles.highlightLine} />

        <Animated.FlatList
          ref={listRef}
          data={weightData}
          keyExtractor={(item) => item.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumScrollEnd}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="normal"
          contentContainerStyle={{
            paddingVertical: (ITEM_HEIGHT * (VISIBLE_ITEMS - 1)) / 2,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 2) * ITEM_HEIGHT,
              index * ITEM_HEIGHT,
              (index + 2) * ITEM_HEIGHT,
            ];
            const opacity = scrollY.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });
            const scale = scrollY.interpolate({ inputRange, outputRange: [0.8, 1.2, 0.8], extrapolate: 'clamp' });

            return (
              <Animated.View style={[styles.itemContainer, { opacity, transform: [{ scale }] }]}>
                <Text style={styles.itemText}>{item} Kg</Text>
              </Animated.View>
            );
          }}
        />

        <View style={styles.highlightLine} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  wheelWrapper: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: 120,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#FFBF00',
    borderRadius: 16,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 30,
    color: '#ffffff',
  },
  highlightLine: {
    position: 'absolute',
    top: ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2),
    height: ITEM_HEIGHT,
    width: '100%',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderColor: '#ffffff',
    zIndex: 1,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WeightPickerScreen;
