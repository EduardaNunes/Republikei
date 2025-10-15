import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export function useLoginPresenter() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Por favor, preencha e-mail e senha.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Erro no Login", error.message);
    } else {
      // A navegação já é tratada pelo listener de auth no /login ou /index
      // router.replace("/homePage");
    }
    setLoading(false);
  };

  const navigateToSignUp = () => {
    router.push("/");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSignIn,
    navigateToSignUp,
  };
}