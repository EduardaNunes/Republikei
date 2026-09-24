import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mark: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.navy,
    letterSpacing: -0.3,
  },
  nameWhite: {
    color: colors.white,
  },
});