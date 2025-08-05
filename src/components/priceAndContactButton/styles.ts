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
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.orange[300],
    justifyContent: "center",
    alignItems: "center",
  },
});
