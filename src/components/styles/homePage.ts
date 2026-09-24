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

  // Header
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
  searchRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },

  // Content
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
  sectionLink: {
    color: colors.primary,
    fontSize: fontSize.text.small,
    fontWeight: "600",
  },

  emptyText: {
    textAlign: "center",
    color: colors.textMuted,
    fontSize: fontSize.text.medium,
    paddingVertical: 40,
  },
});
