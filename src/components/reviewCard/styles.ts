import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.backgroundGreen,
    borderRadius: 12,
    padding: 12,
    gap: 6,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  autor: {
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: fontSize.text.medium,
  },
  data: {
    color: colors.gray,
    fontSize: fontSize.text.small,
  },
  comentario: {
    color: colors.darkGray,
    fontSize: fontSize.text.small,
  },
});