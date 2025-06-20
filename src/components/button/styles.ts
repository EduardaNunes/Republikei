import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors"; // Certifique-se que `colors.orange[300]` está definido
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  // Containers
  primaryContainer: {
    backgroundColor: colors.orange[300],
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  secondaryContainer: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.orange[300],
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  shortPrimaryContainer: {
    backgroundColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  shortSecondaryContainer: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },

  // Titles
  primaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.small,
    fontWeight: "500",
  },
  secondaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.small,
    fontWeight: "500",
  },
  shortPrimaryTitle: {
    color: colors.gray[100],
    fontSize: 14,
    fontWeight: "500",
  },
  shortSecondaryTitle: {
    color: colors.gray[100],
    fontSize: 14,
    fontWeight: "500",
  },
});
