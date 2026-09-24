import { FlatList, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppText from "@/components/appText";
import ConversationItem from "@/components/conversationItem";
import { colors } from "@/styles/colors";
import { MOCK_CONVERSATIONS } from "@/utils/chat";
import { styles } from "../../components/styles/chatHub";

export default function ChatHub() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // TODO: buscar as conversas do usuário logado no Supabase
  const conversations = MOCK_CONVERSATIONS;

  // ================================================================================ //
  //                                     HANDLERS
  // ================================================================================ //

  const handleOpenConversation = (conversationId: string) => {
    router.push({ pathname: "/chat", params: { id: conversationId } });
  };

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={24} color={colors.navy} />
          </TouchableOpacity>

          <View>
            <AppText style={styles.title}>Conversas</AppText>
            {conversations.length > 0 && (
              <AppText style={styles.subtitle}>
                {conversations.length} {conversations.length === 1 ? "conversa" : "conversas"}
              </AppText>
            )}
          </View>
        </View>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationItem
            conversation={item}
            onPress={() => handleOpenConversation(item.id)}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          conversations.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBox}>
              <MaterialIcons name="chat-bubble-outline" size={28} color={colors.primary} />
            </View>
            <AppText style={styles.emptyTitle}>Nenhuma conversa ainda</AppText>
            <AppText style={styles.emptyText}>
              Abra um anúncio e toque em contato para falar com o locador.
            </AppText>
          </View>
        }
      />
    </View>
  );
}
