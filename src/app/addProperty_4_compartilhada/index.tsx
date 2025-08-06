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
import SelectableBlock from "@/components/selectableBlock";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState, useEffect } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";
import { tipoPadrao } from "@/utils/typesAux";
import { supabase } from "@/lib/supabase";
import { sharedHouseType, furniture } from "@/utils/enums"; // Importando opções

// Interface para o estado unificado do formulário
interface FormData {
  tipoMoradiaEspecifico: tipoPadrao | null;
  quantPessoasCasa: string;
  quantQuartos: string;
  pessoasPorQuarto: string;
  moveisDisponiveis: tipoPadrao[];
}

export default function AddProperty_4_compartilhada() {
  const router = useRouter();
  const { id, isFurnished } = useLocalSearchParams<{
    id?: string;
    isFurnished?: string;
  }>();

  const isEditMode = !!id;
  const showFurniture = isFurnished === "true";

  const { addProperty4 } = useContext(NewPostContext);

  const [formData, setFormData] = useState<FormData>({
    tipoMoradiaEspecifico: null,
    quantPessoasCasa: "",
    quantQuartos: "",
    pessoasPorQuarto: "",
    moveisDisponiveis: [],
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
            .select(
              "tipoMoradiaEspecifico, num_pessoasCasa, num_quartos, num_pessoasQuarto, moveisDisponiveis"
            )
            .eq("id", id)
            .single();

          if (error) throw error;

          if (data) {
            // Converte dados do DB para o formato do formulário
            const selectedTipoMoradia =
              sharedHouseType.find(
                (t) => t.name === data.tipoMoradiaEspecifico
              ) || null;

            const moveisFromDB = data.moveisDisponiveis || [];
            const selectedMoveis = furniture.filter((f) =>
              moveisFromDB.includes(f.name)
            );

            setFormData({
              tipoMoradiaEspecifico: selectedTipoMoradia,
              quantPessoasCasa: data.num_pessoasCasa?.toString() || "",
              quantQuartos: data.num_quartos?.toString() || "",
              pessoasPorQuarto: data.num_pessoasQuarto?.toString() || "",
              moveisDisponiveis: selectedMoveis,
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

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectionChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAndContinue = async () => {
    // Validação
    if (!formData.tipoMoradiaEspecifico?.id) {
      Alert.alert("Campo obrigatório", "Selecione o tipo de moradia.");
      return;
    }
    if (!formData.quantPessoasCasa) {
      Alert.alert(
        "Campo obrigatório",
        "Informe a quantidade de pessoas na moradia."
      );
      return;
    }
    if (!formData.quantQuartos) {
      Alert.alert("Campo obrigatório", "Informe a quantidade de quartos.");
      return;
    }
    if (!formData.pessoasPorQuarto) {
      Alert.alert(
        "Campo obrigatório",
        "Informe a quantidade de pessoas no quarto."
      );
      return;
    }
    if (showFurniture && formData.moveisDisponiveis.length === 0) {
      Alert.alert(
        "Campo obrigatório",
        "Selecione pelo menos um móvel disponível."
      );
      return;
    }

    setSaving(true);

    try {
      if (isEditMode) {
        // Monta o payload para update
        const updatePayload: any = {
          tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico?.name,
          num_pessoasCasa: parseInt(formData.quantPessoasCasa) || 0,
          num_quartos: parseInt(formData.quantQuartos) || 0,
          num_pessoasQuarto: parseInt(formData.pessoasPorQuarto) || 0,
        };
        // Só atualiza os móveis se a seção estiver visível
        if (showFurniture) {
          updatePayload.moveisDisponiveis = formData.moveisDisponiveis.map(
            (m) => m.name
          );
        }

        const { error } = await supabase
          .from("Imoveis")
          .update(updatePayload)
          .eq("id", id);
        if (error) throw error;
      } else {
        // Lógica de criação com o contexto
        addProperty4(
          formData.tipoMoradiaEspecifico,
          parseInt(formData.quantPessoasCasa),
          parseInt(formData.quantQuartos),
          parseInt(formData.pessoasPorQuarto),
          formData.moveisDisponiveis
        );
      }

      // Navega para a próxima tela, passando o ID se estiver editando
      router.push({
        pathname: "/addProperty_5",
        params: isEditMode ? { id } : {},
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
        <AppText>Carregando detalhes...</AppText>
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
              {isEditMode ? "EDITAR MORADIA COMPARTILHADA" : "COMPARTILHADA"}
            </AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
              <SelectableBlock
                type="sharedHouseType"
                returnSelected={(resposta) =>
                  handleSelectionChange("tipoMoradiaEspecifico", resposta)
                }
                initialSelection={formData.tipoMoradiaEspecifico}
              />
              <AppText style={styles.subtitle}>QUANTIDADE DE PESSOAS</AppText>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="No Quarto"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleInputChange("pessoasPorQuarto", text)
                  }
                  value={formData.pessoasPorQuarto}
                />
                <Input
                  variant="secondary"
                  title="Na Moradia"
                  containerStyle={{ width: "48%" }}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    handleInputChange("quantPessoasCasa", text)
                  }
                  value={formData.quantPessoasCasa}
                />
              </View>
              <AppText style={styles.subtitle}>QUANTIDADE DE QUARTOS</AppText>
              <Input
                variant="secondary"
                title="Quartos"
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange("quantQuartos", text)}
                value={formData.quantQuartos}
              />

              {showFurniture && (
                <>
                  <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                  <SelectableBlock
                    type="furniture"
                    returnSelected={(resposta) =>
                      handleSelectionChange("moveisDisponiveis", resposta ?? [])
                    }
                    initialSelection={formData.moveisDisponiveis}
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
          disabled={saving}
        />
        <SquareButton
          name={isEditMode ? "Salvar e Continuar" : "Continuar"}
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
