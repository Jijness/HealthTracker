import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const tabData = ['Daily Summary1', 'Workouts', 'Energy Efficiency', 'Plan work'];

export default function TabSelector() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tabData}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setActiveIndex(index)}
            style={[
              styles.tab,
              index === activeIndex && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                index === activeIndex && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flatListContent: {
    paddingHorizontal: 16, // ⬅️ tạo khoảng trống ở hai đầu
  },
  tab: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: 'black',
  },
  tabText: {
    fontSize: 14,
    color: 'black',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
});
