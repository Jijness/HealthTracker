import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { images } from "@/constants/images";
import { icons } from '@/constants/icon';
import { Link } from 'expo-router';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // try {
    //   const response = await fetch('http://192.168.1.5:3000/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert('Đăng nhập thành công!');
    //     // chuyển vào trang chính của app tại đây nếu cần
    //   } else {
    //     alert(data.message || 'Đăng nhập thất bại!');
    //   }
    // } catch (error:any) {
    //   alert('Lỗi kết nối: ' + error.message);
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.appTitle}>Healthy tracker</Text>
      </View>
      <Text style={styles.header}>Sign in to this App</Text>
      <Text style={styles.subHeader}>Enter your email to sign in for this app</Text>
      <TextInput placeholder="username" value={username} onChangeText={setUsername} style={styles.input} autoCapitalize="none" autoCorrect={false} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry autoCapitalize="none" autoCorrect={false} />
      <Link href="/(information)/gender" asChild>
      <TouchableOpacity style={styles.continueButton} onPress={handleLogin}>
        <Text style={styles.continueText}>Login</Text>
      </TouchableOpacity>
      </Link>
      <Text style={styles.loginText}>
        Don't have an account?<Link href="./register"> <Text style={styles.loginLink}>Sign up</Text></Link>
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
  linkText: { fontWeight: "600" }
});
