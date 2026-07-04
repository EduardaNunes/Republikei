import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
  
  superContainer: {
    flex: 1,
    width: screenWidth,
    flexDirection: "column",
    gap: 10,
  },
  container: {
    flex: 1,
    width: screenWidth,
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 10,
  },

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


  // Texts
  title: {
    color: colors.backgroundGreen,
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  titleContainer: {
    justifyContent:"center",
    alignItems: "center",
    marginVertical: 28,
  },
  notFoundText: {
    marginTop: 40,
    color: colors.darkGray,
    fontWeight: 'bold'
  },
});
