import { Alert } from "react-native";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export function useSignInRenterPresenter() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    let sub: { subscription: { unsubscribe: () => void } } | null = null;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    sub = data;
    return () => {
      if (sub?.subscription?.unsubscribe) sub.subscription.unsubscribe();
    };
  }, []);

  async function signUp() {
    if (!checkIfPasswordIsValid()) {
      Alert.alert("Erro", "As senhas precisam ser iguais.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName: userName,
          userType: "standard",
        },
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Erro no Cadastro", error.message);
    } else {
      Alert.alert(
        "Cadastro Realizado!",
        "Verifique sua caixa de entrada para confirmar seu e-mail."
      );
      router.push("/login");
    }
  }

  function checkIfPasswordIsValid() {
    return password === passwordConfirmation;
  }

  function routerBack() {
    router.back();
  }

  return {
    userName,
    email,
    password,
    passwordConfirmation,
    loading,
    setUserName,
    setEmail,
    setPassword,
    setPasswordConfirmation,
    signUp,
    routerBack,
    checkIfPasswordIsValid,
    session,
  };
}