import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import { useRouter } from "expo-router";

export default function AddProperty_5() {
  const router = useRouter();

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
          }}
          keyboardShouldPersistTaps="handled">
          <View style={styles.titleContainer}>
          <AppText style={styles.title}>DETALHES</AppText>
          <AppText style={styles.subtitle}>DESCRIÇÃO</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <Input
              title="Adicionar Descrição"
              containerStyle={{ width: "100%" }}
            ></Input>
            <Input
              variant="secondary"
              title="Mensalidade/Aluguel"
              containerStyle={{ width: "100%" }}
            ></Input>

            <AppText style={styles.subtitle}>FOTOS (MAX 15)</AppText>
            <View style={styles.subCategoryContainer}>
              <Category name="Upload Fotos"></Category>
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
                onPress={() => router.push("/addProperty_2")}
              />
            </View>
      <Menu />
    </>
  );
}
