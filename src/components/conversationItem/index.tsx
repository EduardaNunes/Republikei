import { View, TouchableOpacity } from "react-native";
import AppText from "@/components/appText";
import { Conversation, getInitials } from "@/utils/chat";
import { styles } from "./styles";

type ConversationItemProps = {
  conversation: Conversation;
  onPress: () => void;
};

export default function ConversationItem({ conversation, onPress }: ConversationItemProps) {
  const { contact, property, messages, lastMessageTime, unreadCount } = conversation;

  const lastMessage = messages[messages.length - 1];
  const hasUnread = unreadCount > 0;

  const preview = lastMessage
    ? lastMessage.from === "me"
      ? `Você: ${lastMessage.text}`
      : lastMessage.text
    : "Inicie a conversa";

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.avatarWrapper}>
        <View style={styles.avatar}>
          <AppText style={styles.avatarText}>{getInitials(contact.name)}</AppText>
        </View>
        {contact.online && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <AppText style={styles.name} numberOfLines={1}>
            {contact.name}
          </AppText>
          <AppText style={[styles.time, hasUnread && styles.timeUnread]}>
            {lastMessageTime}
          </AppText>
        </View>

        <View style={styles.propertyChip}>
          <AppText style={styles.propertyChipText} numberOfLines={1}>
            {property.title}
          </AppText>
        </View>

        <View style={styles.bottomRow}>
          <AppText style={[styles.preview, hasUnread && styles.previewUnread]} numberOfLines={1}>
            {preview}
          </AppText>
          {hasUnread && (
            <View style={styles.badge}>
              <AppText style={styles.badgeText}>{unreadCount}</AppText>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
