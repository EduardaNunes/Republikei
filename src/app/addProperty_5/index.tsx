import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PhotoUpload from "@/components/photoUpload";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";


export default function App() {
  const router = useRouter();

  const {
    formData,
    updateFormData,
    saveProperty,
    isSubmitting,
    submissionSuccess,
    submissionError,
    clearSubmissionError,
    resetForm,
    propertyIdForEdit,
  } = useContext(NewPostContext);

  const [localData, setLocalData] = useState({
    descricao: formData.descricao,
    preco: formData.preco ? formData.preco.toString() : "",
    imagens: formData.imagens,
  });

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setLocalData({
      descricao: formData.descricao,
      preco: formData.preco ? formData.preco.toString() : "",
      imagens: formData.imagens,
    });
  }, [formData.descricao, formData.preco, formData.imagens]);

  useEffect(() => {
    if (submissionSuccess) {
      const message = propertyIdForEdit
        ? "Imóvel atualizado com sucesso!"
        : "O seu imóvel foi registado com sucesso!";
      
      Alert.alert("Sucesso!", message);
      
      resetForm();
      router.replace("/myProperties");
    }

    if (submissionError) {
      Alert.alert("Erro na Submissão", submissionError);
      clearSubmissionError();
    }
  }, [submissionSuccess, submissionError]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleChange = (field: keyof typeof localData, value: any) => {
    setLocalData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePrice = (value: string) => {

    if (value === "") {
      handleChange("preco", "");
      return;
    }

    if (/[^0-9., ]/.test(value)) {
      Alert.alert("Erro", "O valor inserido é inválido, preencha apenas com números");
      handleChange("preco", "");
      return;
    }

    const formatted = formatCurrency(value);
    handleChange("preco", formatted); 
  }

  function formatCurrency(value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) return "";
    
    const numberValue = (parseInt(digits) / 100).toFixed(2);
    const [intPart, decimalPart] = numberValue.split(".");
    
    const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${formattedInt},${decimalPart}`;
  }

  const handleContinue = async () => {

    if (!localData.descricao.trim() || !localData.preco || localData.imagens.length === 0){
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    const cleanValue = localData.preco.replace(/\./g, "").replace(",", ".");
    const parsedPrice = parseFloat(cleanValue);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Erro", "Insira um valor de aluguel válido.");
      return;
    }

    updateFormData({
      descricao: localData.descricao,
      preco: parsedPrice,
      imagens: localData.imagens,
    });

    await saveProperty();
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
            <AppText style={styles.title}>DETALHES</AppText>
            <AppText style={styles.subtitle}>DESCRIÇÃO E VALORES</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <Input
                title="Adicionar Descrição"
                containerStyle={{ width: "100%" }}
                onChangeText={(val: string) => handleChange("descricao", val)}
                value={localData.descricao}
                multiline
              />
              
              <Input
                variant="secondary"
                title="Mensalidade/Aluguer (R$)"
                containerStyle={{ width: "100%" }}
                keyboardType="numeric"
                onChangeText={(val: string) => handlePrice(val)}
                value={localData.preco}
              />

              <AppText style={styles.subtitle}>FOTOS (MÁX. 15)</AppText>
              <View style={styles.subCategoryContainer}>
                <PhotoUpload
                  onImagesChange={(uris) => handleChange("imagens", uris)}
                  initialState={localData.imagens}
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
          name={propertyIdForEdit ? "Guardar Alterações" : "Registar Imóvel"}
          variant="mediumP"
          onPress={handleContinue}
          disabled={isSubmitting}
        />
      </View>
      
      <Menu />
    </>
  );
}