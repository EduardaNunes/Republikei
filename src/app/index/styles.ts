import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";

export const styles = StyleSheet.create({
  container: {
    flex:1,
    width: Dimensions.get("window").width,
    flexDirection:"column",
    padding:10,
  },
  background: {
    alignItems:"flex-start",
    justifyContent:"flex-start",
    width: Dimensions.get("window").width,
    height: "45%"
  },
  title: {
    color: colors.orange[300],
    fontSize: 22,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 24,
  },
  containerTextAndButton:{
    justifyContent: 'space-between',
    flex:1,
    paddingBottom:50,
  }
});
