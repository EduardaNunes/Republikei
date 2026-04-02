import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({

  // Republikei

  bigContainer:{
    width: "100%",
    flexDirection: 'column',
  },
  mediumContainer:{
    width: "50%",
    flexDirection: 'column',
  },
  smallContainer:{
    width: "25%",
    flexDirection: 'column',
  },

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

  // Title Text
  darkGrayTitleText:{
    color: colors.darkGray,
    fontSize: fontSize.text.medium,
    fontWeight: 'bold'
  },
  whiteTitleText:{
    color: colors.white,
    fontSize: fontSize.text.medium,
    fontWeight: 'bold'
  },
  greenTitleText:{
    color: colors.backgroundGreen,
    fontSize: fontSize.text.medium,
    fontWeight: 'bold'  
  },

  // Container Text
  darkGrayContainerText:{
    color: colors.white,
    fontSize: fontSize.text.small,
    width: "100%",
  },
  whiteContainerText:{
    color: colors.darkGray,
    fontSize: fontSize.text.small,
    width: "100%",
  },

  // Placeholder Container Text
  darkGrayContainerPlaceholder:{
    color: colors.gray,
    fontSize: fontSize.text.small,
  },
  whiteContainerPlaceholder:{
    color: colors.gray,
    fontSize: fontSize.text.small,
  },

  // Old

  primaryContainer: {
    height: 52,
    width: "100%",
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 10,
    color: colors.gray[100],
    fontSize: 16,
  },

  secondaryContainer:{
    height: 52,
    width: "100%",
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[100],
    padding: 10,
    color: colors.gray[100],
    fontSize: 16,
  },
  text: {
    color: colors.orange[300],
    fontSize: fontSize.text.small,
  },
});
