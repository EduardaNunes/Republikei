import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";

export default function AddProperty_4_compartilhada() {
  const router = useRouter();
  const { isFurnished } = useLocalSearchParams();
  const showFurniture = isFurnished === "true";

  const [tipoMoradiaEspecifico, setTipoMoradiaEspecifico] =
    useState<tipoPadrao>({ id: "", name: "" });
  const [quantPessoasCasa, setQuantPessoasCasa] = useState<string>('');
  const [quantQuartos, setQuantQuartos] = useState<string>('');
  const [individual, setIndividual] = useState<string>('');
  const [moveisDisponiveis, setMoveisDisponiveis] = useState<tipoPadrao[]>();

  const { addProperty4 } = useContext(NewPostContext);

  const handleEnvio = () => {
    addProperty4(
      tipoMoradiaEspecifico,
      parseInt(quantPessoasCasa),
      parseInt(quantQuartos),
      parseInt(individual),
      moveisDisponiveis
    );
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
            paddingBottom: 90,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>COMPARTILHADA</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
              <SelectableBlock
                type="sharedHouseType"
                returnSelected={(resposta) =>
                  setTipoMoradiaEspecifico(resposta)
                }
              ></SelectableBlock>
              <AppText style={styles.subtitle}>QUANTIDADE DE PESSOAS</AppText>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="No Quarto"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setIndividual(text)}
                  value={individual}
                ></Input>
                <Input
                  variant="secondary"
                  title="Na Moradia"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text: string) => setQuantPessoasCasa(text)}
                  value={quantPessoasCasa}
                ></Input>
              </View>
              {showFurniture && (
                <>
                  <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                  <SelectableBlock
                    type="furniture"
                    returnSelected={(resposta) =>
                      setMoveisDisponiveis(resposta)
                    }
                  />
                </>
              )}
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
            router.push("/addProperty_5");
            handleEnvio;
          }}
        />
      </View>
      <Menu />
    </>
  );
}
