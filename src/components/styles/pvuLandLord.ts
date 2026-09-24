import { StyleSheet, Dimensions } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

const { width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // ─── Carrossel de fotos ───────────────────────────────────────
  carouselWrapper: {
    width: screenWidth,
    height: 285,
    backgroundColor: colors.old_gray[100],
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  topControlsRow: {
    position: "absolute",
    top: 44,
    left: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 2,
  },
  glassButtonRow: {
    flexDirection: "row",
    gap: 8,
  },
  glassButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.glassBg,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },

  // ─── Conteúdo ─────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  typeRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  typeBadge: {
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingValue: {
    color: colors.navy,
    fontSize: 12,
    fontWeight: "700",
  },
  ratingTotal: {
    color: colors.textMuted,
    fontSize: 12,
  },

  title: {
    color: colors.navy,
    fontSize: fontSize.title.medium,
    fontWeight: "700",
    lineHeight: 26,
    marginBottom: 16,
  },

  // ─── Card de preço ──────────────────────────────────────────────
  priceCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 6,
  },
  priceLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    fontWeight: "500",
  },
  priceValue: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
    lineHeight: 32,
  },
  priceSub: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    marginTop: 2,
  },
  availabilityBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "flex-end",
  },
  availabilityLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 10,
    fontWeight: "500",
  },
  availabilityValue: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700",
  },

  // ─── Seções genéricas ───────────────────────────────────────────
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.navy,
    fontSize: fontSize.title.medium,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 2,
  },

  // ─── Localização ────────────────────────────────────────────────
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  locationIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  locationAddress: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: "600",
  },
  locationSub: {
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    color: colors.textGray,
    fontSize: 11,
    fontWeight: "500",
  },

  // ─── Descrição ──────────────────────────────────────────────────
  description: {
    color: colors.textGray,
    fontSize: 13,
    lineHeight: 20,
  },

  // ─── Locador ────────────────────────────────────────────────────
  ownerHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
  ownerName: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
  },
  verifiedRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  verifiedText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "600",
  },
  responseText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  phoneText: {
    color: colors.textGray,
    fontSize: 13,
    fontWeight: "500",
  },
  whatsappButton: {
    width: "100%",
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.whatsapp,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowColor: colors.whatsapp,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 4,
  },
  whatsappText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },

  // ─── Ações do proprietário ──────────────────────────────────────
  ownerActionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  actionButtonPrimary: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonDanger: {
    flex: 1,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
});