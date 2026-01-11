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
import NavigationBar from "@/components/navigationBar";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";
import { useState, useContext, useCallback, useEffect } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";

export default function AddProperty_3() {
  const router = useRouter();

  const { formData, updateFormData } = useContext(NewPostContext);

  const [postData, setPostData] = useState({
    tipoMoradia: formData.tipoMoradia,
    mobiliado: formData.mobiliado
      ? { id: "question-sim", name: "Sim" }
      : { id: "question-nao", name: "Não" },
    caracteristicas: formData.caracteristicas,
    tipoVaga: formData.tipoVaga
  })

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setPostData({
      tipoMoradia: formData.tipoMoradia,
      mobiliado: formData.mobiliado
        ? { id: "question-sim", name: "Sim" }
        : { id: "question-nao", name: "Não" },
      caracteristicas: formData.caracteristicas,
      tipoVaga: formData.tipoVaga
    });
    
  }, [
    formData.tipoMoradia,
    formData.mobiliado,
    formData.caracteristicas,
    formData.tipoVaga,
  ]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleChange = (field: keyof typeof postData, value: any) => {
    setPostData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!postData.tipoMoradia?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }

    if (!postData.mobiliado?.id) {
      Alert.alert("Campo obrigatório", "Informe se a moradia é mobiliada ou não.");
      return;
    }

    const isFurnishedBoolean = postData.mobiliado.id === "question-sim";

    updateFormData({
      tipoMoradia: postData.tipoMoradia,
      mobiliado: isFurnishedBoolean,
      caracteristicas: postData.caracteristicas,
      tipoVaga: postData.tipoVaga,
    });

    const isFurnishedParam = isFurnishedBoolean.toString();

    // Navegação baseada no tipo de moradia
    if (postData.tipoMoradia.id === "housingType-compartilhada") {
      router.push({
        pathname: "/addProperty_4_compartilhada",
        params: { isFurnished: isFurnishedParam },
      });
    } else if (postData.tipoMoradia.id === "housingType-completa") {
      router.push({
        pathname: "/addProperty_4_completa",
        params: { isFurnished: isFurnishedParam },
      });
    }
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
            <AppText style={styles.title}>CARACTERÍSTICAS</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
              <SelectableBlock
                type="characteristics"
                initialState={postData.caracteristicas}
                returnSelected={(val) => handleChange("caracteristicas", val)}
              />

              <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
              <SelectableBlock
                type="vacancyType"
                initialState={postData.tipoVaga}
                returnSelected={(val) => handleChange("tipoVaga", val)}
              />

              <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
              <SelectableBlock
                type="housingType"
                initialState={postData.tipoMoradia}
                returnSelected={(val) => handleChange("tipoMoradia", val)}
              />

              <AppText style={styles.subtitle}>MOBILIADO?</AppText>
              <SelectableBlock
                type="question"
                initialState={postData.mobiliado}
                returnSelected={(val) => handleChange("mobiliado", val)}
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

      <NavigationBar />
    </>
  );
}