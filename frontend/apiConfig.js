
import Constants from 'expo-constants';

const API_BASE_URL =
    Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5500/api'; // URL mặc định

export default API_BASE_URL;
