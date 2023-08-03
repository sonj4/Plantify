import { StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LinearGradientView from "../../../common/components/LinearGradientView";
import { useState } from "react";
import CustomTextInput from "../../../common/components/CustomTextInput";
import Button from "../../../common/components/Button";
import { globalStyles, colors } from "../../../common/global styles/GlobalStyles";


const RegisterScreen = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [passwordValidationText, setPasswordValidationText] = useState('');

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        return passwordPattern.test(password);
    };

    const handleRegister = () => {
        const isPasswordValid = validatePassword(password);
        setIsPasswordValid(isPasswordValid);
      
        if (!isPasswordValid) {
          setPasswordValidationText(
            'Password must have at least 6 characters and contain at least 1 number and 1 upper case letter.'
          );
        } else {
          console.log('email ', email, 'username ', username, 'password ', password);
        }
      };
      

    return (
        <LinearGradientView>
            <Text style={styles.title}>Unlock Your Plant Passion! 🌱 Register Today!</Text>
            <CustomTextInput input={email} setInput={setEmail} placeholder={"Email"}/>
            <CustomTextInput input={username} setInput={setUsername} placeholder={"Username"}/>
            <CustomTextInput input={password} setInput={setPassword} placeholder={"Password"} type={"password"}/>
            {!isPasswordValid && ( <Text style={styles.validationText}>{passwordValidationText}</Text> )}
            <Button onPress={handleRegister}>
                <Text style={globalStyles.buttonText}>Register</Text>
            </Button>
            <View style={styles.container}>
                <Text>Already have an account? </Text> 
                <TouchableOpacity style={styles.login}><Text style={styles.login}>Log In</Text></TouchableOpacity>
            </View>
        </LinearGradientView>
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
    login: {
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