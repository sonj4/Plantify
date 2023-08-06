import { StyleSheet } from 'react-native';

const colors = {
    primary: '#7AB692',
    background: '#F2FAFD',
    gray: '#DEEFDF',
    lightGreen: '#DEEFDF',
    lightGray: '#DDE2E6'
   
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