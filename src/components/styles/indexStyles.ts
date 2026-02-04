import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    flexDirection: "column",
    padding: 20,
    backgroundColor: colors.backgroundGreen,
  },
  planeIcon: {
    width: screenWidth * 0.45,
    height: (screenWidth * 0.45) / 0.966,
    alignSelf: 'flex-start',
  },
  logoContainer: {
    width: '100%',
    gap: 10
  },
  logo: {
    width: screenWidth * 0.45,
    height: (screenWidth * 0.45) / 1.287,
    resizeMode: 'contain', 
    alignSelf: 'center', 
  },
  logo_name:{
    width: screenWidth * 0.8,
    height: (screenWidth * 0.8) / 4.86,
    resizeMode: 'contain', 
  },
  titleContainer: {
    width: '100%',
    alignItems: "center",
    justifyContent: 'center',
    gap: 5
  },
  text: {
    textAlign: 'center',
    fontSize: fontSize.text.medium,
    fontWeight: 'bold'
  },
  buttonsContainer: {
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    flex: 1,
  },
  paperTexture: {
    width: screenWidth * 2.5,
    height: (screenWidth * 2.5) / 1.324,
    resizeMode: 'contain', 
    alignSelf: 'center', 
    marginTop: (screenHeight) / 2.3,
    position: 'absolute',
  }
});
