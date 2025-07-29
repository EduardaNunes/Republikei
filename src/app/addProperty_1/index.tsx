import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";

export default function AddProperty_1() {
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
            <AppText style={styles.title}>ADICIONAR IMÓVEL</AppText>
            <AppText style={styles.subtitle}>LOCALIZAÇÃO</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <Input title="CEP" />
              <Input title="Rua" />
              <Input title="Bairro" />
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Número"
                  containerStyle={{ width: "48%" }}
                />
                <Input
                  variant="secondary"
                  title="Complemento"
                  containerStyle={{ width: "48%" }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
          <View style={styles.buttonsContainer}>
              <SquareButton
                name="Cancelar"
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
