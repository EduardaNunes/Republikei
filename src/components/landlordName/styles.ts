import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth:2,
    padding:8,
    borderColor:colors.orange[300],
    borderRadius:12
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

  },
  textName: {
    color: colors.orange[300],
    fontSize: 22,
    fontWeight: "bold",
  },
  textNumber: {
    color: "#fff",
    fontSize: 16,
  },
});
