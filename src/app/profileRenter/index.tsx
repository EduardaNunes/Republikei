import React, { useEffect, useState } from "react";
import { View, ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "../../components/styles/profileRenter";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";

import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";
import { UserAttributes } from "@supabase/supabase-js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileRenter() {
  const [userType, setUserType] = useState<string | null>(null);
  const [celular, setCelular] = useState("");
  const [descricao, setDescricao] = useState("");

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const router = useRouter();

   const handleLogout = () => {
    Alert.alert(
      "Sair da Conta", 
      "Você tem certeza que deseja se desconectar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Logout cancelado pelo usuário."),
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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setName(user.user_metadata.displayName || '');
        setEmail(user.email || 'E-mail não encontrado');
        setUserType(user.user_metadata.userType || null);
        setCelular(user.phone || "");
        setDescricao(user.user_metadata.descricao  || "");
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    if (!senhaAntiga) {
      Alert.alert("Atenção", "Por favor, informe sua senha antiga para salvar as alterações.");
      return;
    }
    if (senha && senha !== confirmarSenha) {
      Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
      return;
    }

    setLoading(true);

      try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) throw new Error("Não foi possível identificar o usuário.");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: senhaAntiga,
      });

      if (signInError) {
        throw new Error("A senha antiga está incorreta.");
      }

      const authUpdateData: UserAttributes = {};

      if (senha) {
        authUpdateData.password = senha;
      }

      if (email !== user.email) {
        authUpdateData.email = email;
      }

      if (name !== user.user_metadata.displayName) {
        authUpdateData.data = { displayName: name }
      }

      if (Object.keys(authUpdateData).length > 0) {
        const { error: authError } = await supabase.auth.updateUser(authUpdateData);
        if (authError) throw authError;
      }

      Alert.alert("Sucesso", "Perfil atualizado!");
      setIsEditing(false);

    } catch (error) {
      
      if (error instanceof Error) {
        Alert.alert("Erro ao atualizar", error.message);
      }

    } finally {
      setSenhaAntiga("");
      setSenha("");
      setConfirmarSenha("");
      setLoading(false);
    }

  };

  const handleCancel = async () => {

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setName(user.user_metadata.displayName || 'Sem Nome');
      setEmail(user.email || 'E-mail não encontrado');
    }
    
    setSenhaAntiga("");
    setSenha("");
    setConfirmarSenha(""); 
    
    setIsEditing(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
  >
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>{isEditing ? "EDITAR PERFIL" : 'PERFIL'}</AppText>
        </View>

        <View style={styles.inputContainer}>
          
          <Input title="Nome" value={name} onChangeText={setName} editable={isEditing} />
          
          <Input
            title="Email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing} 
          />
          {isEditing && (<Input
            title="Senha Antiga"
            value={senhaAntiga}
            onChangeText={setSenhaAntiga}
            secureTextEntry
            editable={isEditing} 
          />)}
          {isEditing && (<Input
            title="Nova Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={isEditing} 
          />)}
          {isEditing && (
            <Input
              title="Confirmar Nova Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          )}
          {userType === "owner" && (
            <>
              <Input title="Celular" value={celular} onChangeText={setCelular} editable={isEditing} />
              <Input title="Descrição" value={descricao} onChangeText={setDescricao} editable={isEditing} />
            </>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <SquareButton name="Cancelar" variant="shortS" onPress={handleCancel} />
              <SquareButton name="Salvar" variant="shortP" onPress={handleSave} />
            </>
          ) : (
            <>
              <SquareButton name="Logout" variant="shortS" onPress={handleLogout} />
              <SquareButton name="Editar" variant="shortP" onPress={() => setIsEditing(true)} />
            </>
          )}
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
      <Menu />
    </SafeAreaView>
    </>
  );
}