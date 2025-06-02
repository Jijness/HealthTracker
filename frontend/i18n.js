import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';


import en from './locales/en/translation.json';
import vi from './locales/vi/translation.json';

const LANGUAGE_KEY = 'user-language';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        try {
            let savedLang;
            if (typeof window !== 'undefined' && window.localStorage) {
                savedLang = localStorage.getItem(LANGUAGE_KEY);
            } else {
                savedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
            }
            if (savedLang) {
                callback(savedLang);
            } else {
                const locales = Localization.getLocales();
                const deviceLang = locales && locales.length > 0 ? locales[0].languageCode : 'en';
                const lang = deviceLang.startsWith('vi') ? 'vi' : 'en';
                callback(lang);
            }
        } catch (e) {
            console.log('Error detecting language:', e);
            callback('en');
        }
    },
    init: () => { },
    cacheUserLanguage: async (lng) => {
        try {
            if (typeof window !== 'undefined' && window.localStorage) { // Kiểm tra nếu đang chạy trên web
                localStorage.setItem(LANGUAGE_KEY, lng);
                sessionStorage.setItem(LANGUAGE_KEY, lng);
            } else {
                await AsyncStorage.setItem(LANGUAGE_KEY, lng);
            }
        } catch (e) {
            console.error('Error caching language:', e);
        }
    },
};

i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources: {
            en: { translation: en },
            vi: { translation: vi },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;