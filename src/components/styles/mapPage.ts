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

  // Containers
  container: {
    flex: 1,
    width: screenWidth,
    flexDirection: "column",
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },

  // Calllout
  calloutContainer: {
    position: 'absolute',
    bottom: 90,
    left: '5%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  calloutImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  calloutTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.darkGray,
  },
  calloutPrice: {
    fontSize: 14,
    color: colors.backgroundGreen,
    marginTop: 5,
  },
  
});
