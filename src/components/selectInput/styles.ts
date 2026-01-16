import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  title: {
    color: colors.gray[100],
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    marginBottom: 6,
  },
  inputContainer: {
    width: "100%",
    height: 56,
    backgroundColor: colors.gray[800],
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray[100],
  },
  inputText: {
    color: colors.orange[300],
    fontFamily: "Montserrat_400Regular",
    fontSize: fontSize.text.small,
  },
  placeholderText: {
    color: colors.orange[300],
    fontSize: fontSize.text.small,
    fontFamily: "Montserrat_400Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: colors.gray[800],
    borderRadius: 12,
    padding: 16,
    maxHeight: "50%",
  },
  optionButton: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[800],
  },
  optionText: {
    color: colors.orange[300],
    fontSize: fontSize.text.small,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
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