import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      setToken(storedToken);
    };
    loadToken();
  }, []);

  const updateToken = async (newToken) => {
    setToken(newToken);
    await AsyncStorage.setItem('userToken', newToken);
  };

  const logout = async (callback) => {
    setToken(null); // Clear the token from state
    await AsyncStorage.removeItem('userToken'); // Remove the token from AsyncStorage
    if (callback) callback(); // Execute the callback if provided
};


  return (
    <AuthContext.Provider value={{ token, updateToken, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
