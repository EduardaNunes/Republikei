import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({

 // Main 
  container: {
    flex: 1,
    width: screenWidth,
    flexDirection: "column",
    padding: 20,
    backgroundColor: colors.backgroundGreen
  },

  // Header
  headerContainer: {
    width: '100%',
    flexDirection: "row",
    gap: 10,
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
    alignSelf: 'flex-end'
  },
  armImage: {
    width: screenWidth * 0.2,
    height: (screenWidth) / 2.82,
    resizeMode: 'contain', 
    alignSelf: 'flex-end',
    backgroundColor: 'pink'
  },

  // Inputs
  inputsAndButtonContainer: {
    justifyContent: "space-between",
    flex: 1,
    gap: 20,
    paddingHorizontal: 20,
    backgroundColor: 'red'
  },
  inputsContainer: {
    backgroundColor: 'yellow',
    gap: 10,
  },

  // Old

  // signInContainer: {
  //   flexDirection: "row",
  //   justifyContent: "flex-end",
  //   gap: 10,
  //   fontSize: fontSize.text.medium,
  // },
  // signInText: {
  //   color: colors.orange[300],
  //   fontWeight: "700",
  // },
  // title: {
  //   color: colors.orange[300],
  //   fontSize: fontSize.title.big,
  //   fontWeight: "700",
  // },
  // titleContainer: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 12,
  //   gap: 10,
  // },
  // text: {
  //   fontSize: fontSize.text.medium,
  // },
  // buttonContainer: {
  //   gap: 10,
  //   marginTop: 24,
  // },
});
