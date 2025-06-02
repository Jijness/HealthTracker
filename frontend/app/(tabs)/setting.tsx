import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'vi', name: 'Tiếng Việt' },
  // Thêm các ngôn ngữ khác nếu cần
];

export default function About() {
  const { t } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Setting')}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/component/EditUser')}>
        <Text style={styles.buttonText}>{t('ChangePassword')}</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{t('Language')}</Text>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageButton}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text style={styles.languageButtonText}>{lang.name}</Text>
          </TouchableOpacity>
        ))}
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
    padding: 20
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  },
  languageButton: {
    paddingVertical: 10,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 16,
  },
})