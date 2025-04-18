import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.102:5500/api';
// const API_BASE_URL = 'http://192.168.0.103:5500/api';
// const API_BASE_URL = 'http://<>:5500/api';

export const registerUser = async (data: {
    username: string;
    email: string;
    password: string;
}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/register`, data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error during registration:', error.response?.data || error.message);
        } else {
            console.error('Error during registration:', error);
        }
        throw error;
    }
};

export const loginUser = async (data: {
    email: string;
    password: string;
}) => {
    return axios.post(`${API_BASE_URL}/users/login`, data);
};