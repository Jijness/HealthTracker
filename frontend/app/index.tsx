import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { images } from "@/constants/images"
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          router.replace('./(tab)/home');
        } else {
          router.replace('./(authenticate)/login');
        }
      } catch (err) {
        console.error("Error checking token: ", err);
        router.replace('./(authenticate)/login');
      } finally {
        setIsLoading(false);
      }
    }
  })

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.topSection}>
        <Image source={images.logo} style={styles.logo} />
        <Text style={styles.title}>Healthy tracker</Text>
        <Text style={styles.subtitle}>Health is your life</Text>
      </View>
      <View style={styles.bottomSection}>
        <Link href="./(authenticate)/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBD10',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
  },
  bottomSection: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
