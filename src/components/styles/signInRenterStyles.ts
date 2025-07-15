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
  inputContainer: {
    gap: 20,
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    fontSize: fontSize.text.medium,
  },
  signInText: {
    color: colors.orange[300],
    fontWeight: "700",
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
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
    display: 'flex',
    gap: 30,
    paddingBottom: 50,
  },
});
