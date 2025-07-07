import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems: "center",
        gap:5,
        paddingHorizontal:10,
        borderColor:colors.orange[300],
        borderWidth:1,
        borderRadius:16,

    },
    name:{
        fontSize:16,
        fontWeight:"600",
    }
})