import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderColor: colors.orange[300],
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 10,
    width: 80,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.orange[300],
    fontSize: fontSize.text.big,
    fontWeight: "bold",

  },
});
