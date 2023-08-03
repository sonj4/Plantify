import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Button = ({onPress, children}) => {
  return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {children}
      </TouchableOpacity>

  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#75b68c',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;