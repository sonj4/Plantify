
import { StyleSheet } from 'react-native';

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

export { styles };

