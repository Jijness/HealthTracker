import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import '../../i18n';

const screenWidth = Dimensions.get('window').width;

interface WeightChartProps {
  data: any[];
}

export default function WeightChart({ data }: WeightChartProps) {
  const { t } = useTranslation();
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>{t('Weight')}</Text>
          <Text>No weight data available.</Text>
        </View>
      </View>
    );
  }

  const weightData = data.map(item => {
    const weight = item.weight;
    return weight;
  })
  const labels = data.map(item => new Date(item.Date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{t('Weight')}</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: weightData,
                color: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`,
                strokeWidth: 2,
              },
            ],
            legend: [t('Weight')],
          }}
          width={screenWidth - 60}
          height={250}
          yAxisLabel=""
          yAxisSuffix=" Kg"
          fromZero={true}
          withDots={true}
          withShadow={false}
          withInnerLines={false}
          withOuterLines={true}
          chartConfig={{
            backgroundColor: '#e0f7fa',
            backgroundGradientFrom: '#b2ebf2',
            backgroundGradientTo: '#4dd0e1',
            decimalPlaces: 0,
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
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#fff',
            },
          }}
          style={styles.chart}
          verticalLabelRotation={0}
          yLabelsOffset={10}
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
    backgroundColor: '#FFC730',
    paddingVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
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