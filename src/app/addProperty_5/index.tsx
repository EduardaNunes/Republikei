import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import PhotoUpload from "@/components/photoUpload";

export default function AddProperty_5() {
  const router = useRouter();

  const {
    addProperty5,
    isSubmitting,
    submissionError,
    submissionSuccess,
    clearSubmissionError,
    descricao: contextDescricao,
    preco: contextPreco,
    imagens: contextImagens,
    propertyIdForEdit,
  } = useContext(NewPostContext);

  const { propertyId } = useLocalSearchParams<{ propertyId: string }>();

  const [descricao, setDescricao] = useState<string>(contextDescricao);
  const [preco, setPreco] = useState<string>(contextPreco?.toString() || "");
  const [imagens, setImagens] = useState<string[]>(contextImagens);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("IMAGENS INICIAIS PASSADAS PARA O PhotoUpload:", contextImagens);
    setDescricao(contextDescricao);
    setPreco(contextPreco?.toString() || "");
    setImagens(contextImagens);
  }, [contextDescricao, contextPreco, contextImagens]);

  const handleContinue = () => {
    if (!descricao.trim() || !preco || !imagens || imagens.length === 0) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    addProperty5(descricao, parseFloat(preco), imagens);
  };

  useEffect(() => {
    // Se a submissão terminou E foi um sucesso...
    if (submissionSuccess && !isSubmitting) {
      const message = propertyId ? "Imóvel atualizado com sucesso!" : "Seu imóvel foi cadastrado!";
      Alert.alert("Sucesso!", message);
      router.replace("/myProperties");
    }

    // Se um erro de submissão apareceu...
    if (submissionError) {
      Alert.alert("Erro ao cadastrar imóvel", submissionError);
      clearSubmissionError(); // Limpa o erro para não mostrar o alerta de novo
    }
  }, [submissionSuccess, submissionError, isSubmitting]);

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
            <AppText style={styles.subtitle}>DESCRIÇÃO</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <Input
                title="Adicionar Descrição"
                containerStyle={{ width: "100%" }}
                onChangeText={(text: string) => setDescricao(text)}
                value={descricao}
              />
              <Input
                variant="secondary"
                title="Mensalidade/Aluguel"
                containerStyle={{ width: "100%" }}
                keyboardType="numeric"
                onChangeText={(text: string) => setPreco(text)}
                value={preco}
              />

              <AppText style={styles.subtitle}>FOTOS (MAX 15)</AppText>
              <View style={styles.subCategoryContainer}>
                <PhotoUpload onImagesChange={(uris) => setImagens(uris)} initialState={imagens}/>
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
          name={propertyIdForEdit ? "Salvar Alterações" : "Cadastrar Imóvel"} 
          variant="mediumP" 
          onPress={handleContinue} 
          disabled={isSubmitting} 
        />
      </View>
      <Menu />
    </>
  );
}
