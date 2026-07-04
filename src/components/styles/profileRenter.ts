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
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    fontSize: fontSize.text.medium,
  },
  title: {
    color: colors.backgroundGreen,
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
    marginVertical: 28,
  },
  
});
