
import axios from 'axios';
import Constants from 'expo-constants';
import API_BASE_URL from '../apiConfig';


export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/users/register`, data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_BASE_URL}/users/login`, data);
  return response.data;
};
