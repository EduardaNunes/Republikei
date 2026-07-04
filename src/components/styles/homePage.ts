import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width,
    flexDirection: "column",
    padding: 20,
    gap:10,
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

  postContainer: {
    gap: 32,
    marginBottom: 100,
    alignItems:'center',
    justifyContent: "space-between",
  },
   
  // Texts
  title: {
    color: colors.backgroundGreen,
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
