import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

export default function Calo() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calo</Text>
        <BarChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [1000, 1500, 1500, 2000, 800, 1200, 2000],
              },
            ],
          }}
          width={screenWidth - 60} 
          height={250}
          yAxisLabel=""
          yAxisSuffix=" Calo"
          fromZero={true}
          showBarTops={false}
          withInnerLines={false}
          chartConfig={{
            backgroundColor: '#e0f7fa',
            backgroundGradientFrom: '#b2ebf2',
            backgroundGradientTo: '#4dd0e1',
            decimalPlaces: 0,
            barPercentage: 0.75,
            color: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            propsForBackgroundLines: {
              strokeDasharray: '',
              strokeWidth: 0.75,
              stroke: '#ccc',
            },
            style: {
              marginLeft: 0,
            },
          }}
          style={styles.chart}
          verticalLabelRotation={0}
          yLabelsOffset={0}
          xLabelsOffset={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#FFC730',
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius:16,
    padding:10,
    width: screenWidth - 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'left',
    color: '#006064',
  },
  chart: {
    borderRadius: 16,
  },
});
