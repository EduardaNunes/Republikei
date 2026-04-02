import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth:2,
    padding:8,
    borderColor:colors.backgroundGreen,
    borderRadius:12
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

  },
  textName: {
    color: colors.backgroundGreen,
    fontSize: 22,
    fontWeight: "bold",
  },
  textNumber: {
    color: colors.darkGray,
    //fontWeight: 'bold',
    fontSize: fontSize.text.medium,
  },
});
