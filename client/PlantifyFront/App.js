import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './src/features/authentication/AuthNavigator';
import {AuthProvider} from './src/features/authentication/AuthContext'

const App = () => {
  return (
    <AuthProvider>
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
