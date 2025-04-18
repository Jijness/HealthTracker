import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { images } from "@/constants/images"
import { icons } from '@/constants/icon'
import { Link } from 'expo-router';

import { loginUser } from '@/services/api';

export default function RegisterScreen() {
  // const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      // Xử lý lưu token / chuyển trang
    } catch (err: any) {
      console.error('Lỗi đăng nhập:', err.response?.data || err.message);
    }
  };


  return (
    <View style={styles.container}>
      {/* Logo + tên app */}
      <View style={styles.logoContainer}>
        <View>
          <Image source={images.logo} style={styles.logo} />
        </View>
        <Text style={styles.appTitle}>Healthy tracker</Text>
      </View>
      <Text style={styles.header}>Sign in to this App</Text>
      <Text style={styles.subHeader}>Enter your email to sign in for this app</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Don't have an account? <Text style={styles.loginLink}><Link href={"./register"}>Sign up</Link></Text>
      </Text>
      <Text style={styles.orText}>or</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleIcon}>
          <Image source={icons.google} style={styles.googleIcon} />
        </Text>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Chính sách */}
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 90,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 85,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subHeader: {
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
  },
  continueText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  loginText: {
    color: '#4B5563',
    marginVertical: 12,
    fontSize: 14,
  },
  loginLink: {
    color: 'black',
    fontWeight: '600',
  },
  orText: {
    color: '#9CA3AF',
    marginBottom: 12,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  googleIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  googleText: {
    fontWeight: '500',
  },
  policyText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000000',
  },
  linkText: {
    fontWeight: "600",
  },
});
