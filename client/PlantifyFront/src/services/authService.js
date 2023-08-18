import axios from 'axios';

const API_BASE_URL = 'http://192.168.58.117:5000/api/auth';


export const registerUser = async (email, username, password, isAdmin) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { email, username, password, isAdmin });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data; 
  } catch (error) {
    console.log('Login failed: ', error.message);
    throw error; 
  }
};
