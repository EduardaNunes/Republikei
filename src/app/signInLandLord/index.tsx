import {
  Image,
  View,
  ScrollView,
  Alert,
} from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/signInLandLoardStyles";
import { SquareButton } from "@/components/button";
import { Input } from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { BackButton } from "@/components/backButton";
import AppText from "@/components/appText";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function SignInLandLord() {

  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signUp() {

    if(!checkIfPasswordIsValid()) return;

    setLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      phone: phoneNumber,
      email: email,
      password: password,
      options:{
        data:{
          displayName: userName,
        }
      }
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  function checkIfPasswordIsValid(){
    if(password === passwordConfirmation) return true;
    else return false
  }

  return (
    <ScrollView style={styles.container}>
      <BackButton 
        style={styles.backButton}
        icon={"arrow-back"}
        onPress={() => router.back()} 
      />
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
          {!checkIfPasswordIsValid() && <AppText>As senhas precisam ser iguais</AppText>}

        </View>
        <SquareButton
          name="Cadastrar"
          disabled={loading}
          onPress={() => signUp()}
        />
      </View>
    </ScrollView>
  );
}
