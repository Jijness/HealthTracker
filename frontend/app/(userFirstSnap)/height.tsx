import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const { height: windowHeight } = Dimensions.get('window');
const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5;

const HeightPickerScreen = () => {
  const { t } = useTranslation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedHeight, setSelectedHeight] = useState(150);
  const router = useRouter();

  const heightData = Array.from({ length: 130 }, (_, i) => i + 100); // 100 - 199 cm
  const listRef = useRef<FlatList<number>>(null);


  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const onMomentumScrollEnd = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedHeight(heightData[index]);
    if (listRef.current) {
      listRef.current.scrollToOffset({ offset: index * ITEM_HEIGHT, animated: true });
    }
  };

  const handleNext = () => {
    router.push({
      pathname: '/(userFirstSnap)/weight',
      params: { height: selectedHeight.toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('TitileH1')}</Text>
      <Text style={styles.subtitle}>{t('TitileH2')}</Text>

      <View style={styles.wheelWrapper}>
        <View style={styles.highlightLine} />

        <Animated.FlatList
          ref={listRef}
          data={heightData}
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
                <Text style={styles.itemText}>{item} cm</Text>
              </Animated.View>
            );
          }}
        />

        <View style={styles.highlightLine} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>{t('Next')}</Text>
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

export default HeightPickerScreen;