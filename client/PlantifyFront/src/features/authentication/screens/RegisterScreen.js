import { StyleSheet, Text, TouchableOpacity, View, Keyboard} from "react-native";
import LinearGradientView from "../../../common/components/LinearGradientView";
import CustomTextInput from "../../../common/components/CustomTextInput";
import Button from "../../../common/components/Button";
import { globalStyles, colors } from "../../../common/global styles/GlobalStyles";
import { Formik } from 'formik';
import * as yup from 'yup';
import { registerUser } from "../../../services/authService";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from "../AuthContext";


const RegisterScreen = ({navigation}) => {
  const {updateToken} = useAuth();

    const handlePress = () => {
        Keyboard.dismiss();
    }
    

    const handleSubmit = async (values) => {
        try {
          console.log('Form data:', values);
          const { email, username, password } = values;
          const isAdmin = false;
          const response = await registerUser(email, username, password, isAdmin);
          // Handle the response, for example, store the token in AsyncStorage
          console.log(response);
          if (response.message === "User registered successfully") {
            console.log('navigate to main')
            //await AsyncStorage.setItem('userToken', response.token);
            updateToken(response.token);
            navigation.navigate('Main');
          }
        } catch (error) {
          console.error('Registration failed:', error);
        }
      };

    const handleLogin = () => {
        navigation.navigate('Login')
    }

    const registrationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('Email is required'),
        username: yup.string().required('Username is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
      

      return (
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validationSchema={registrationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <LinearGradientView onPress={handlePress}>
              <Text style={styles.title}>Unlock Your Plant Passion! 🌱 Register Today!</Text>
              <CustomTextInput
                input={values.email}
                setInput={handleChange('email')}
                placeholder="Email"
              />
              {touched.email && errors.email && <Text style={styles.validationText}>{errors.email}</Text>}
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
                <Text style={globalStyles.buttonText}>Register</Text>
              </Button>
              <View style={styles.container}>
                <Text>Already have an account? </Text>
                <TouchableOpacity style={styles.link} onPress={handleLogin}>
                  <Text style={styles.link}>Log In</Text>
                </TouchableOpacity>
              </View>
            </LinearGradientView>
          )}
        </Formik>
      );
}

const styles = StyleSheet.create({
  title: {
      fontSize: 18,
      fontFamily: "Roboto-Medium",
      color:"white",
      margin: 10,
      textAlign: "center"
  },
  link: {
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

export default RegisterScreen;