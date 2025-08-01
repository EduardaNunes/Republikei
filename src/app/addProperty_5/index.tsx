import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import { NewPostContext } from "@/contexts/NewPostContext";

export default function AddProperty_5() {
  const router = useRouter();

  const [descricao, setDescricao] = useState<string>("");
  const [preco, setPreco] = useState<string>("");

  const { addProperty5 } = useContext(NewPostContext);

  const handleEnvio = () => {
    addProperty5(descricao, parseFloat(preco));
  };

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
              ></Input>
              <Input
                variant="secondary"
                title="Mensalidade/Aluguel"
                containerStyle={{ width: "100%" }}
                onChangeText={(text: string) => setPreco(text)}
                value={preco}
              ></Input>

              <AppText style={styles.subtitle}>FOTOS (MAX 15)</AppText>
              <View style={styles.subCategoryContainer}>
                <Category name="Upload Fotos"></Category> {/* mudar para algo que de fato receba as imagens */}
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
          onPress={() => {
            router.push("/"); // precisa adicionar a rota certa, não sei pra onde tem que ir
            handleEnvio;
          }}
        />
      </View>
      <Menu />
    </>
  );
}
