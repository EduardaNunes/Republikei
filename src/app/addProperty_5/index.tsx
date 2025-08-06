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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import PhotoUpload from "@/components/photoUpload";
import { supabase } from "@/lib/supabase";

// Interface para o estado unificado do formulário
interface FormData {
  descricao: string;
  preco: string;
  imagens: string[];
}

export default function AddProperty_5() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditMode = !!id;

  // Contexto é usado principalmente para o fluxo de CRIAÇÃO
  const {
    addProperty5,
    isSubmitting,
    submissionError,
    submissionSuccess,
    clearSubmissionError,
  } = useContext(NewPostContext);

  const [formData, setFormData] = useState<FormData>({
    descricao: "",
    preco: "",
    imagens: [],
  });

  const [loading, setLoading] = useState(isEditMode); // Para busca inicial de dados
  const [saving, setSaving] = useState(false); // Para o processo de update no modo de edição

  // Busca os dados existentes se estiver no modo de edição
  useEffect(() => {
    if (isEditMode) {
      const fetchPropertyDetails = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from("Imoveis")
            .select("descricao, preco, imagens")
            .eq("id", id)
            .single();

          if (error) throw error;

          if (data) {
            setFormData({
              descricao: data.descricao || "",
              preco: data.preco?.toString() || "",
              imagens: data.imagens || [],
            });
          } else {
            throw new Error("Imóvel não encontrado.");
          }
        } catch (error: any) {
          Alert.alert(
            "Erro ao Carregar",
            `Não foi possível buscar os detalhes finais: ${error.message}`
          );
          router.back();
        } finally {
          setLoading(false);
        }
      };
      fetchPropertyDetails();
    }
  }, [id, isEditMode]);

  // Observa o resultado do contexto APENAS para o fluxo de criação
  useEffect(() => {
    if (isEditMode) return; // Não executa no modo de edição

    if (submissionSuccess && !isSubmitting) {
      Alert.alert("Sucesso!", "Seu imóvel foi cadastrado.");
      router.replace("/myProperties");
    }
    if (submissionError) {
      Alert.alert("Erro ao cadastrar imóvel", submissionError);
      clearSubmissionError();
    }
  }, [submissionSuccess, submissionError, isSubmitting, isEditMode]);

  const handleInputChange = (
    field: keyof FormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFinalSave = async () => {
    // Validação
    if (!formData.descricao.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, adicione uma descrição.");
      return;
    }
    const precoNum = parseFloat(formData.preco);
    if (!formData.preco || isNaN(precoNum) || precoNum <= 0) {
      Alert.alert("Campo obrigatório", "Informe um preço válido.");
      return;
    }
    if (formData.imagens.length === 0) {
      Alert.alert("Campo obrigatório", "Adicione pelo menos uma foto.");
      return;
    }

    if (isEditMode) {
      // --- LÓGICA DE EDIÇÃO ---
      setSaving(true);
      try {
        const updatePayload = {
          descricao: formData.descricao,
          preco: precoNum,
          imagens: formData.imagens,
        };
        const { error } = await supabase
          .from("Imoveis")
          .update(updatePayload)
          .eq("id", id);
        if (error) throw error;

        Alert.alert("Sucesso!", "As alterações foram salvas.");
        router.replace({ pathname: "/pvuLandLord", params: { id } }); // Volta para a página do post
      } catch (error: any) {
        Alert.alert(
          "Erro ao Salvar",
          `Não foi possível salvar as alterações: ${error.message}`
        );
      } finally {
        setSaving(false);
      }
    } else {
      // --- LÓGICA DE CRIAÇÃO ---
      // Dispara o processo de submissão final que está no contexto
      addProperty5(formData.descricao, precoNum, formData.imagens);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <AppText>Carregando detalhes finais...</AppText>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <AppText style={styles.title}>
              {isEditMode ? "EDITAR DETALHES" : "DETALHES"}
            </AppText>
            <AppText style={styles.subtitle}>DESCRIÇÃO</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <Input
                title="Adicionar Descrição"
                containerStyle={{ width: "100%" }}
                onChangeText={(text) => handleInputChange("descricao", text)}
                value={formData.descricao}
              />
              <Input
                variant="secondary"
                title="Mensalidade/Aluguel"
                containerStyle={{ width: "100%" }}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("preco", text)}
                value={formData.preco}
              />
              <AppText style={styles.subtitle}>FOTOS (MAX 15)</AppText>
              <View style={styles.subCategoryContainer}>
                <PhotoUpload
                  onImagesChange={(uris) => handleInputChange("imagens", uris)}
                  initialImages={formData.imagens}
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
          disabled={saving || isSubmitting}
        />
        <SquareButton
          name={isEditMode ? "Finalizar Edição" : "Anunciar Imóvel"}
          variant="mediumP"
          onPress={handleFinalSave}
          disabled={saving || isSubmitting}
          loading={saving || isSubmitting}
        />
      </View>
      <Menu />
    </>
  );
}
