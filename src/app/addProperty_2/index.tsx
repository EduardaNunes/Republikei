import { KeyboardAvoidingView, Platform, ScrollView, View, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useState } from "react";
import { EspacoFisico } from "@/utils/typesAux";

export default function AddProperty_2() {
  const router = useRouter();

  const [banheiro, setBanheiro] = useState("");
  const [estar, setEstar] = useState("");
  const [servico, setServico] = useState("");
  const [garagem, setGaragem] = useState("");
  const [cozinha, setCozinha] = useState("");
  const [jantar, setJantar] = useState("");
  const [varanda, setVaranda] = useState("");
  const [pessoasCasa, setPessoasCasa] = useState("");

  const { addProperty2 } = useContext(NewPostContext);

  const handleEnvio = () => {
    // Verifica se algum campo obrigatório está vazio
    if (
      !banheiro || !estar || !servico || !garagem ||
      !cozinha || !jantar || !varanda
    ) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    const auxPessoas = parseInt(pessoasCasa);
    const auxEspaco: EspacoFisico = {
      salaEstar: parseInt(estar),
      banheiro: parseInt(banheiro),
      vagaGaragem: parseInt(garagem),
      cozinha: parseInt(cozinha),
      salaJantar: parseInt(jantar),
      areaServico: parseInt(servico),
      varanda: parseInt(varanda),
    };

    addProperty2(auxEspaco, auxPessoas);
    router.push("/addProperty_3"); // Só avança se a validação passar
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
            <AppText style={styles.title}>INFORMAÇÕES</AppText>
            <AppText style={styles.subtitle}>NÚMERO DE ...</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.subinputContainer}>
        
                <Input
                  variant="secondary"
                  title="Banheiros"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setBanheiro}
                  value={banheiro}
                />

                <Input
                  variant="secondary"
                  title="Salas Jantar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setJantar}
                  value={jantar}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Salas de Estar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setEstar}
                  value={estar}
                />
                <Input
                  variant="secondary"
                  title="Áreas de Serviço"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setServico}
                  value={servico}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Vagas Garagem"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setGaragem}
                  value={garagem}
                />
                <Input
                  variant="secondary"
                  title="Cozinhas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setCozinha}
                  value={cozinha}
                />
              </View>
              <View style={styles.subinputContainer}>
                
                <Input
                  variant="secondary"
                  title="Varandas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setVaranda}
                  value={varanda}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <SquareButton
          name="Voltar"
          variant="mediumS"
          onPress={() => router.back()}
        />
        <SquareButton
          name="Continuar"
          variant="mediumP"
          onPress={handleEnvio} // chamada corrigida
        />
      </View>
      <Menu />
    </>
  );
}
