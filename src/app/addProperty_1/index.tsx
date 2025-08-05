import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useState } from "react";
import { Localizacao } from "@/utils/typesAux";

export default function AddProperty_1() {
  const router = useRouter();

  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const { addProperty1 } = useContext(NewPostContext);

  const handleEnvio = () => {
    const aux: Localizacao = {
      cep: cep,
      rua: rua,
      bairro: bairro,
      numero: parseFloat(numero),
      complemento: complemento,
    };

    addProperty1(aux);
  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>ADICIONAR IMÓVEL</AppText>
            <AppText style={styles.subtitle}>LOCALIZAÇÃO</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <Input
                title="CEP"
                onChangeText={(text: string) => setCep(text)}
                value={cep}
              />
              <Input
                title="Rua"
                onChangeText={(text: string) => setRua(text)}
                value={rua}
              />
              <Input
                title="Bairro"
                onChangeText={(text: string) => setBairro(text)}
                value={bairro}
              />
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Número"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setNumero(text)}
                  value={numero}
                />
                <Input
                  variant="secondary"
                  title="Complemento"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setComplemento(text)}
                  value={complemento}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <SquareButton
          name="Cancelar"
          variant="mediumS"
          onPress={() => router.back()}
        />
        <SquareButton
          name="Continuar"
          variant="mediumP"
          onPress={() => {
            handleEnvio;
            router.push("/addProperty_2");
          }}
        />
      </View>
      <Menu />
    </>
  );
}
