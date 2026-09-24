import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { UserAttributes } from "@supabase/supabase-js";

import { supabase } from "../../lib/supabase";
import { styles } from "../../components/styles/profile";
import AppText from "@/components/appText";
import Logo from "@/components/logo";
import NavigationBar from "@/components/navigationBar";
import { colors } from "@/styles/colors";
import { getInitials } from "@/utils/chat";

type IconName = keyof typeof MaterialIcons.glyphMap;

const USER_TYPE_LABEL: Record<string, string> = {
  landLord: "Proprietário",
  student: "Estudante",
};

// ================================================================================ //
//                                  SMALL COMPONENTS
// ================================================================================ //

function InfoRow({ icon, label, value, last }: { icon: IconName; label: string; value: string; last?: boolean }) {
  return (
    <View style={[styles.row, !last && styles.rowDivider]}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.rowTextBox}>
        <AppText style={styles.rowLabel}>{label}</AppText>
        <AppText style={styles.rowValue}>{value}</AppText>
      </View>
    </View>
  );
}

function MenuRow({ icon, label, onPress, last }: { icon: IconName; label: string; onPress: () => void; last?: boolean }) {
  return (
    <TouchableOpacity style={[styles.row, !last && styles.rowDivider]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={18} color={colors.primary} />
      </View>
      <AppText style={styles.menuLabel}>{label}</AppText>
      <MaterialIcons name="chevron-right" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

type FieldProps = TextInputProps & { label: string; icon: IconName };

function Field({ label, icon, multiline, ...rest }: FieldProps) {
  return (
    <View style={styles.field}>
      <AppText style={styles.fieldLabel}>{label}</AppText>
      <View style={[styles.fieldBox, multiline && styles.fieldBoxMultiline]}>
        <MaterialIcons
          name={icon}
          size={20}
          color={colors.textMuted}
          style={multiline ? { marginTop: 12 } : undefined}
        />
        <TextInput
          style={[styles.fieldInput, multiline && styles.fieldInputMultiline]}
          placeholderTextColor={colors.textMuted}
          multiline={multiline}
          {...rest}
        />
      </View>
    </View>
  );
}

// ================================================================================ //
//                                       SCREEN
// ================================================================================ //

export default function ProfileRenter() {
  const [userType, setUserType] = useState<string | null>(null);
  const [celular, setCelular] = useState("");
  const [descricao, setDescricao] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const router = useRouter();
  const isLandlord = userType === "landLord";

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  const loadUser = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      setName(user.user_metadata.displayName || '');
      setEmail(user.email || 'E-mail não encontrado');
      setUserType(user.user_metadata.userType || null);
      setCelular(user.phone || "");
      setDescricao(user.user_metadata.descricao || "");
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadUser();
      setLoading(false);
    };

    init();
  }, [loadUser]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta", 
      "Você tem certeza que deseja se desconectar?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Sair", 
          onPress: async () => {
            const { error } = await supabase.auth.signOut();

            if (error) {
              Alert.alert("Erro no Logout", error.message);
            } else {
              router.replace('/');
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  const clearPasswords = () => {
    setSenhaAntiga("");
    setSenha("");
    setConfirmarSenha("");
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Atenção", "Informe seu nome.");
      return;
    }
    if (!senhaAntiga) {
      Alert.alert("Atenção", "Por favor, informe sua senha atual para salvar as alterações.");
      return;
    }
    if (senha && senha !== confirmarSenha) {
      Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
      return;
    }

    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) throw new Error("Não foi possível identificar o usuário.");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: senhaAntiga,
      });

      if (signInError) {
        throw new Error("A senha atual está incorreta.");
      }

      const authUpdateData: UserAttributes = {};

      if (senha) {
        authUpdateData.password = senha;
      }

      if (email !== user.email) {
        authUpdateData.email = email;
      }

      const metadataChanges: Record<string, string> = {};

      if (name.trim() !== (user.user_metadata.displayName || "")) {
        metadataChanges.displayName = name.trim();
      }

      if (isLandlord && descricao !== (user.user_metadata.descricao || "")) {
        metadataChanges.descricao = descricao;
      }

      if (Object.keys(metadataChanges).length > 0) {
        authUpdateData.data = metadataChanges;
      }

      if (Object.keys(authUpdateData).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(authUpdateData);
        if (authError) throw authError;
      }

      await loadUser();
      Alert.alert("Sucesso", "Perfil atualizado!");
      setIsEditing(false);

    } catch (error) {
      
      if (error instanceof Error) {
        Alert.alert("Erro ao atualizar", error.message);
      }

    } finally {
      clearPasswords();
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    clearPasswords();
    await loadUser(); // descarta o que foi digitado
    setIsEditing(false);
  };

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Logo />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/chatHub")}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            {/* TODO: apontar para a tela de notificações quando existir */}
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="notifications-none" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {isEditing ? (
            <>
              <AppText style={styles.sectionTitle}>Editar perfil</AppText>

              <View style={styles.section}>
                <View style={[styles.card, styles.formGap]}>
                  <Field
                    label="Nome"
                    icon="person"
                    value={name}
                    onChangeText={setName}
                    placeholder="Seu nome"
                  />
                  <Field
                    label="E-mail"
                    icon="email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="voce@email.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {isLandlord && (
                    <Field
                      label="Descrição"
                      icon="notes"
                      value={descricao}
                      onChangeText={setDescricao}
                      placeholder="Conte um pouco sobre você"
                      multiline
                    />
                  )}
                </View>
              </View>

              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Segurança</AppText>
                <View style={[styles.card, styles.formGap]}>
                  <Field
                    label="Senha atual"
                    icon="lock"
                    value={senhaAntiga}
                    onChangeText={setSenhaAntiga}
                    placeholder="Obrigatória para salvar"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <Field
                    label="Nova senha"
                    icon="lock-outline"
                    value={senha}
                    onChangeText={setSenha}
                    placeholder="Deixe em branco para manter"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <Field
                    label="Confirmar nova senha"
                    icon="lock-outline"
                    value={confirmarSenha}
                    onChangeText={setConfirmarSenha}
                    placeholder="Repita a nova senha"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                  <AppText style={styles.helperText}>
                    Por segurança, confirme sua senha atual para salvar qualquer alteração.
                  </AppText>
                </View>
              </View>

              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.outlineButton, styles.buttonFlex]}
                  onPress={handleCancel}
                  disabled={saving}
                >
                  <AppText style={styles.outlineButtonText}>Cancelar</AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primaryButton, styles.buttonFlex]}
                  onPress={handleSave}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <AppText style={styles.primaryButtonText}>Salvar</AppText>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.heroCard}>
                <View style={styles.avatar}>
                  <AppText style={styles.avatarText}>{getInitials(name || "?")}</AppText>
                </View>
                <AppText style={styles.heroName}>{name || "Sem nome"}</AppText>
                <AppText style={styles.heroEmail}>{email}</AppText>
                {!!userType && (
                  <View style={styles.typeChip}>
                    <AppText style={styles.typeChipText}>
                      {USER_TYPE_LABEL[userType] ?? userType}
                    </AppText>
                  </View>
                )}
              </View>

              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Minha conta</AppText>
                <View style={styles.card}>
                  <InfoRow icon="person" label="Nome" value={name || "Não informado"} />
                  <InfoRow
                    icon="email"
                    label="E-mail"
                    value={email}
                    last={!celular && !(isLandlord && descricao)}
                  />
                  {!!celular && (
                    <InfoRow
                      icon="phone"
                      label="Telefone"
                      value={celular}
                      last={!(isLandlord && descricao)}
                    />
                  )}
                  {isLandlord && !!descricao && (
                    <InfoRow icon="notes" label="Descrição" value={descricao} last />
                  )}
                </View>
              </View>

              <View style={styles.section}>
                <AppText style={styles.sectionTitle}>Atalhos</AppText>
                <View style={styles.card}>
                  <MenuRow
                    icon="chat-bubble-outline"
                    label="Minhas conversas"
                    onPress={() => router.push("/chatHub")}
                    last={false}
                  />
                  <MenuRow
                    icon="favorite-border"
                    label="Meus favoritos"
                    onPress={() => router.push("/favorites")}
                    last={!isLandlord}
                  />
                  {isLandlord && (
                    <MenuRow
                      icon="campaign"
                      label="Meus anúncios"
                      onPress={() => router.push("/myPosts")}
                      last
                    />
                  )}
                </View>
              </View>

              <View style={{ gap: 10 }}>
                <TouchableOpacity style={styles.primaryButton} onPress={() => setIsEditing(true)}>
                  <AppText style={styles.primaryButtonText}>Editar perfil</AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
                  <MaterialIcons name="logout" size={18} color={colors.danger} />
                  <AppText style={styles.dangerButtonText}>Sair da conta</AppText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <NavigationBar />
    </View>
  );
}
