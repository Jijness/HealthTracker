import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import API_BASE_URL from '../../apiConfig';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ACTIVITY_LEVELS = [
    { label: "Ngồi nhiều", value: "sedentary" },
    { label: "Vận động nhẹ", value: "light" },
    { label: "Vận động vừa", value: "moderate" },
    { label: "Năng động", value: "active" },
    { label: "Rất năng động", value: "very_active" },
];

export default function ActivityLevelScreen() {
    const [selected, setSelected] = useState<string | null>(null);
    const router = useRouter();
    const params = useLocalSearchParams<{ gender?: string; birthYear?: string }>();
    const gender = params.gender ?? '';
    const birthYear = params.birthYear ?? '';


    const handleSubmit = async () => {
        if (!selected) {
            Alert.alert("Hãy chọn mức độ hoạt động của bạn!");
            return;
        }

        try {
            const token = await AsyncStorage.getItem('token');
            const res = await axios.patch(`${API_BASE_URL}/users/updateInfor`, {
                gender,
                birthYear,
                activityLevel: selected,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.status === 200) {
                router.push({
                    pathname: '/(userFirstSnap)/height',
                });
            }
        } catch (error) {
            Alert.alert("Có lỗi xảy ra! Thử lại sau.");
        }

    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chọn mức độ hoạt động của bạn</Text>
            <View style={styles.buttonContainer}>
                {ACTIVITY_LEVELS.map((item) => (
                    <TouchableOpacity
                        key={item.value}
                        style={[
                            styles.button,
                            selected === item.value && styles.selectedButton,
                        ]}
                        onPress={() => setSelected(item.value)}
                    >
                        <Text style={styles.buttonText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Tiếp theo</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FDBD10",
    },
    title: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    selectedButton: {
        backgroundColor: "#FFBF00",
    },
    buttonText: {
        fontSize: 18,
        color: "#333",
    },
    submitButton: {
        backgroundColor: "#1A1A1A",
        padding: 15,
        width: "80%",
        borderRadius: 25,
        alignItems: "center",
    },
    submitButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
});
