import { KeyboardAvoidingView, Platform, ScrollView, View, Alert } from "react-native";
import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useState, useEffect } from "react";
import { EspacoFisico } from "@/utils/typesAux";

export default function AddProperty_2() {
  const router = useRouter();

  const { formData, updateFormData } = useContext(NewPostContext);

  const [localEspaco, setLocalEspaco] = useState({
    banheiro: formData.espacoFisico.banheiro?.toString() || "",
    salaEstar: formData.espacoFisico.salaEstar?.toString() || "",
    areaServico: formData.espacoFisico.areaServico?.toString() || "",
    vagaGaragem: formData.espacoFisico.vagaGaragem?.toString() || "",
    cozinha: formData.espacoFisico.cozinha?.toString() || "",
    salaJantar: formData.espacoFisico.salaJantar?.toString() || "",
    varanda: formData.espacoFisico.varanda?.toString() || "",
  });

  const [pessoasCasa, setPessoasCasa] = useState(formData.quantPessoasCasa?.toString() || "");

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setLocalEspaco({
      banheiro: formData.espacoFisico.banheiro?.toString() || "",
      salaEstar: formData.espacoFisico.salaEstar?.toString() || "",
      areaServico: formData.espacoFisico.areaServico?.toString() || "",
      vagaGaragem: formData.espacoFisico.vagaGaragem?.toString() || "",
      cozinha: formData.espacoFisico.cozinha?.toString() || "",
      salaJantar: formData.espacoFisico.salaJantar?.toString() || "",
      varanda: formData.espacoFisico.varanda?.toString() || "",
    });
    setPessoasCasa(formData.quantPessoasCasa?.toString() || "");
  }, [formData.espacoFisico, formData.quantPessoasCasa]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleChange = (field: keyof typeof localEspaco, value: string) => {
    setLocalEspaco((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {

    const hasEmptyField = Object.values(localEspaco).some((val) => val === "");

    if (hasEmptyField) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    const auxPessoas = parseInt(pessoasCasa) || 0;
    
    const auxEspaco: EspacoFisico = {
      salaEstar: parseInt(localEspaco.salaEstar) || 0,
      banheiro: parseInt(localEspaco.banheiro) || 0,
      vagaGaragem: parseInt(localEspaco.vagaGaragem) || 0,
      cozinha: parseInt(localEspaco.cozinha) || 0,
      salaJantar: parseInt(localEspaco.salaJantar) || 0,
      areaServico: parseInt(localEspaco.areaServico) || 0,
      varanda: parseInt(localEspaco.varanda) || 0,
    };

    updateFormData({
      espacoFisico: auxEspaco,
      quantPessoasCasa: auxPessoas
    });

    router.push("/addProperty_3");
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
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>INFORMAÇÕES</AppText>
            <AppText style={styles.subtitle}>NÚMERO DE ...</AppText>
          </View>
          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Banheiros"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("banheiro", text)}
                  value={localEspaco.banheiro}
                />
                <Input
                  variant="secondary"
                  title="Salas Jantar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("salaJantar", text)}
                  value={localEspaco.salaJantar}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Salas de Estar"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("salaEstar", text)}
                  value={localEspaco.salaEstar}
                />
                <Input
                  variant="secondary"
                  title="Áreas de Serviço"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("areaServico", text)}
                  value={localEspaco.areaServico}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Vagas Garagem"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("vagaGaragem", text)}
                  value={localEspaco.vagaGaragem}
                />
                <Input
                  variant="secondary"
                  title="Cozinhas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("cozinha", text)}
                  value={localEspaco.cozinha}
                />
              </View>
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Varandas"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(text) => handleChange("varanda", text)}
                  value={localEspaco.varanda}
                />
                <Input
                  variant="secondary"
                  title="Pessoas na Casa"
                  keyboardType="numeric"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setPessoasCasa}
                  value={pessoasCasa}
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
          name="Continuar"
          variant="mediumP"
          onPress={handleContinue}
        />
      </View>
      <NavigationBar />
    </>
  );
}