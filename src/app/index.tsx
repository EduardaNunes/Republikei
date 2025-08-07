import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { styles } from "../components/styles/indexStyles";
import { colors } from "@/styles/colors";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";

import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function Index() {

  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (session) {
      router.push("/homePage");
    }
  }, [session]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require("@/assets/background.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.containerTextAndButton}>
        <View>
          <View style={styles.titleContainer}>
            <MaterialIcons
              name="location-on"
              size={40}
              color={colors.orange[300]}
            />
            <AppText style={styles.title}>REPUBLIKEI</AppText>
          </View>
          <AppText style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </AppText>
        </View>
        <View style={styles.buttonContainer}>
          <SquareButton name="Cadastro Locador" variant="secondary" onPress={() => router.push("/signInLandLord")}/>
          <SquareButton name="Cadastro Locatário" variant="secondary" onPress={() => router.push("/signInRenter")}/>
          <SquareButton name="Login" onPress={() => router.push("/login")}/>
          {/*<SquareButton name="Teste componentes" onPress={() => router.push("/pvuLandLord")} />*/}
        </View>
      </View>
    </View>
  );
}
