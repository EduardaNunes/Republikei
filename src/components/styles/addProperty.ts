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
    height:"70%"
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  subinputContainer:{
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,

  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.gray[100],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "column",
    justifyContent:"flex-start",
    alignItems: "flex-start",
    marginVertical: 28,
  },

  subCategoryContainer:{
    flexWrap:"wrap",
    flexDirection:"row",
    gap:10,
  },
  
});
