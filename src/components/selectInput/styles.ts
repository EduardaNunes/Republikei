import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth, height: screenHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({

  // General
  flexRow:{
    display: 'flex',
    flexDirection: 'row'
  },

  // Input Container
  darkGrayContainer:{
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkGray,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
  },
  whiteContainer:{
    width: "100%",
    flexDirection: 'row',
    alignItems: "center",  
    backgroundColor: colors.white,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    borderColor: colors.darkGray,
    borderWidth: 2.5
  },

  // Input Text
  darkGrayContainerText:{
    color: colors.white,
    fontSize: fontSize.text.small,
  },
  whiteContainerText:{
    color: colors.darkGray,
    fontSize: fontSize.text.small,
  },

  // Modal
  modalOverlay: {
    width: screenWidth, 
    height: screenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.darkGray,
    borderRadius: 12,
    padding: 16,
    maxHeight: "50%",
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
  },
  optionText: {
    color: colors.white,
    fontSize: fontSize.text.small,
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 18,
    color: colors.gray[100],
    fontWeight: "bold",
  }
});