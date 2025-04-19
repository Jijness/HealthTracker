import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { useRouter } from "expo-router";
import { icons } from "@/constants/icon";

export default function GenderScreen() {
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const router = useRouter();

  const handleSelect = (gender: string) => {
    setSelectedGender(gender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us About Yourself</Text>
      <Text style={styles.subtitle}>
        To give you a better experience{"\n"}by knowing your gender
      </Text>

      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderItem,
            selectedGender === 'female' && styles.selectedGender,
          ]}
          onPress={() => handleSelect('female')}
        >
          <View style={styles.iconCircle}>
            <Image source={icons.female} style={styles.icon} />
          </View>
          <Text style={styles.label}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderItem,
            selectedGender === 'male' && styles.selectedGender,
          ]}
          onPress={() => handleSelect('male')}
        >
          <View style={styles.iconCircle}>
            <Image source={icons.male} style={styles.icon} />
          </View>
          <Text style={styles.label}>Male</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        {selectedGender ? (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              router.push({
                pathname: "/(userInforBody)/birthYear",
                params: { gender: selectedGender },
              });
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.nextButton, { opacity: 0.5 }]} disabled>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDBD10',
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  genderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderItem: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconCircle: {
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGender: {
    opacity: 0.5,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  label: {
    marginTop: 12,
    color: 'white',
    fontSize: 16,
  },
  bottom: {
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
