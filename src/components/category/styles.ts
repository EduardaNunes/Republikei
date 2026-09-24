import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  containerActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  name: {
    fontSize: 12,
    fontWeight: "600",
  },
  nameInactive: {
    color: colors.textGray,
  },
  nameActive: {
    color: colors.white,
  },
});
