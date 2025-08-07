import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { tipoPadrao } from "@/utils/typesAux";
import { NewPostContext } from "@/contexts/NewPostContext";

export default function addProperty_4_completa() {
  const router = useRouter();
  const { isFurnished } = useLocalSearchParams();
  const showFurniture = isFurnished === "true";

  const {
    addProperty4,
    tipoMoradiaEspecifico: contextTipoMoradiaEspecifico,
    quantQuartos: contextQuantQuartos,
    moveisDisponiveis: contextMoveisDisponiveis,
  } = useContext(NewPostContext);

  const [tipoMoradiaEspecifico, setTipoMoradiaEspecifico] = useState<tipoPadrao>(contextTipoMoradiaEspecifico);
  const [quantQuartos, setQuantQuartos] = useState<string>(contextQuantQuartos?.toString() || "");
  const [moveisDisponiveis, setMoveisDisponiveis] = useState<tipoPadrao[] | undefined>(contextMoveisDisponiveis);
  
  useEffect(() => {
    setTipoMoradiaEspecifico(contextTipoMoradiaEspecifico);
    setQuantQuartos(contextQuantQuartos?.toString() || "");
    setMoveisDisponiveis(contextMoveisDisponiveis);
  }, [contextTipoMoradiaEspecifico, contextQuantQuartos, contextMoveisDisponiveis]);


  const handleContinue = () => {
    if (!tipoMoradiaEspecifico?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }

    if (!quantQuartos || isNaN(parseInt(quantQuartos))) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de quartos.");
      return;
    }

    if (showFurniture && (!moveisDisponiveis || moveisDisponiveis.length === 0)) {
      Alert.alert("Campo obrigatório", "Selecione pelo menos um móvel.");
      return;
    }

    // Enviar dados
    addProperty4(
      tipoMoradiaEspecifico,
      0, // quantPessoasCasa (não usado nesta tela)
      parseInt(quantQuartos) || 0,
      0, // individual (não usado nesta tela)
      moveisDisponiveis
    );

    // Ir para próxima etapa
    router.push("/addProperty_5");
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
            <AppText style={styles.title}>COMPLETA</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
              <SelectableBlock
                type="completeHouseType"
                initialState={tipoMoradiaEspecifico}
                returnSelected={(resposta) =>
                  setTipoMoradiaEspecifico(resposta ?? { id: "", name: "" })
                }
              />
              <AppText style={styles.subtitle}>QUANTIDADE</AppText>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Quartos"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(text: string) => setQuantQuartos(text)}
                  value={quantQuartos}
                />
              </View>
              {showFurniture && (
                <>
                  <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                  <SelectableBlock
                    type="furniture"
                    initialState={moveisDisponiveis}
                    returnSelected={(resposta) =>
                      setMoveisDisponiveis(resposta ?? [])
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
          onPress={handleContinue}
        />
      </View>
      <Menu />
    </>
  );
}
