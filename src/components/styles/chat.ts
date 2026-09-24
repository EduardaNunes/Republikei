import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontSize } from "@/styles/fontSize";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  // ─── Header ─────────────────────────────────────────────────────
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    gap: 12,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundLight,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
    fontSize: fontSize.text.big,
    fontWeight: "700",
  },
  headerInfo: {
    flex: 1,
  },
  contactName: {
    color: colors.navy,
    fontSize: 15,
    fontWeight: "700",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  statusText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: "600",
  },

  // ─── Card do imóvel em conversa ─────────────────────────────────
  propertyCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
  },
  propertyImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.old_gray[100],
  },
  propertyInfo: {
    flex: 1,
  },
  propertyTitle: {
    color: colors.navy,
    fontSize: 13,
    fontWeight: "700",
  },
  propertyPrice: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  // ─── Mensagens ──────────────────────────────────────────────────
  messagesContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 8,
  },
  dayChip: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  dayChipText: {
    color: colors.textGray,
    fontSize: 11,
    fontWeight: "600",
  },

  messageRow: {
    maxWidth: "80%",
  },
  messageRowMine: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageRowTheirs: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleMine: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3,
  },
  bubbleTheirs: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  bubbleTextMine: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  bubbleTextTheirs: {
    color: colors.navy,
    fontSize: 14,
    lineHeight: 20,
  },
  messageTime: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 4,
    marginHorizontal: 4,
  },

  // ─── Campo de envio ─────────────────────────────────────────────
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  inputWrapper: {
    flex: 1,
    minHeight: 44,
    maxHeight: 110,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderRadius: 22,
    backgroundColor: colors.backgroundLight,
  },
  input: {
    color: colors.navy,
    fontSize: 14,
    fontFamily: "Montserrat_400Regular",
    paddingVertical: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.textMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
});