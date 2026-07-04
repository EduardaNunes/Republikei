import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({

  // Main 
  container: {
    display: 'flex',
    flexDirection: "column",
    flex: 1,
    width: screenWidth,
    padding: 20,
    backgroundColor: colors.backgroundGreen,
  },

  // Background Image
  backgroundImageContainer:{
    width: screenWidth,
    position: 'absolute',
    zIndex: -1,
  },
  armImage: {
    width: screenWidth * 0.2,
    height: (screenWidth) / 2.82 * 1.2,
    resizeMode: 'contain', 
    alignSelf: 'flex-end',
    top: 40,
  },
  paperTexture: {
    width: screenWidth * 3,
    height: (screenWidth * 3) / 1.324,
    resizeMode: 'contain', 
    alignSelf: 'center', 
  },

  // Header
  headerContainer: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
  },
  starImage: {
    width: screenWidth * 0.1,
    height: (screenWidth * 0.1),
    resizeMode: 'contain', 
  },
  textImage: {
    width: screenWidth * 0.65,
    height: (screenWidth * 0.65) / 4.74,
    resizeMode: 'contain', 
    alignSelf: 'center'
  },

  // Inputs
  inputsAndButtonContainer: {
    flex: 2,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  inputsContainer: {
    gap: 10,
  },
});
