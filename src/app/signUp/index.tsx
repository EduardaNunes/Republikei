import {
  Image,
  View,
  ScrollView,
  Alert,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import React, { useState, useEffect } from "react";

import { styles } from "../../components/styles/signInLandLordStyles";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import SelectInput from "@/components/selectInput";
import BackButton from "@/components/backButton";
import AppText from "@/components/appText";

import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";
import { useRouter } from "expo-router";

import { AppUser, AppUserRole } from "@/utils/users";

const userTypeOptions = [
  { label: "Proprietário", value: "landLord" },
  { label: "Estudante", value: "student" },
];

interface SignUpState {
  user: AppUser;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const [signUpData, setSignUpData] = useState<SignUpState>({
    user:{
      type: 'student',
      name: '',
      profilePicture: '',
      email: '',
      phone: '',
      description: ''
    },
    password: '',
    passwordConfirmation: ''
  })

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleBaseChange = (field: keyof Omit<SignUpState, 'user'>, value: string) => {
    setSignUpData(prev => ({ ...prev, [field]: value }));
  };

  const handleUserChange = (field: keyof AppUser, value: string) => {
    setSignUpData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        [field]: value
      }
    }));
  };

  async function signUp() {

    if (!signUpData.user.name || !signUpData.user.email || !signUpData.user.phone) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!checkIfPasswordIsValid()) {
      Alert.alert("Erro", "As senhas precisam ser iguais.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      phone: signUpData.user.phone,
      email: signUpData.user.email,
      password: signUpData.password,
      options: {
        data: {
          displayName: signUpData.user.name, 
          userType: signUpData.user.type
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
    if (signUpData.password === signUpData.passwordConfirmation) return true;
    else return false;
  }

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

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
          <BackButton onPress={() => router.back()} />
          <SafeAreaView style={styles.imgContainer}>
            <Image source={require("@/assets/cadLocat-icon.png")} />{""}
            <AppText style={styles.title}> CADASTRO </AppText>
          </SafeAreaView>

          <View style={styles.containerTextAndButton}>''
            <View style={styles.inputContainer}>
              <Input
                title="Usuário"
                onChangeText={(text: string) => handleUserChange('name', text)}
                value={signUpData.user.name}
                placeholder="Usuário"
                autoCapitalize="none"
              />

              <SelectInput
                title="Tipo de Usuário"
                placeholder="Selecione o tipo..."
                options={userTypeOptions}
                value={signUpData.user.type}
                onSelect={(text: string) => handleUserChange('type', text as AppUserRole)}
              />

              <Input
                title="Email"
                onChangeText={(text: string) => handleUserChange('email', text)}
                value={signUpData.user.email}
                placeholder="email@address.com"
                autoCapitalize="none"
              />

              <Input
                title="Telefone"
                onChangeText={(text: string) => handleUserChange('phone', text)}
                value={signUpData.user.phone}
                placeholder="(00) 0 0000-0000"
                autoCapitalize="none"
                keyboardType="phone-pad"
              />

              <Input
                title="Senha"
                secureTextEntry={true}
                onChangeText={(text: string) => handleBaseChange('password', text)}
                value={signUpData.password}
                placeholder="Senha"
                autoCapitalize="none"
              />

              <Input
                title="Confirmar Senha"
                secureTextEntry={true}
                onChangeText={(text: string) => handleBaseChange('passwordConfirmation', text)}
                value={signUpData.passwordConfirmation}
                placeholder="Confirmar Senha"
                autoCapitalize="none"
              />
              {signUpData.passwordConfirmation !== "" && !checkIfPasswordIsValid() && (
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
