import { StyleSheet } from 'react-native';

const colors = {
    primary: '#75b68c',
    background: '#f2fafd',
    gray: '#2e472d',
   
  };

const globalStyles = StyleSheet.create({
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      letterSpacing: 1
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 30 
    },
    
});

export { globalStyles, colors };