import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";
import { NewPostContext, NewPostProvider } from "@/contexts/NewPostContext";
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
  };

  return (
    <NewPostProvider>
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
                  title="Pessoas/Imóvel"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setPessoasCasa(text)}
                  value={pessoasCasa}
                ></Input>
                <Input
                  variant="secondary"
                  title="Banheiros"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setBanheiro(text)}
                  value={banheiro}
                ></Input>
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Salas de Estar"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setEstar(text)}
                  value={estar}
                ></Input>
                <Input
                  variant="secondary"
                  title="Áreas de Serviço"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setServico(text)}
                  value={servico}
                ></Input>
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Vagas Garagem"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setGaragem(text)}
                  value={garagem}
                ></Input>
                <Input
                  variant="secondary"
                  title="Cozinhas"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setCozinha(text)}
                  value={cozinha}
                ></Input>
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Salas Jantar"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setJantar(text)}
                  value={jantar}
                ></Input>
                <Input
                  variant="secondary"
                  title="Varandas"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setVaranda(text)}
                  value={varanda}
                ></Input>
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
          onPress={() => {
            router.push("/addProperty_3");
            handleEnvio;
          }}
        />
      </View>
      <Menu />
    </NewPostProvider>
  );
}
