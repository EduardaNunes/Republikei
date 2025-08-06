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
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useContext, useEffect } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";
import { supabase } from "@/lib/supabase";

// Importando as opções para fazer a conversão dos dados
import {
  characteristics,
  vacancyType,
  housingType,
  question,
} from "@/utils/enums";

// Interface para o estado unificado do formulário
interface FormData {
  caracteristicas: tipoPadrao[];
  tipoVaga: tipoPadrao | null;
  tipoMoradia: tipoPadrao | null;
  mobiliado: tipoPadrao | null;
}

export default function AddProperty_3() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string; isFurnished?: string }>();
  const isEditMode = !!id;

  const { addProperty3 } = useContext(NewPostContext);

  const [formData, setFormData] = useState<FormData>({
    caracteristicas: [],
    tipoVaga: null,
    tipoMoradia: null,
    mobiliado: null,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      const fetchPropertyDetails = async () => {
        setLoading(true);
        try {
          const { data, error } = await supabase
            .from("Imoveis")
            .select("caracteristicas, tipoVaga, tipoMoradia, mobiliado")
            .eq("id", id)
            .single();

          if (error) throw error;

          if (data) {
            // Converte os dados do DB para o formato que o SelectableBlock espera (objetos)
            const caracteristicasFromDB = data.caracteristicas || [];
            const selectedCaracteristicas = characteristics.filter((c) =>
              caracteristicasFromDB.includes(c.name)
            );

            const selectedTipoVaga =
              vacancyType.find((v) => v.name === data.tipoVaga) || null;
            const selectedTipoMoradia =
              housingType.find((h) => h.name === data.tipoMoradia) || null;
            const selectedMobiliado =
              question.find((q) =>
                data.mobiliado
                  ? q.id === "question-sim"
                  : q.id === "question-nao"
              ) || null;

            setFormData({
              caracteristicas: selectedCaracteristicas,
              tipoVaga: selectedTipoVaga,
              tipoMoradia: selectedTipoMoradia,
              mobiliado: selectedMobiliado,
            });
          } else {
            throw new Error("Imóvel não encontrado.");
          }
        } catch (error: any) {
          Alert.alert(
            "Erro ao Carregar",
            `Não foi possível buscar os dados: ${error.message}`
          );
          router.back();
        } finally {
          setLoading(false);
        }
      };
      fetchPropertyDetails();
    }
  }, [id, isEditMode]);

  const handleSelectionChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAndContinue = async () => {
    // Validação
    if (!formData.tipoMoradia?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }
    if (!formData.mobiliado?.id) {
      Alert.alert(
        "Campo obrigatório",
        "Informe se a moradia é mobiliada ou não."
      );
      return;
    }

    setSaving(true);

    try {
      if (isEditMode) {
        // Converte os dados do formulário para o formato do DB (strings/boolean)
        const updatePayload = {
          caracteristicas: formData.caracteristicas.map((c) => c.name),
          tipoVaga: formData.tipoVaga?.name,
          tipoMoradia: formData.tipoMoradia?.name,
          mobiliado: formData.mobiliado?.id === "question-sim",
        };

        const { error } = await supabase
          .from("Imoveis")
          .update(updatePayload)
          .eq("id", id);

        if (error) throw error;
      } else {
        // Lógica de criação original usando o contexto
        const auxMobiliado = formData.mobiliado.id === "question-sim";
        addProperty3(
          formData.caracteristicas,
          formData.tipoVaga,
          formData.tipoMoradia,
          auxMobiliado
        );
      }

      // Lógica de navegação condicional
      const isFurnished = (formData.mobiliado.id === "question-sim").toString();
      const pathname =
        formData.tipoMoradia.id === "housingType-compartilhada"
          ? "/addProperty_4_compartilhada"
          : "/addProperty_4_completa";

      router.push({
        pathname,
        params: isEditMode ? { id, isFurnished } : { isFurnished },
      });
    } catch (error: any) {
      Alert.alert(
        "Erro ao Salvar",
        `Não foi possível salvar as informações: ${error.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <AppText>Carregando características...</AppText>
      </View>
    );
  }

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
            <AppText style={styles.title}>
              {isEditMode ? "EDITAR CARACTERÍSTICAS" : "CARACTERÍSTICAS"}
            </AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
              <SelectableBlock
                type="characteristics"
                returnSelected={(resposta) =>
                  handleSelectionChange("caracteristicas", resposta ?? [])
                }
                initialSelection={formData.caracteristicas}
              />

              <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
              <SelectableBlock
                type="vacancyType"
                returnSelected={(resposta) =>
                  handleSelectionChange("tipoVaga", resposta)
                }
                initialSelection={formData.tipoVaga}
              />

              <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
              <SelectableBlock
                type="housingType"
                returnSelected={(resposta) =>
                  handleSelectionChange("tipoMoradia", resposta)
                }
                initialSelection={formData.tipoMoradia}
              />

              <AppText style={styles.subtitle}>MOBILIADO?</AppText>
              <SelectableBlock
                type="question"
                returnSelected={(resposta) =>
                  handleSelectionChange("mobiliado", resposta)
                }
                initialSelection={formData.mobiliado}
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
          disabled={saving}
        />
        <SquareButton
          name={"Continuar"}
          variant="mediumP"
          onPress={handleSaveAndContinue}
          disabled={saving}
          loading={saving}
        />
      </View>

      <Menu />
    </>
  );
}
