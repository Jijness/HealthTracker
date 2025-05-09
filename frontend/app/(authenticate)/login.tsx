import {
  StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert
} from 'react-native';
import { useState } from 'react';
import { images } from "@/constants/images";
import { icons } from '@/constants/icon';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { loginUser } from '../../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Vui lòng nhập email và mật khẩu.');
    }
    setLoading(true);
    try {
      const { token, isFirstLogin } = await loginUser({ email: email.trim(), password: password.trim() });
      // Giả sử backend trả về { token: '...', user: {...} }
      await AsyncStorage.setItem('token', token);

      if(isFirstLogin) {
        router.replace('/(userInforBody)/gender');
      }else{
        router.replace('/(tabs)/home');
      }
    } catch (err: any) {
      Alert.alert(
        'Đăng nhập thất bại',
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.appTitle}>Healthy tracker</Text>
      </View>
      <Text style={styles.header}>Sign in to this App</Text>
      <Text style={styles.subHeader}>Enter your email to sign in for this app</Text>
      <TextInput placeholder="email@domain.com" value={email} onChangeText={setEmail} style={styles.input} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry autoCapitalize="none" autoCorrect={false} />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Đang xử lý...' : 'Đăng nhập'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Chưa có tài khoản?{' '}
        <Text style={styles.linkText} onPress={() => router.push('./register')}>
          Đăng ký
        </Text>
      </Text>

      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Image source={icons.google} style={styles.googleIcon} />
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>
      <Text style={styles.policyText}>
        By clicking continue, you agree to our{' '}
        <Text style={styles.linkText}>Terms of Service</Text> and{' '}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1F2937',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 90 },
  appTitle: { fontSize: 20, fontWeight: 'bold', bottom: 85 },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  subHeader: { color: '#6B7280', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, width: '100%', marginBottom: 12 },
  continueButton: { backgroundColor: 'black', paddingVertical: 14, borderRadius: 8, width: '100%', marginTop: 8 },
  continueText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  loginText: { color: '#4B5563', marginVertical: 12, fontSize: 14 },
  loginLink: { color: 'black', fontWeight: '600' },
  orText: { color: '#9CA3AF', marginBottom: 12, fontSize: 14 },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', borderColor: '#D1D5DB', borderWidth: 1, paddingVertical: 12, borderRadius: 8, width: '100%', marginBottom: 20 },
  googleIcon: { width: 15, height: 15, marginRight: 10 },
  googleText: { fontWeight: '500' },
  policyText: { fontSize: 12, textAlign: 'center', color: '#000000' },
  linkText: { fontWeight: "600" },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  switchText: { color: '#4B5563', marginVertical: 12, fontSize: 14, textAlign: 'center' }
});
