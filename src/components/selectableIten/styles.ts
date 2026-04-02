import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderColor: colors.backgroundGreen,
    borderWidth: 1,
    borderRadius: 16,
  },

  text:{
    color: colors.darkGray, 
    fontSize: fontSize.text.small, 
  }
});
