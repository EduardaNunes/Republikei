import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: screenWidth,
    backgroundColor: colors.backgroundLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
  },

  // Header (mesmo padrão da home, favoritos e mapa)
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 12 : 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundLight,
  },
  iconDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
    gap: 20,
  },

  // Card de perfil
  heroCard: {
    alignItems: "center",
    gap: 4,
    padding: 24,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 5,
  },
  avatarText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "700",
  },
  heroName: {
    marginTop: 10,
    color: colors.navy,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  heroEmail: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: "center",
  },
  typeChip: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  typeChipText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
  },

  // Seções
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: fontSize.text.big,
    fontWeight: "700",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },

  // Linhas (informações e atalhos)
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  rowTextBox: {
    flex: 1,
  },
  rowLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
  },
  rowValue: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  menuLabel: {
    flex: 1,
    color: colors.navy,
    fontSize: 14,
    fontWeight: "600",
  },

  // Formulário de edição
  formGap: {
    gap: 14,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    color: colors.textGray,
    fontSize: 12,
    fontWeight: "600",
  },
  fieldBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  fieldBoxMultiline: {
    alignItems: "flex-start",
  },
  fieldInput: {
    flex: 1,
    color: colors.navy,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    paddingVertical: 12,
  },
  fieldInputMultiline: {
    minHeight: 84,
    textAlignVertical: "top",
  },
  helperText: {
    color: colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },

  // Botões
  buttonsRow: {
    flexDirection: "row",
    gap: 10,
  },
  buttonFlex: {
    flex: 1,
  },
  primaryButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  outlineButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "700",
  },
  dangerButton: {
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.danger,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  dangerButtonText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "700",
  },
});