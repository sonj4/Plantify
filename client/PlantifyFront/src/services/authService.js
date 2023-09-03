import axios from '../utils/axios';


export const registerUser = async (email, username, password, isAdmin) => {
  try {
    const response = await axios.post("/auth/register", { email, username, password, isAdmin });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post('/auth/login', { username, password });
    return response.data; 
  } catch (error) {
    console.log('Login failed: ', error.message);
    throw error; 
  }
};
