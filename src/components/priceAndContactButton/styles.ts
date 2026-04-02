import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";
import { Dimensions, StyleSheet } from "react-native";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    paddingVertical: 20,
    zIndex: 2,
    backgroundColor: colors.backgroundGreen,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  priceText: {
    fontSize: fontSize.title.medium,
    color: colors.white,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
