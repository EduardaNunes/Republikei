import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "43%",
    height: 210,
  },
  image: {
    width: "100%",
    height: 140,
  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.medium,
    fontWeight: "bold",
  },
  price: {
    fontSize: fontSize.text.big,
    color: "#fff",
  },
});
