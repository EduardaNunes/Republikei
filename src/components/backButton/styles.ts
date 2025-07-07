import { StyleSheet } from "react-native";
import {colors} from "@/styles/colors"
import { fontSize } from "@/styles/fontSize";


export const styles = StyleSheet.create({
    mediumContainer:{
        padding:13,
        borderRadius: 50,
        elevation: 5,
        height: 52,
        width:52,
        backgroundColor:colors.orange[300],
    },
    smallContainer:{
        padding:10,
        borderRadius: 50,
        elevation: 5,
        height: 40,
        width:40,
        backgroundColor:colors.orange[300],
    },
})