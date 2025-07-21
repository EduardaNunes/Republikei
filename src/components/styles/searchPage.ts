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
    marginBottom: 28,
  },
  geralContainer:{
    justifyContent: "space-between",
    height:"20%"
  },
  buttonsContainer: {
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
    marginBottom:70,
  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.gray[100],
    fontSize: fontSize.title.medium,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent:"flex-start",
    alignItems: "flex-start",
    marginVertical: 28,
  },
  
});
