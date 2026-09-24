import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },

  imageWrapper: {
    width: "100%",
    height: 190,
    backgroundColor: colors.old_gray[100],
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.overlayWhite,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },

  priceBadge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  priceBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
  },

  typeBadge: {
    position: "absolute",
    right: 12,
    bottom: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: colors.overlayDark,
  },
  typeBadgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600",
  },

  content: {
    padding: 16,
  },

  title: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
  },
  addressText: {
    color: colors.textMuted,
    fontSize: fontSize.text.small - 4,
    flexShrink: 1,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
  },
  tagText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "600",
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  viewDetails: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "600",
  },
});
