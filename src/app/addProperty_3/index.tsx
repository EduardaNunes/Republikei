import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";
import { useState, useContext, useCallback, useEffect } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";

export default function AddProperty_3() {
  const router = useRouter();

  const {
    addProperty3,
    caracteristicas: contextCaracteristicas,
    tipoVaga: contextTipoVaga,
    tipoMoradia: contextTipoMoradia,
    mobiliado: contextMobiliado,
  } = useContext(NewPostContext);

  console.log(contextMobiliado)
  const [housingTypeSelected, setHousingTypeSelected] = useState<tipoPadrao>(contextTipoMoradia);
  const [furnished, setFurnished] = useState<tipoPadrao>(() => 
    contextMobiliado ? { id: "question-sim", name: "Sim" } : { id: "question-nao", name: "Não" }
  );
  const [caracteristicas, setCaracteristicas] = useState<tipoPadrao[]>(contextCaracteristicas);
  const [tipoVaga, setTipoVaga] = useState<tipoPadrao>(contextTipoVaga);


  const handleEnvio = () => {
    const auxMobiliado = furnished.id === "question-sim";
    addProperty3(caracteristicas, tipoVaga, housingTypeSelected, auxMobiliado);
  };
  console.log(furnished)
  const handleContinue = () => {
    if (!housingTypeSelected?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }

    if (!furnished?.id) {
      Alert.alert("Campo obrigatório", "Informe se a moradia é mobiliada ou não.");
      return;
    }

    handleEnvio();

    const isFurnished = (furnished.id === "question-sim").toString();

    if (housingTypeSelected.id === "housingType-compartilhada") {
      router.push({
        pathname: "/addProperty_4_compartilhada",
        params: { isFurnished },
      });
    } else if (housingTypeSelected.id === "housingType-completa") {
      router.push({
        pathname: "/addProperty_4_completa",
        params: { isFurnished },
      });
    }
  };

  useEffect(() => {
    setHousingTypeSelected(contextTipoMoradia);
    setFurnished(contextMobiliado ? { id: "question-sim", name: "Sim" } : { id: "question-nao", name: "Não" });
    setCaracteristicas(contextCaracteristicas);
    setTipoVaga(contextTipoVaga);
  }, [contextTipoMoradia, contextMobiliado, contextCaracteristicas, contextTipoVaga]);


  const handleCaracteristicasSelect = useCallback((resposta: tipoPadrao | tipoPadrao[] | null) => {
    setCaracteristicas(resposta as tipoPadrao[] ?? []);
  }, []);

  const handleTipoVagaSelect = useCallback((resposta: tipoPadrao | tipoPadrao[] | null) => {
    setTipoVaga(resposta as tipoPadrao ?? { id: "", name: "" });
  }, []);
  
  const handleHousingTypeSelect = useCallback((resposta: tipoPadrao | tipoPadrao[] | null) => {
    setHousingTypeSelected(resposta as tipoPadrao ?? { id: "", name: "" });
  }, []);

  const handleFurnishedSelect = useCallback((resposta: tipoPadrao | tipoPadrao[] | null) => {
    setFurnished(resposta as tipoPadrao ?? { id: "", name: "" });
  }, []);

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
            <AppText style={styles.title}>CARACTERÍSTICAS</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
            <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
            <SelectableBlock
              type="characteristics"
              initialState={caracteristicas}
              // 3. PASSE A FUNÇÃO ESTÁVEL
              returnSelected={handleCaracteristicasSelect}
            />

            <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
            <SelectableBlock
              type="vacancyType"
              initialState={tipoVaga} // Adicione initialState aqui
              returnSelected={handleTipoVagaSelect}
            />

            <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
            <SelectableBlock
              type="housingType"
              initialState={housingTypeSelected} // Adicione initialState aqui
              returnSelected={handleHousingTypeSelect}
            />

            <AppText style={styles.subtitle}>MOBILIADO?</AppText>
            <SelectableBlock
              type="question"
              initialState={furnished} // Adicione initialState aqui
              returnSelected={handleFurnishedSelect}
            />
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
