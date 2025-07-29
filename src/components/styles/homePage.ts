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
  fakeInput: {
  backgroundColor: colors.gray[800],
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  marginTop: 28,
  borderWidth:2,
  borderColor: colors.orange[300],
},

fakeInputText: {
  color: colors.gray[100],
  fontSize: 16,
},

  postContainer: {
    gap: 32,
    marginBottom: 100,
    alignItems:'center',
    justifyContent: "space-between",

  },
  title: {
    color: colors.orange[300],
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent:"flex-start",
    alignItems: "center",
    marginVertical: 28,
  },
  
});
