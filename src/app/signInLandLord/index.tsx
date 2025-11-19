import {
  Image,
  View,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { styles } from "../../components/styles/signInLandLordStyles";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/backButton";
import AppText from "@/components/appText";

import { KeyboardAvoidingView } from "react-native";
import { useSignInLandLordPresenter } from "@/presenter/useSignInLandLordPresenter";

export default function SignInLandLord() {
  const {
    userName,
    email,
    phoneNumber,
    password,
    passwordConfirmation,
    loading,
    setUserName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setPasswordConfirmation,
    signUp,
    routerBack,
    checkIfPasswordIsValid,
  } = useSignInLandLordPresenter();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <BackButton onPress={routerBack} />
          <SafeAreaView style={styles.imgContainer}>
            <Image source={require("@/assets/cadLocat-icon.png")} />
            <AppText style={styles.title}> CADASTRO LOCADOR </AppText>
          </SafeAreaView>

          <View style={styles.containerTextAndButton}>
            <View style={styles.inputContainer}>
              <Input
                title="Usuário"
                onChangeText={(text: string) => setUserName(text)}
                value={userName}
                placeholder="Usuário"
                autoCapitalize="none"
              />

              <Input
                title="Email"
                onChangeText={(text: string) => setEmail(text)}
                value={email}
                placeholder="email@address.com"
                autoCapitalize="none"
              />

              <Input
                title="Telefone"
                onChangeText={(text: string) => setPhoneNumber(text)}
                value={phoneNumber}
                placeholder="(00) 0 0000-0000"
                autoCapitalize="none"
                keyboardType="phone-pad"
              />

              <Input
                title="Senha"
                secureTextEntry={true}
                onChangeText={(text: string) => setPassword(text)}
                value={password}
                placeholder="Senha"
                autoCapitalize="none"
              />

              <Input
                title="Confirmar Senha"
                secureTextEntry={true}
                onChangeText={(text: string) => setPasswordConfirmation(text)}
                value={passwordConfirmation}
                placeholder="Confirmar Senha"
                autoCapitalize="none"
              />
              {!checkIfPasswordIsValid() && (
                <AppText>As senhas precisam ser iguais</AppText>
              )}
            </View>
            <SquareButton
              name="Cadastrar"
              disabled={loading}
              onPress={() => signUp()}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
