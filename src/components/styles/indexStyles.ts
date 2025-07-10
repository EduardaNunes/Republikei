import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    padding: 20,
  },
  background: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    height: "45%",
  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  text: {
    fontSize: fontSize.text.medium,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 24,
  },
  containerTextAndButton: {
    justifyContent: "space-between",
    flex: 1,
    paddingBottom: 50,
  },
});
