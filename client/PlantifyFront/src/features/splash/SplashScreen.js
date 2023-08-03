import React from 'react';
import {Text,StyleSheet} from 'react-native';
import Button from '../../common/components/Button';
import { globalStyles, colors } from '../../common/global styles/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';
import LinearGradientView from '../../common/components/LinearGradientView';

const SplashScreen = ({navigation}) => {

  const handleGetStarted = () => {
    navigation.navigate('Register'); 
  };
   
  return (
    <LinearGradientView>
      <Text style={styles.title}>PLANTIFY</Text>
      <Text style={styles.subtitle}> Snap, Identify, and Nurture Your Plants!</Text>
      <Button onPress={handleGetStarted}> 
        <Text style={globalStyles.buttonText}> Get Started! </Text> 
      </Button>
    </LinearGradientView>
  

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
    
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto-Bold',
    color: colors.primary,
    textAlign: 'center',
    letterSpacing:5,

  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Light',
    color: colors.gray,
  },

})

export default SplashScreen;