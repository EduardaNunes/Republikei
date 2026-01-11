import {
  Image,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect } from "react";
import { styles } from "../../components/styles/loginStyles";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Input from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/backButton";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";
import { useLoginPresenter } from "../../presenter/useLoginPresenter"; 

export default function Login() {
  const router = useRouter();

  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSignIn,
    navigateToSignUp,
  } = useLoginPresenter();

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/homePage");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <BackButton onPress={() => router.back()} />
          <SafeAreaView style={styles.imgContainer}>
            <Image source={require("@/assets/login-icon.png")} />
            <AppText style={styles.title}> LOGIN </AppText>
          </SafeAreaView>

          <View style={styles.containerTextAndButton}>
            <View style={styles.inputContainer}>
              <Input
                title="Email"
                onChangeText={setEmail} 
                value={email}
                placeholder="email@address.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <Input
                title="Senha"
                onChangeText={setPassword} 
                value={password}
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.buttonContainer}>
              <SquareButton
                name="Entrar"
                disabled={loading}
                onPress={handleSignIn}
              />
              <View style={styles.signInContainer}>
                <AppText>Não tem Login?</AppText>
                <TouchableOpacity onPress={navigateToSignUp}>
                  <AppText style={styles.signInText}>Cadastrar</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}