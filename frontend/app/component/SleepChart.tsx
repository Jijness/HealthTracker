import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import '../../i18n';
const screenWidth = Dimensions.get('window').width;

interface SleepChartProps {
    data: any[];
}

export default function SleepChart({ data }: SleepChartProps) {
    const { t } = useTranslation();
    const sleepData = data.map(item => {
        if (!item.sleepTime || !item.wakeTime) {
            return 0;
        }
        const sleep = new Date(item.sleepTime);
        const wake = new Date(item.wakeTime);
        let diff = wake.getTime() - sleep.getTime();
        if (diff < 0) {
            diff += 24 * 60 * 60 * 1000;
        }
        return diff / (60 * 60 * 1000);
    });

    const labels = data.map(item => new Date(item.date).toLocaleDateString('vi-VN', { month: 'numeric', day: 'numeric' }));
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{t('Sleep')}</Text>
                <BarChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: sleepData,
                            },
                        ],
                    }}
                    width={screenWidth - 60} // Thu nhỏ chút cho đẹp
                    height={250}
                    yAxisLabel=""
                    yAxisSuffix={t('Hours')}
                    fromZero={true}
                    showBarTops={false}
                    withInnerLines={false}
                    chartConfig={{
                        backgroundColor: '#e0f7fa',
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#4dd0e1',
                        decimalPlaces: 1,
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
                    yLabelsOffset={-5}
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
        paddingVertical: 10,
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