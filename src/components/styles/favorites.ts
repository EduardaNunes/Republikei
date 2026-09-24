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

  // Header (mesmo padrão da home)
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
    paddingBottom: 100,
  },

  categoriesRow: {
    marginBottom: 20,
  },

  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: fontSize.text.big,
    fontWeight: "700",
  },
  sectionCount: {
    color: colors.textMuted,
    fontSize: fontSize.text.small,
    fontWeight: "600",
  },

  // Estado vazio
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 40,
    gap: 8,
  },
  emptyIconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    color: colors.navy,
    fontSize: fontSize.text.big - 4,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    color: colors.textGray,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});