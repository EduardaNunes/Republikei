import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";

export default function AddProperty_2() {
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
          <AppText style={styles.title}>INFORMAÇÕES</AppText>
          <AppText style={styles.subtitle}>NÚMERO DE ...</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.subinputContainer}>
              <Input
                variant="secondary"
                title="Pessoas/Imóvel"
                containerStyle={{ width: "48%" }}
              ></Input>
              <Input
                variant="secondary"
                title="Banheiros"
                containerStyle={{ width: "48%" }}
              ></Input>
            </View>
            <View style={styles.subinputContainer}>
              <Input
                variant="secondary"
                title="Salas de Estar"
                containerStyle={{ width: "48%" }}
              ></Input>
              <Input
                variant="secondary"
                title="Áreas de Serviço"
                containerStyle={{ width: "48%" }}
              ></Input>
            </View>
            <View style={styles.subinputContainer}>
              <Input
                variant="secondary"
                title="Vagas Garagem"
                containerStyle={{ width: "48%" }}
              ></Input>
              <Input
                variant="secondary"
                title="Cozinhas"
                containerStyle={{ width: "48%" }}
              ></Input>
            </View>
            <View style={styles.subinputContainer}>
              <Input
                variant="secondary"
                title="Salas Jantar"
                containerStyle={{ width: "48%" }}
              ></Input>
              <Input
                variant="secondary"
                title="Varandas"
                containerStyle={{ width: "48%" }}
              ></Input>
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
                onPress={() => router.push("/addProperty_3")}
              />
            </View>
      <Menu />
    </>
  );
}
