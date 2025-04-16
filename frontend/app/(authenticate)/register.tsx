import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { images } from "@/constants/images";
import { icons } from '@/constants/icon';
import { Link } from 'expo-router';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // try {
    //   const response = await fetch('http://192.168.1.5:3000/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username, email, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     alert('Đăng ký thành công!');
    //   } else {
    //     alert(data.message || 'Đăng ký thất bại!');
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
      <Text style={styles.header}>Create an account</Text>
      <Text style={styles.subHeader}>Enter your email to sign up for this app</Text>
      <TextInput placeholder="username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="email@domain.com" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
       <Link href="/(information)/gender" asChild>
         <Text style={styles.continueText}>Continue</Text>
        </Link>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already an account? <Link href="./login"><Text style={styles.loginLink}>Log in</Text></Link>
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
  linkText: { fontWeight: "600" }
});
