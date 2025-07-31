import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { styles } from "../../components/styles/profileRenter";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";

export default function ProfileRenter() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("NOME PERFIL"); // Adicionado estado para o nome, se aplicável
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState(""); // Adicionado para confirmação de senha


  const handleSave = () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    console.log("Dados salvos:", { name, email, senha });
    setIsEditing(false); 
  };

  const handleCancel = () => {
    setIsEditing(false);
    setConfirmarSenha(""); 
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>{isEditing ? "EDITAR PERFIL" : name}</AppText>
        </View>

        <View style={styles.inputContainer}>
          {isEditing && (
            <Input title="Nome" value={name} onChangeText={setName} />
          )}
          <Input
            title="Email"
            value={email}
            onChangeText={setEmail}
            editable={isEditing} 
          />
          <Input
            title="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            editable={isEditing} 
          />
          {isEditing && (
            <Input
              title="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
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
              <SquareButton name="Logout" variant="shortS" onPress={() => console.log("logout")} />
              <SquareButton name="Editar" variant="shortP" onPress={() => setIsEditing(true)} />
            </>
          )}
        </View>
      </ScrollView>
      <Menu />
    </>
  );
}