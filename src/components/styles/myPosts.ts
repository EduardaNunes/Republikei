import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  
  superContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    marginBottom: 10,
    marginTop: 20,
    gap:10,
  },
    container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 80,
    gap:10,
  
  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    justifyContent:"center",
    alignItems: "center",
    marginVertical: 28,
  },
  
});
