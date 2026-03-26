import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors"; // Certifique-se que `colors.orange[300]` está definido
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  
  // Republikei Buttons

  darkGrayButton:{
    backgroundColor: colors.darkGray,
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",  
  },
  whiteButton:{
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    width: "100%",
    alignItems: "center",  
    borderColor: colors.darkGray,
    borderWidth: 2.5
  },
  darkGraySmallButton:{
    backgroundColor: colors.darkGray,
    paddingVertical: 18,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    width: "40%",
    alignItems: "center",  
  },
  greenSmallButton:{
    backgroundColor: colors.backgroundGreen,
    paddingVertical: 18,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    width: "40%",
    alignItems: "center",  
  },
  whiteSmallButton:{
    backgroundColor: colors.white,
    paddingVertical: 18,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 24,
    width: "40%",
    alignItems: "center",  
    borderColor: colors.darkGray,
    borderWidth: 2.5
  },

  // Republikei Texts
  darkGrayButtonText:{
    color: colors.white,
    fontSize: fontSize.text.medium,
    fontWeight: "bold",
  },
  whiteButtonText:{
    color: colors.darkGray,
    fontSize: fontSize.text.medium,
    fontWeight: "bold",
  },
  darkGraySmallButtonText:{
    color: colors.white,
    fontSize: fontSize.text.small,
    fontWeight: "bold",
  },
  greenSmallButtonText:{
    color: colors.white,
    fontSize: fontSize.text.small,
    fontWeight: "bold",
  },
  whiteSmallButtonText:{
    color: colors.darkGray,
    fontSize: fontSize.text.small,
    fontWeight: "bold",
  },

  // Base Containers
  primaryContainer: {
    backgroundColor: colors.orange[300],
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  secondaryContainer: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.orange[300],
    paddingVertical: 12,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  shortPrimaryContainer: {
    backgroundColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    alignItems: "center",
  },
  shortSecondaryContainer: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    borderColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    alignItems: "center",
  },

  mediumPrimaryContainer: {
    backgroundColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  mediumSecondaryContainer: {
    backgroundColor: colors.gray[800],
    borderWidth: 1,
    width: "48%",
    borderColor: colors.orange[300],
    paddingVertical: 10,
    paddingHorizontal: fontSize.text.small,
    borderRadius: 8,
    alignItems: "center",
  },

  // Base Titles
  primaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.medium,
    fontWeight: "500",
  },
  secondaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.medium,
    fontWeight: "500",
  },
  mediumPrimaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.big,
    fontWeight: "500",
  },
  mediumSecondaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.big,
    fontWeight: "500",
  },


  shortPrimaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.medium,
    fontWeight: "500",
  },
  shortSecondaryTitle: {
    color: colors.gray[100],
    fontSize: fontSize.text.medium,
    fontWeight: "500",
  },
});
