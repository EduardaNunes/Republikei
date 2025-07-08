import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "45%",
  },
  image: {
    width: "100%",
    height: 100,
  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.medium,
  },
  price: {
    fontSize: fontSize.text.medium,
  },
});
