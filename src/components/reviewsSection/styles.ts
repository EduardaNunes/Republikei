import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  resumoContainer: {
    gap: 4,
  },
  resumoTexto: {
    color: colors.darkGray,
    fontSize: fontSize.text.small,
  },
  resumoLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // espaço maior entre as duas informações
  },
  resumoMedia: {
    color: colors.darkGray,
    fontSize: fontSize.text.small,
    fontWeight: "bold",
  },
  resumoTotal: {
    color: colors.darkGray,
    fontSize: fontSize.text.small,
  },
  formContainer: {
    gap: 10,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.old_gray[100],
  },
  formTitulo: {
    color: colors.darkGray,
    fontWeight: "bold",
    fontSize: fontSize.text.medium,
  },
  listaContainer: {
    gap: 4,
  },
});