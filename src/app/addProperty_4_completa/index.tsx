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

export default function AddProperty_4_completa() {
  const router = useRouter();
  const { isFurnished } = useLocalSearchParams();
  const showFurniture = isFurnished === "true";

  const { formData, updateFormData } = useContext(NewPostContext);

  const [localData, setLocalData] = useState({
    tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico,
    quantQuartos: formData.quantQuartos ? formData.quantQuartos.toString() : "",
    moveisDisponiveis: formData.moveisDisponiveis || ([] as tipoPadrao[]),
  });

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setLocalData({
      tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico,
      quantQuartos: formData.quantQuartos ? formData.quantQuartos.toString() : "",
      moveisDisponiveis: formData.moveisDisponiveis || [],
    });
  }, [
    formData.tipoMoradiaEspecifico,
    formData.quantQuartos,
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

    if (!localData.quantQuartos || isNaN(parseInt(localData.quantQuartos))) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de quartos.");
      return;
    }

    if (
      showFurniture &&
      (!localData.moveisDisponiveis || localData.moveisDisponiveis.length === 0)
    ) {
      Alert.alert("Campo obrigatório", "Selecione pelo menos um móvel.");
      return;
    }

    updateFormData({
      tipoMoradiaEspecifico: localData.tipoMoradiaEspecifico,
      quantQuartos: parseInt(localData.quantQuartos),
      moveisDisponiveis: localData.moveisDisponiveis || [],
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
            <AppText style={styles.title}>COMPLETA</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
              <SelectableBlock
                type="completeHouseType"
                initialState={localData.tipoMoradiaEspecifico}
                returnSelected={(val) => handleChange("tipoMoradiaEspecifico", val)}
              />
              <AppText style={styles.subtitle}>QUANTIDADE</AppText>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Quartos"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(val: string) => handleChange("quantQuartos", val)}
                  value={localData.quantQuartos}
                />
              </View>
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