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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";

export default function AddProperty_4_compartilhada() {
  const router = useRouter();
  const { isFurnished } = useLocalSearchParams();
  const showFurniture = isFurnished === "true";

  const { formData, updateFormData } = useContext(NewPostContext);

  const [localData, setLocalData] = useState({
    tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico,
    quantPessoasCasa: formData.quantPessoasCasa ? formData.quantPessoasCasa.toString() : "",
    quantQuartos: formData.quantQuartos ? formData.quantQuartos.toString() : "",
    individual: formData.individual ? formData.individual.toString() : "",
    moveisDisponiveis: formData.moveisDisponiveis || [] as tipoPadrao[],
  });

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setLocalData({
      tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico,
      quantPessoasCasa: formData.quantPessoasCasa ? formData.quantPessoasCasa.toString() : "",
      quantQuartos: formData.quantQuartos ? formData.quantQuartos.toString() : "",
      individual: formData.individual ? formData.individual.toString() : "",
      moveisDisponiveis: formData.moveisDisponiveis || [],
    });
  }, [
    formData.tipoMoradiaEspecifico,
    formData.quantPessoasCasa,
    formData.quantQuartos,
    formData.individual,
    formData.moveisDisponiveis,
  ]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleChange = (field: keyof typeof localData, value: any) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!localData.tipoMoradiaEspecifico?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }

    if (!localData.quantPessoasCasa || isNaN(parseInt(localData.quantPessoasCasa))) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de pessoas na moradia.");
      return;
    }

    if (!localData.quantQuartos || isNaN(parseInt(localData.quantQuartos))) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de quartos.");
      return;
    }

    if (!localData.individual || isNaN(parseInt(localData.individual))) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de pessoas no quarto.");
      return;
    }

    if (showFurniture && (!localData.moveisDisponiveis || localData.moveisDisponiveis.length === 0)) {
      Alert.alert("Campo obrigatório", "Selecione pelo menos um móvel disponível.");
      return;
    }

    updateFormData({
      tipoMoradiaEspecifico: localData.tipoMoradiaEspecifico,
      quantPessoasCasa: parseInt(localData.quantPessoasCasa),
      quantQuartos: parseInt(localData.quantQuartos),
      individual: parseInt(localData.individual),
      moveisDisponiveis: localData.moveisDisponiveis,
    });

    router.push("/addProperty_5");
  };

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

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
                initialState={localData.tipoMoradiaEspecifico}
                returnSelected={(val) => handleChange("tipoMoradiaEspecifico", val)}
              />
              <AppText style={styles.subtitle}>QUANTIDADE DE PESSOAS</AppText>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="No Quarto"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(val) => handleChange("individual", val)}
                  value={localData.individual}
                />
                <Input
                  variant="secondary"
                  title="Na Moradia"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(val) => handleChange("quantPessoasCasa", val)}
                  value={localData.quantPessoasCasa}
                />
              </View>
              <AppText style={styles.subtitle}>QUANTIDADE DE QUARTOS</AppText>
              <Input
                variant="secondary"
                title="Quartos"
                keyboardType="numeric"
                onChangeText={(val) => handleChange("quantQuartos", val)}
                value={localData.quantQuartos}
              />

              {showFurniture && (
                <>
                  <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                  <SelectableBlock
                    type="furniture"
                    initialState={localData.moveisDisponiveis}
                    returnSelected={(val) => handleChange("moveisDisponiveis", val)}
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