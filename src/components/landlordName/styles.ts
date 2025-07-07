import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    borderColor: colors.orange[300],
    borderStyle: "solid",
    borderWidth: 2,
    width: 70,
    height: 70,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
  },
  textName: {
    color: colors.orange[300],
    fontSize: 22,
    fontWeight: "bold",
  },
  textNumber: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    marginLeft: "auto",
    paddingRight: 20,
  },
});
