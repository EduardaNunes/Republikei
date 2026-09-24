import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors } from "@/styles/colors";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: screenWidth,
    backgroundColor: colors.backgroundLight,
  },

  // Header (mesmo padrão da home e dos favoritos)
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 12 : 24,
    paddingBottom: 14,
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
  categoriesRow: {
    marginTop: 14,
  },

  // Mapa
  mapContainer: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  resultsPill: {
    position: "absolute",
    top: 12,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  resultsPillText: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },

  // Card do imóvel selecionado
  calloutContainer: {
    position: "absolute",
    bottom: 84,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  calloutImage: {
    width: 84,
    height: 84,
    borderRadius: 12,
    backgroundColor: colors.old_gray[100],
  },
  calloutTextContainer: {
    flex: 1,
    gap: 4,
  },
  calloutTypeBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  calloutTypeBadgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "600",
  },
  calloutTitle: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
  },
  calloutPrice: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  calloutLink: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
});