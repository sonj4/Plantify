import React from "react";
import {TextInput, StyleSheet} from "react-native";

const CustomTextInput = ({input, setInput, placeholder, type}) => {
    const handleChange = (value) => {
        setInput(value);
        console.log(value);
    }
    return (
        <TextInput 
            placeholder={placeholder}
            onChangeText={(value) => handleChange(value)}
            value={input}
            style={styles.input}
            secureTextEntry={type === 'password'}
            placeholderTextColor="grey"
        />
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        color: "black",
        paddingVertical: 10,
        paddingHorizontal: 30,
        minWidth: 250,
        borderRadius: 50
    }
})

export default CustomTextInput;