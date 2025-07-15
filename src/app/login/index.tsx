import {
  Image,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/loginStyles";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Input from "@/components/input";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/backButton";

import { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  return (
    <SafeAreaProvider style={styles.container}>
      <BackButton 
        icon={"arrow-back"} 
        onPress={() => router.back()}
      />
      <SafeAreaView style={styles.imgContainer}>
        <Image source={require("@/assets/login-icon.png")} />
        <AppText style={styles.title}> LOGIN </AppText>
      </SafeAreaView>

      <View style={styles.containerTextAndButton}>
        {session && session.user && <AppText>{session.user.id}</AppText>}
        <View style={styles.inputContainer}>
          <Input
            title="Email"
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />

          <Input
            title="Senha"
            onChangeText={(text: string) => setPassword(text)}
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
            onPress={() => signInWithEmail()}
          />
          <View style={styles.signInContainer}>
            <AppText>Não tem Login?</AppText>
            <TouchableOpacity>
              <AppText style={styles.signInText}>Cadastrar</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}
