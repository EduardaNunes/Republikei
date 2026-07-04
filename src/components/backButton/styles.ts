import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  containerBack:{
    position: "absolute",
    zIndex: 1,
  },
  containerPlus:{
    position: "absolute",
    right: 10,
    bottom: 100,
    zIndex: 1,
  },
  mediumContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: colors.white,
  },
  smallContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: 40,
    width: 40,
    backgroundColor: colors.white,
  },
});
