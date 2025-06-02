import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { useForm, Controller, useFormState } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import '../../i18n';
const HealthSnapForm = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            weight: '',
            height: '',
            bodyFat: '',
            muscleMass: '',
            note: '',
        },
        mode: 'onChange', // Trigger validation on input change
    });

    type HealthSnapFormData = {
        weight: string;
        height: string;
        bodyFat?: string;
        muscleMass?: string;
        note?: string;
    };

    const handleSave = async (data: HealthSnapFormData) => {
        const { weight, height, bodyFat, muscleMass, note } = data;

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert(t('Erorr'), t('ATNF'));
                return;
            }

            const response = await fetch(`${API_BASE_URL}/healthSnap`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    weight: parseFloat(weight),
                    height: parseFloat(height),
                    bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
                    muscleMass: muscleMass ? parseFloat(muscleMass) : undefined,
                    note: note,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                Alert.alert(t('Erorr'), errorData.message || t('FTS'));
                return;
            }

            Alert.alert(t('Erorr'), t('HIS'));
            router.back();
        } catch (error: any) {
            console.error('API call error:', error);
            Alert.alert(t('Erorr'), t('CC'));
        }
    };

    const handleCancel = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>{t('TitileI')}</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('Weight')} ({t('W')}) <Text style={styles.required}>*</Text></Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Weight is required',
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: t('WT1'),
                            },
                            min: { value: 30, message: t('WT2') },
                            max: { value: 200, message: t('WT3') },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.weight && styles.inputError]}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                        name="weight"
                    />
                    {errors.weight && <Text style={styles.errorText}>{errors.weight.message}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('Height')} ({t('H')}) <Text style={styles.required}>*</Text></Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Height is required',
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: t('HT1'),
                            },
                            min: { value: 100, message: t('HT2') },
                            max: { value: 250, message: t('HT2') },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.height && styles.inputError]}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                        name="height"
                    />
                    {errors.height && <Text style={styles.errorText}>{errors.height.message}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('BF')} ({t('B')})</Text>
                    <Controller
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: t('BF1'),
                            },
                            min: { value: 0, message: t('BF2') },
                            max: { value: 100, message: t('BF3') },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.bodyFat && styles.inputError]}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                        name="bodyFat"
                    />
                    {errors.bodyFat && <Text style={styles.errorText}>{errors.bodyFat.message}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('MM')} ({t('H')})</Text>
                    <Controller
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: t('MM1'),
                            },
                            validate: (value, formValues) => {
                                if (formValues.weight && formValues.bodyFat) {
                                    const maxMuscleMass = parseFloat(formValues.weight) - (parseFloat(formValues.weight) * parseFloat(formValues.bodyFat) / 100);
                                    if (value && parseFloat(value) >= maxMuscleMass) {
                                        return `Max to ${maxMuscleMass.toFixed(2)} kg`;
                                    }
                                }
                                return true;
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, errors.muscleMass && styles.inputError]}
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                            />
                        )}
                        name="muscleMass"
                    />
                    {errors.muscleMass && <Text style={styles.errorText}>{errors.muscleMass.message}</Text>}
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>{t('Note')}</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                value={value}
                                onChangeText={onChange}
                                multiline
                                numberOfLines={3}
                                placeholder={t('Note_p')}
                            />
                        )}
                        name="note"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.saveButton, !isValid && styles.disabledButton]}
                        onPress={handleSubmit(handleSave)}
                        disabled={!isValid}
                    >
                        <Text style={styles.buttonText}>{t('Save')}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 100,
        paddingHorizontal: 20,
        backgroundColor: '#FFC730',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 20,
        color: '#3d3d3d',
        textAlign: 'center',
        width: '85%',
    },
    inputGroup: {
        marginBottom: 20,
        width: '85%',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 6,
        color: '#3d3d3d',
        width: '85%',
    },
    required: {
        color: 'red',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D3D3D3', // Màu xám nhạt
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#FFF',
        color: '#333',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 3,
    },
    multilineInput: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 30,
    },
    saveButton: {
        backgroundColor: '#FF8C00', // Màu cam cháy
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    cancelButton: {
        backgroundColor: '#4682B4', // Màu xanh dương
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default HealthSnapForm;