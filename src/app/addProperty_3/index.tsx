import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AddProperty_3() {
  const router = useRouter();

  const [housingTypeSelected, setHousingTypeSelected] = useState<string | null>(null);

  const handleContinue = () => {
    if (housingTypeSelected === "housingType-compartilhada") {
      router.push("/addProperty_4_compartilhada");
    } else if (housingTypeSelected === "housingType-completa") {
      router.push("/addProperty_4_completa");
    } else {
      alert("Selecione o tipo de moradia");
    }
  };

  
  return (

    
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingHorizontal: 20,
            paddingBottom:90,
          }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.titleContainer}>
          <AppText style={styles.title}>CARACTERÍSTICAS</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
            <SelectableBlock type="characteristics"></SelectableBlock>
            <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
            <SelectableBlock type="vacancyType"></SelectableBlock>
            <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
            <SelectableBlock
              type="housingType"
                returnSelected={(resposta) => setHousingTypeSelected(resposta as string)}
            />
            <AppText style={styles.subtitle}>MOBILIADO?</AppText>
            <SelectableBlock type="question"></SelectableBlock>
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
