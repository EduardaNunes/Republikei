import { StyleSheet, Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight,
    display: "flex",
    gap: 10,
    paddingBottom: 100,
  },
});
