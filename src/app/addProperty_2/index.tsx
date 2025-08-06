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
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useEffect, useState } from "react";
import { EspacoFisico } from "@/utils/typesAux";
import { supabase } from "@/lib/supabase";

interface FormData {
  banheiro: string;
  estar: string;
  servico: string;
  garagem: string;
  cozinha: string;
  jantar: string;
  varanda: string;
  pessoasCasa: string;
}

export default function AddProperty_2() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const isEditMode = !!id;

  const { addProperty2 } = useContext(NewPostContext);

  const [formData, setFormData] = useState<FormData>({
    banheiro: "",
    estar: "",
    servico: "",
    garagem: "",
    cozinha: "",
    jantar: "",
    varanda: "",
    pessoasCasa: "",
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
              "num_banheiro, num_salaEstar, num_areaServico, num_garagem, num_cozinha, num_salaJantar, num_varanda, num_pessoasCasa"
            )
            .eq("id", id)
            .single();

          if (error) throw error;

          if (data) {
            setFormData({
              banheiro: data.num_banheiro?.toString() || "0",
              estar: data.num_salaEstar?.toString() || "0",
              servico: data.num_areaServico?.toString() || "0",
              garagem: data.num_garagem?.toString() || "0",
              cozinha: data.num_cozinha?.toString() || "0",
              jantar: data.num_salaJantar?.toString() || "0",
              varanda: data.num_varanda?.toString() || "0",
              pessoasCasa: data.num_pessoasCasa?.toString() || "0",
            });
          } else {
            throw new Error("Imóvel não encontrado.");
          }
        } catch (error: any) {
          Alert.alert(
            "Erro ao Carregar",
            "Não foi possível buscar os dados do imóvel. Tente novamente."
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

  const handleSave = async () => {
    const { banheiro, estar, servico, garagem, cozinha, jantar, varanda } =
      formData;
    if (
      !banheiro ||
      !estar ||
      !servico ||
      !garagem ||
      !cozinha ||
      !jantar ||
      !varanda
    ) {
      return;
    }

    setSaving(true);

    const updatePayload = {
      num_banheiro: parseInt(formData.banheiro) || 0,
      num_salaEstar: parseInt(formData.estar) || 0,
      num_areaServico: parseInt(formData.servico) || 0,
      num_garagem: parseInt(formData.garagem) || 0,
      num_cozinha: parseInt(formData.cozinha) || 0,
      num_salaJantar: parseInt(formData.jantar) || 0,
      num_varanda: parseInt(formData.varanda) || 0,
      num_pessoasCasa: parseInt(formData.pessoasCasa) || 0,
    };

    try {
      if (isEditMode) {
        const { error } = await supabase
          .from("Imoveis")
          .update(updatePayload)
          .eq("id", id);

        if (error) throw error;

        // Após a primeira edição, navega para addProperty_3 mantendo o id
        router.push({ pathname: "/addProperty_3", params: { id } });
      } else {
        const espacoFisicoPayload: EspacoFisico = {
          salaEstar: parseInt(estar) || 0,
          banheiro: parseInt(banheiro) || 0,
          vagaGaragem: parseInt(garagem) || 0,
          cozinha: parseInt(cozinha) || 0,
          salaJantar: parseInt(jantar) || 0,
          areaServico: parseInt(servico) || 0,
          varanda: parseInt(varanda) || 0,
        };
        const pessoasMorandoPayload = parseInt(formData.pessoasCasa) || 0;

        addProperty2(espacoFisicoPayload, pessoasMorandoPayload);
        router.push("/addProperty_3");
      }
    } catch (error: any) {
      Alert.alert(
        "Erro ao Salvar",
        `Não foi possível salvar as informações. Detalhe: ${error.message}`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <AppText>Carregando dados do imóvel...</AppText>
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
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>
              {isEditMode ? "EDITAR INFORMAÇÕES" : "INFORMAÇÕES"}
            </AppText>
            <AppText style={styles.subtitle}>NÚMERO DE CÔMODOS</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Banheiros"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("banheiro", text)}
                  value={formData.banheiro}
                />
                <Input
                  variant="secondary"
                  title="Salas de Jantar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("jantar", text)}
                  value={formData.jantar}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Salas de Estar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("estar", text)}
                  value={formData.estar}
                />
                <Input
                  variant="secondary"
                  title="Áreas de Serviço"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("servico", text)}
                  value={formData.servico}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Vagas Garagem"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("garagem", text)}
                  value={formData.garagem}
                />
                <Input
                  variant="secondary"
                  title="Cozinhas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("cozinha", text)}
                  value={formData.cozinha}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Varandas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleInputChange("varanda", text)}
                  value={formData.varanda}
                />
                <Input
                  variant="secondary"
                  title="Pessoas na Casa"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) =>
                    handleInputChange("pessoasCasa", text)
                  }
                  value={formData.pessoasCasa}
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
          disabled={saving}
        />
        <SquareButton
          name={"Continuar"}
          variant="mediumP"
          onPress={handleSave}
          disabled={saving}
        />
      </View>
      <Menu />
    </>
  );
}
