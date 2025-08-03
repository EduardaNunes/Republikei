import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";

export default function AddProperty_3() {
  const router = useRouter();

  const [housingTypeSelected, setHousingTypeSelected] = useState<tipoPadrao>({
    id: "",
    name: "",
  });
  const [furnished, setFurnished] = useState<tipoPadrao>({
    id: "",
    name: "",
  });

  const [caracteristicas, setCaracteristicas] = useState<tipoPadrao[]>([]);
  const [tipoVaga, setTipoVaga] = useState<tipoPadrao>({
    id: "",
    name: "",
  });

  const { addProperty3 } = useContext(NewPostContext);

  const handleEnvio = () => {
    const auxMobiliado = furnished.id === "question-sim" ? true : false;
    addProperty3(caracteristicas, tipoVaga, housingTypeSelected, auxMobiliado);
  };

  const handleContinue = () => {
    if (!housingTypeSelected.id) {
      alert("Selecione o tipo de moradia");
      return;
    }
    if (!furnished.id) {
      alert("Informe se a moradia é mobiliada ou não");
      return;
    }

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
                returnSelected={(resposta) => setCaracteristicas(resposta)}
              />

              <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
              <SelectableBlock
                type="vacancyType"
                returnSelected={(resposta) => setTipoVaga(resposta)}
              />

              <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
              <SelectableBlock
                type="housingType"
                returnSelected={(resposta) => setHousingTypeSelected(resposta)}
              />

              <AppText style={styles.subtitle}>MOBILIADO?</AppText>
              <SelectableBlock
                type="question"
                returnSelected={(resposta) => setFurnished(resposta)}
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
          onPress={() => {
            handleContinue();
            handleEnvio();
          }}
        />
      </View>

      <Menu />
    </>
  );
}
