import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    padding: 20,
    borderRadius:20,
    marginTop:250,
    paddingBottom:70,
    backgroundColor:colors.gray[800],
  },
  image: {
    width: "100%",
    height: 300,
    position:"absolute"
    },

  inputContainer: {
    gap: 20,
    marginBottom: 28,
  },
  geralContainer:{
    justifyContent: "space-between",
    height:"20%",
    paddingVertical:30,
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
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  
});
