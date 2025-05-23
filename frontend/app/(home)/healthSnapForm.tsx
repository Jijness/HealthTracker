import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { useForm, Controller, useFormState } from 'react-hook-form';

const HealthSnapForm = () => {
    const router = useRouter();
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
                Alert.alert('Error', 'Authentication token not found.');
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
                Alert.alert('Error', errorData.message || 'Failed to save information.');
                return;
            }

            Alert.alert('Success', 'Health information saved successfully.');
            router.back();
        } catch (error: any) {
            console.error('API call error:', error);
            Alert.alert('Error', 'Could not connect to the server.');
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
                <Text style={styles.title}>Enter your body information</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Weight (kg) <Text style={styles.required}>*</Text></Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Weight is required',
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: 'Weight must be a number',
                            },
                            min: { value: 30, message: 'Minimum weight is 30 kg' },
                            max: { value: 200, message: 'Maximum weight is 200 kg' },
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
                    <Text style={styles.label}>Height (cm) <Text style={styles.required}>*</Text></Text>
                    <Controller
                        control={control}
                        rules={{
                            required: 'Height is required',
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: 'Height must be a number',
                            },
                            min: { value: 100, message: 'Minimum height is 100 cm' },
                            max: { value: 250, message: 'Maximum height is 250 cm' },
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
                    <Text style={styles.label}>Body Fat (%)</Text>
                    <Controller
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: 'Body Fat must be a number',
                            },
                            min: { value: 0, message: 'Minimum Body Fat is 0%' },
                            max: { value: 100, message: 'Maximum Body Fat is 100%' },
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
                    <Text style={styles.label}>Muscle Mass (kg)</Text>
                    <Controller
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[0-9.]+$/,
                                message: 'Muscle Mass must be a number',
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
                    <Text style={styles.label}>Note</Text>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                value={value}
                                onChangeText={onChange}
                                multiline
                                numberOfLines={3}
                                placeholder="Add a note"
                            />
                        )}
                        name="note"
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.saveButton, !isValid && styles.disabledButton]}
                        onPress={handleSubmit(handleSave)}
                        disabled={!isValid}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5DC', // Màu vàng nhạt/kem
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2E8B57', // Màu xanh lá cây đậm
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333', // Màu đen hoặc xám đậm
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