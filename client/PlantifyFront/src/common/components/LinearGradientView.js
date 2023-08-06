import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, globalStyles } from '../global styles/GlobalStyles';

const LinearGradientView = ({ children, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient
        colors={[colors.primary, 'white']}
        style={globalStyles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {children}
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

export default LinearGradientView;
