import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    zIndex:2,
  },
  priceText: {
    fontSize: fontSize.title.medium,
    color: colors.orange[300],
  },
});
