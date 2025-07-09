import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerFavorite: {
    display: "flex",
    flexDirection: "column",
    width: "43%",
    height: 210,
  },
  containerPreview: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: 290,
    position: "relative",
  },
  imageFavorite: {
    width: "100%",
    height: 140,
  },
  imagePreview: {
    width: "100%",
    height: 220,
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
  status: {
    position: "absolute",
    top: 4,
    right: 6,
    zIndex: 1,
  },
});
