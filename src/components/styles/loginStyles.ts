import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: "column",
    flex: 1,
    width: screenWidth,
    padding: 20,
    backgroundColor: colors.backgroundGreen,
  },

  // Header
  headerContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textImage: {
    width: screenWidth * 0.5,
    height: (screenWidth * 0.5) / 3.3275,
    resizeMode: 'contain', 
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

  // Inputs Container
  containerTextAndButton: {
    justifyContent: 'space-evenly',
    flex: 3,
  },
  inputContainer: {
    gap: 20,
  },

  // SignIn Button
  buttonContainer: {
    gap: 10,
  },

  // Dont have an account text
  signInContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 5,
    fontSize: fontSize.text.medium,
  },
  askText:{
    color: colors.darkGray,
    fontWeight: 'bold',
  },
  signInText:{
    color: colors.backgroundGreen,
    fontWeight: 'bold',
  }
});
