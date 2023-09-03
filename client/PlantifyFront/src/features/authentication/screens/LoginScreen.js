import { StyleSheet,  Text, TouchableOpacity, View, Keyboard } from "react-native";
import LinearGradientView from "../../../common/components/LinearGradientView";
import CustomTextInput from "../../../common/components/CustomTextInput";
import Button from "../../../common/components/Button";
import React, {useState} from "react";
import { globalStyles, colors } from "../../../common/global styles/GlobalStyles";
import { Formik } from 'formik';
import * as yup from 'yup';
import { loginUser } from "../../../services/authService";
import { useAuth } from "../AuthContext";


const LoginScreen = ({navigation}) => {
  const {updateToken, updateAdminStatus} = useAuth();

    const handleSubmit = async (values) => {
      try {
        console.log('Login data: ',values);
        const {username, password} = values;
        const response = await loginUser(username, password);
        if (response.message === "User logged in successfully") {
          console.log('navigate to main')
          //await AsyncStorage.setItem('userToken', response.token);
          console.log('login screenL: ', response.token)
          updateToken(response.token);
          updateAdminStatus(response.isAdmin); 
          //navigation.navigate('Main');
          if(response.isAdmin) {
            navigation.navigate('Admin');  // Navigate to admin navigation if user is an admin
          } else {
            navigation.navigate('Main');  // Navigate to main navigation for non-admin users
          }
        }
        console.log(response);
      } catch(error) {
        console.error("Login failed: ", error)
      }
        
    }

    const handleNavigation = () => {
        navigation.navigate('Register')
    }
    
    const handlePress = () => {
        Keyboard.dismiss();
    }

    const loginSchema = yup.object().shape({
        username: yup.string().required('Username is required'),
        password: yup.string().required('Password is required'),
    });

    return (
        <Formik
        initialValues={{username: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <LinearGradientView onPress={handlePress}>
            <Text style={styles.title}>Welcome Back! 🌱</Text>
            <CustomTextInput
              input={values.username}
              setInput={handleChange('username')}
              placeholder="Username"
            />
            {touched.username && errors.username && <Text style={styles.validationText}>{errors.username}</Text>}
            <CustomTextInput
              input={values.password}
              setInput={handleChange('password')}
              placeholder="Password"
              type="password"
            />
            {touched.password && errors.password && <Text style={styles.validationText}>{errors.password}</Text>}
            <Button onPress={handleSubmit}>
              <Text style={globalStyles.buttonText}>Log in</Text>
            </Button>
            <View style={styles.container}>
              <Text>Don't have an account? </Text>
              <TouchableOpacity style={styles.login} onPress={handleNavigation}>
                <Text style={styles.register}>Register</Text>
              </TouchableOpacity>
            </View>
          </LinearGradientView>
        )}
      </Formik>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: "Roboto-Medium",
        color:"white",
        margin: 10,
        textAlign: "center"
    },
    register: {
        margin: 0,
        padding: 0,
        color: colors.primary,
        textDecorationLine: "underline",
        fontWeight: "bold"
    },
    container: {
        flexDirection: "row"
    },
    validationText: {
        color: 'red',
        fontSize: 12,
        textAlign: 'center',
        marginHorizontal: 20
    },
})

export default LoginScreen;