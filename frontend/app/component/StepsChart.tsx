import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useTranslation } from 'react-i18next';
import '../../i18n';
const screenWidth = Dimensions.get('window').width;

interface StepsChartProps {
    data: any[];
}

export default function Steps({ data }: StepsChartProps) {
    const stepData = data.map(item => {
        if (!item.step) return 0;
        return item.step;
    });
    const { t } = useTranslation();
    const labels = data.map(item => new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>{t('Step')}</Text>
                <BarChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: stepData,
                            },
                        ],
                    }}
                    width={screenWidth - 60} // Thu nhỏ chút cho đẹp
                    height={250}
                    yAxisLabel=""
                    yAxisSuffix={t('StepC')}
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