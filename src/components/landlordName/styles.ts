import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'row',
        borderColor: '#0000ff',
        borderStyle: "solid",
        borderWidth: 2,
    },
    iconContainer:{
        borderColor: colors.orange[300],
        borderStyle: "solid",
        borderWidth: 2,
        width: 60,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    },
    text: {
        color:'#fff',
    }
})