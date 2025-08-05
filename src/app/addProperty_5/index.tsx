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
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import PhotoUpload from "@/components/photoUpload";

export default function AddProperty_5() {
  const router = useRouter();

  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [imagens, setImagens] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const { addProperty5, isSubmitting, submissionError, submissionSuccess, clearSubmissionError} = useContext(NewPostContext);

  const handleContinue = async () => {

    if (!descricao.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, adicione uma descrição.");
      return;
    }

    const precoNum = parseFloat(preco);
    if (!preco || isNaN(precoNum) || precoNum <= 0) {
      Alert.alert("Campo obrigatório", "Informe um preço válido.");
      return;
    }

    if (!imagens || imagens.length === 0) {
      Alert.alert("Campo obrigatório", "Adicione pelo menos uma foto.");
      return;
    }

    setLoading(true);

    addProperty5(descricao, parseFloat(preco), imagens);

    setLoading(false);
  };

  useEffect(() => {
    if (submissionSuccess && !isSubmitting) {
      Alert.alert("Sucesso!", "Seu imóvel foi cadastrado.");
      router.replace("/myProperties");
    }
    if (submissionError) {
      Alert.alert("Erro ao cadastrar imóvel", submissionError);
      clearSubmissionError();
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
                <PhotoUpload onImagesChange={(uris) => setImagens(uris)} />
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
        <SquareButton name="Continuar" variant="mediumP" onPress={handleContinue} />
      </View>
      <Menu />
    </>
  );
}
