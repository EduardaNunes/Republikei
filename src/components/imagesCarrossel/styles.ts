import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    width: width,
    height: width * 0.6,
  },
  scroll: {
    flex: 1,
  },
  image: {
    width: width,
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    left: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 22,
    borderRadius: 3,
    backgroundColor: "white",
  },
  inactiveDot: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});