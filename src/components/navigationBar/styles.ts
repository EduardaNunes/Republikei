import { colors } from "@/styles/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 75,
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: 0,
    right: 0,
    padding: 10,
    paddingHorizontal: 40,
    zIndex: 1,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: colors.backgroundGreen
  },
});
