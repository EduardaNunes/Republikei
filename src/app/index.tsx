import { View, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
//import { Image } from "expo-image";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import * as NavigationBar from "expo-navigation-bar";

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
        <Image source={require("@/assets/icon_paper_plane.png")} style={styles.planeIcon} />

        <View style={styles.logoContainer}>
            <Image source={require("@/assets/logo_icon.png")} style={styles.logo} />

            <View style={styles.titleContainer}>
            <Image
                source={require("@/assets/logo_name.png")}
                style={styles.logo_name}
            />

            <AppText style={styles.text}>Seu app de moradia estudantil</AppText>
            </View>
        </View>

        <View style={styles.buttonsContainer}>
            <Image
                source={require("@/assets/paper_texture.png")}
                style={styles.paperTexture}
            />
            <SquareButton name="Cadastro" variant="darkGray" onPress={() => router.push("/signUp")}/>
            <SquareButton name="Login" variant="darkGray" onPress={() => router.push("/login")} />
            <SquareButton name="Não funciona ainda" variant="white" onPress={() => router.push("")} />
        </View>
    </View>
  );
}
