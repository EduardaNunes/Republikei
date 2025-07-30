import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { styles } from "../../components/styles/profileRenter";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";

export default function ProfileLandLord() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("NOME PERFIL");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [celular, setCelular] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSave = () => {
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

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
          {isEditing && <Input title="Nome" value={name} onChangeText={setName} />}
          <Input title="Email" value={email} onChangeText={setEmail} editable={isEditing} />
          <Input title="Senha" value={senha} onChangeText={setSenha} secureTextEntry editable={isEditing} />
          {isEditing && (
            <Input
              title="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry
            />
          )}
          <Input title="Celular" value={celular} onChangeText={setCelular} editable={isEditing} />
          <Input title="Descrição" value={descricao} onChangeText={setDescricao} editable={isEditing} />
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
