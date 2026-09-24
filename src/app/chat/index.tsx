import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/appText";
import { colors } from "@/styles/colors";
import { Message, MOCK_CONVERSATIONS, getInitials } from "@/utils/chat";
import { styles } from "../../components/styles/chat";

// ================================================================================ //
//                                   MESSAGE BUBBLE
// ================================================================================ //

function MessageBubble({ message }: { message: Message }) {
  const isMine = message.from === "me";

  return (
    <View style={[styles.messageRow, isMine ? styles.messageRowMine : styles.messageRowTheirs]}>
      <View style={[styles.bubble, isMine ? styles.bubbleMine : styles.bubbleTheirs]}>
        <AppText style={isMine ? styles.bubbleTextMine : styles.bubbleTextTheirs}>
          {message.text}
        </AppText>
      </View>
      <AppText style={styles.messageTime}>{message.time}</AppText>
    </View>
  );
}

// ================================================================================ //
//                                       SCREEN
// ================================================================================ //

export default function Chat() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const listRef = useRef<FlatList<Message>>(null);

  // id da conversa escolhida no hub (/chatHub)
  const { id } = useLocalSearchParams<{ id: string }>();

  // TODO: buscar a conversa no Supabase
  const conversation = MOCK_CONVERSATIONS.find((c) => c.id === id);

  const [messages, setMessages] = useState<Message[]>(conversation?.messages ?? []);
  const [draft, setDraft] = useState("");

  const canSend = draft.trim().length > 0;

  // ================================================================================ //
  //                                     HANDLERS
  // ================================================================================ //

  const handleSend = () => {
    if (!canSend) return;

    // TODO: enviar para o backend. Por enquanto só adiciona na lista local.
    const time = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), from: "me", text: draft.trim(), time },
    ]);
    setDraft("");
  };

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  if (!conversation) {
    return <AppText style={{ color: colors.navy }}>Conversa não encontrada.</AppText>;
  }

  const { contact, property } = conversation;

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={24} color={colors.navy} />
          </TouchableOpacity>

          <View style={styles.avatar}>
            <AppText style={styles.avatarText}>{getInitials(contact.name)}</AppText>
          </View>

          <View style={styles.headerInfo}>
            <AppText style={styles.contactName}>{contact.name}</AppText>
            {contact.online && (
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <AppText style={styles.statusText}>Online</AppText>
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.roundButton}>
            <MaterialIcons name="more-vert" size={20} color={colors.navy} />
          </TouchableOpacity>
        </View>

        <View style={styles.propertyCard}>
          <Image source={require("@/assets/Imagem.png")} style={styles.propertyImage} />
          <View style={styles.propertyInfo}>
            <AppText style={styles.propertyTitle}>{property.title}</AppText>
            <AppText style={styles.propertyPrice}>R$ {property.price}/mês</AppText>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
        </View>
      </View>

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble message={item} />}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListHeaderComponent={
          <View style={styles.dayChip}>
            <AppText style={styles.dayChipText}>Hoje</AppText>
          </View>
        }
      />

      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Escreva uma mensagem..."
            placeholderTextColor={colors.textMuted}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
        </View>

        <TouchableOpacity
          style={[styles.sendButton, !canSend && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!canSend}
        >
          <MaterialIcons name="send" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
