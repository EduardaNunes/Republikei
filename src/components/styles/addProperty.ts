import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({

  // Background Image
  backgroundImageContainer:{
    flex: 1,
    width: screenWidth,
    position: 'absolute',
    zIndex: -1,
    backgroundColor: colors.white
  },
  paperTexture: {
    flex: 1,
    top: -50,
    width: screenWidth * 4,
    resizeMode: 'contain', 
    alignSelf: 'center', 
  },

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
    flex:1,
    paddingBottom:70,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    paddingBottom:40,
    backgroundColor: colors.gray[800]

  },
  subinputContainer:{
    flex:1,
    maxWidth: screenWidth,
    flexDirection: "row",
    gap: 10,

  },
  subinputSmallContainer:{
    flex: 1
  },
  title: {
    color: colors.backgroundGreen,
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

  subCategoryContainer:{
    flexWrap:"wrap",
    flexDirection:"row",
    gap:10,
  },
  
});
