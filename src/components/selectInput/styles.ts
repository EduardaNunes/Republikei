import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors"; // Ajuste conforme seu arquivo de cores

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  title: {
    color: colors.gray[100],
    fontSize: 14,
    fontFamily: "Montserrat_400Regular", // Ajuste se sua fonte for diferente
    marginBottom: 6,
  },
  inputContainer: {
    width: "100%",
    height: 56,
    backgroundColor: colors.gray[900], // Cor de fundo do input
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray[600],
  },
  inputText: {
    color: colors.gray[100],
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  placeholderText: {
    color: colors.gray[400],
    fontSize: 16,
    fontFamily: "Montserrat_400Regular",
  },
  // Estilos do Modal
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
    borderBottomColor: colors.gray[600],
  },
  optionText: {
    color: colors.gray[100],
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_400Regular",
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelText: {
    color: colors.orange[300],
    fontWeight: "bold",
  }
});