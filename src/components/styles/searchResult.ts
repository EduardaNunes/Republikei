import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    padding: 20,
    gap:10,
  },
  postContainer: {
    gap: 16,
    marginBottom: 28,
    flexDirection:"row",
    flexWrap: "wrap",
    alignItems:'center',
    justifyContent: "space-between",

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

    buttonContainer: {
    flexDirection:"row",
    alignItems: "center",
    marginVertical: 28,
    gap:12,
  },
  
});
