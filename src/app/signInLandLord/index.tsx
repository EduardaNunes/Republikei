import {
  Image,
  View,
  ScrollView,
} from "react-native";

import { styles } from "./styles";
import { SquareButton } from "@/components/button";
import { Input } from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/backButton";
import AppText from "@/components/appText";

export default function SignInLandLord() {
  return (
    <ScrollView style={styles.container}>
      <BackButton style={styles.backButton} icon={"arrow-back"} />
      <SafeAreaView style={styles.imgContainer}>
        <Image source={require("@/assets/cadLocat-icon.png")} />
        <AppText style={styles.title}> CADASTRO LOCADOR </AppText>
      </SafeAreaView>

      <View style={styles.containerTextAndButton}>
        <View style={styles.inputContainer}>
          <Input title={"Usuário"}></Input>
          <Input title={"Email"}></Input>
          <Input title={"Telefone"}></Input>
          <Input secureTextEntry={true} title={"Senha"}></Input>
          <Input secureTextEntry={true} title={"Confirmar Senha"}></Input>
        </View>
        <SquareButton name="Cadastrar" />
      </View>
    </ScrollView>
  );
}
