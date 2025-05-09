import {
  StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert
} from 'react-native';
import { useState } from 'react';
import { images } from "@/constants/images";
import { icons } from '@/constants/icon';
import { useRouter } from 'expo-router';

import { registerUser } from '../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert('Vui lòng nhập đầy đủ thông tin');
    }
    setLoading(true);
    try {
      await registerUser({ username, email, password });
      Alert.alert('Đăng ký thành công!', undefined, [
        { text: 'OK', onPress: () => router.push('./login') }
      ]);
    } catch (err: any) {
      Alert.alert('Đăng ký thất bại', err.response?.data?.message || err.message);
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
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subHeader}>Enter your email to sign up for this app</Text>
      <TextInput placeholder="username" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" autoCorrect={false} />
      <TextInput placeholder="email@domain.com" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry autoCapitalize="none" autoCorrect={false} />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Đang xử lý...' : 'Đăng ký'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Đã có tài khoản1?{' '}
        <Text style={styles.linkText} onPress={() => router.push('./login')}>
          Đăng nhập
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
  // ... giữ nguyên như cũ
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  logoContainer: { alignItems: 'center', marginBottom: 24 },
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 40 },
  appTitle: { fontSize: 20, fontWeight: 'bold', bottom: 35 },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  subHeader: { color: '#6B7280', marginBottom: 16, textAlign: 'center' },
  input: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, width: '100%', marginBottom: 12 },
  continueButton: { backgroundColor: 'black', paddingVertical: 14, borderRadius: 8, width: '100%', marginTop: 8 },
  continueText: { color: 'white', textAlign: 'center', fontWeight: '600' },
  loginText: { color: '#4B5563', marginVertical: 12, fontSize: 14 },
  loginLink: { color: 'black', fontWeight: '600' },
  orText: { color: '#9CA3AF', marginBottom: 12, fontSize: 14 },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F4F6', borderColor: '#D1D5DB', borderWidth: 1, paddingVertical: 14, borderRadius: 8, width: '100%', marginBottom: 20 },
  googleIcon: { width: 15, height: 15, marginRight: 10 },
  googleText: { fontWeight: '500' },
  policyText: { fontSize: 12, textAlign: 'center', color: '#000000' },
  linkText: { fontWeight: "600" },
  switchText: { color: '#6B7280', marginVertical: 12, fontSize: 14, textAlign: 'center' }
});
