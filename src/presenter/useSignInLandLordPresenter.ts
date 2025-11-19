import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export function useSignInLandLordPresenter() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setSession(session);
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  async function signUp() {
    if (!checkIfPasswordIsValid()) {
      Alert.alert("Erro", "As senhas precisam ser iguais.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      phone: phoneNumber,
      email: email,
      password: password,
      options: {
        data: {
          displayName: userName,
          userType: 'owner'
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
      router.push('/login');
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
    phoneNumber,
    password,
    passwordConfirmation,
    loading,
    session,
    setUserName,
    setEmail,
    setPhoneNumber,
    setPassword,
    setPasswordConfirmation,
    signUp,
    routerBack,
    checkIfPasswordIsValid,
  };
}