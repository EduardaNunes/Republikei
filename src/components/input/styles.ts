import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  primaryContainer: {
    height: 52,
    width: "100%",
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 10,
    color: colors.gray[100],
    fontSize: 16,
  },

  secondaryContainer:{
    height: 52,
    width: "100%",
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 10,
    color: colors.gray[100],
    fontSize: 16,
  },
  text: {
    color: colors.orange[300],
    fontSize: fontSize.text.medium,
  },
});
