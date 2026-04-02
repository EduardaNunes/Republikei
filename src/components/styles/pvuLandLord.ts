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
    flex: 2,
    top: -40,
    width: screenWidth * 4,
    resizeMode: 'contain', 
    alignSelf: 'center', 
  },
  image: {
    flex: 1,
    width: "100%",
    height: 300,
  },

  // containers
  container: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
    flexDirection: "column",
    padding: 20,
  },
  headerSpacerContainer:{
    flex: 1,
    maxHeight: 280
  },
  scrollView:{
    flex: 2,
  },
  infoContainer:{
    flex: 1,
  },

  // Texts
  texts:{
    color: colors.darkGray,
    fontSize: fontSize.text.small
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
    color: colors.backgroundGreen,
    fontSize: fontSize.title.big,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.darkGray,
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
