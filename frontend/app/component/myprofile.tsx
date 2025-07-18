import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { icons } from '@/constants/icon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from '../../apiConfig';
import { useTranslation } from 'react-i18next';
import '../../i18n';
import { useFocusEffect } from '@react-navigation/native';

export default function MyProfile() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        full_name: '--',
        username: '--',
        gender: '--',
        birth_year: '--',
        activity_level: '--',
    });
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const fetchUserProfile = useCallback(async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                router.replace('/(authenticate)/login'); // Redirect nếu không có token
                return;
            }

            const response = await fetch(`${API_BASE_URL}/users/infor`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(response);

            if (!response.ok) {
                console.error('Failed to fetch user profile:', response.status);
                return;
            }

            const data = await response.json();
            setUserInfo(data.user);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Xử lý lỗi
        } finally {
            setLoading(false);
        }
    }, []);
    useFocusEffect(
        useCallback(() => {
            fetchUserProfile();
        }, [fetchUserProfile])
    );


    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            console.log('Token removed!');
            router.replace('/(authenticate)/login');
        } catch (err) {
            console.error('Error removing token:', err);
        }
    };
    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text>{t('Loading')}</Text>
                </ScrollView>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>{t('YP')}</Text>

                <View style={styles.avatarContainer}>
                    <Image source={icons.user} style={styles.avatar} />
                    <Link href="/component/Editprofile" asChild>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editText}>{t('Edit')}</Text>
                        </TouchableOpacity>
                    </Link>
                    <Text style={styles.name}>{userInfo.username}</Text>
                </View>
                <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>{t('Fn')}</Text>
                        <Text style={styles.value}>{userInfo.full_name}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>{t('G')}</Text>
                        <Text style={styles.value}>{userInfo.gender}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>{t('BY')}</Text>
                        <Text style={styles.value}>{userInfo.birth_year}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>{t('AL')}</Text>
                        <Text style={styles.value}>{userInfo.activity_level}</Text>
                    </View>
                </View>
                <Link href="/(authenticate)/login" asChild>
                    <TouchableOpacity style={styles.Button} onPress={handleLogout}>
                        <Text style={styles.Text}>{t('LO')}</Text>
                    </TouchableOpacity>
                </Link>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFC730',
    },
    scrollContainer: {
        paddingTop: 60,
        paddingBottom: 100,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        marginBottom: 20,
        color: '#3d3d3d',
    },
    avatarContainer: {
        backgroundColor: '#D9D9D9',
        borderRadius: 20,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    editText: {
        fontSize: 14,
        fontWeight: '600',
    },
    name: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '500',
        color: '#3d3d3d',
    },
    infoBox: {
        backgroundColor: '#d9d9d9',
        borderRadius: 20,
        marginTop: 30,
        padding: 20,
        width: '85%',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    Button: { backgroundColor: '#d9d9d9', paddingVertical: 14, borderRadius: 8, width: '86%', marginTop: 8 },
    Text: { color: 'black', textAlign: 'center', fontWeight: '600', fontSize: 20 },
});