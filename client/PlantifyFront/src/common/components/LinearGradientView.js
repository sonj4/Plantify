import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors, globalStyles } from '../global styles/GlobalStyles';

const LinearGradientView = ({children}) => {
  return (
    <LinearGradient
        colors={[colors.primary, 'white']}
        style={globalStyles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
    >
     {children}
   </LinearGradient>
  )
}

export default LinearGradientView;