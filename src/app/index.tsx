import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { styles } from "../components/styles/indexStyles";
import { colors } from "@/styles/colors";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";

import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  useEffect(() => {
    // Esconde a barra de navegação assim que o componente for carregado
    NavigationBar.setVisibilityAsync('hidden');

    // Define o que acontece quando o usuário desliza o dedo da borda da tela
    // 'inset-swipe' faz a barra aparecer temporariamente por cima do seu app
    NavigationBar.setBehaviorAsync('inset-swipe');

    // Quando o usuário sair desta tela, a barra de navegação volta a aparecer.
    // Isso é uma boa prática para não afetar o resto do app ou outros apps.
    return () => {
      NavigationBar.setVisibilityAsync('visible');
    };
  }, []);

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
          <SquareButton name="Teste componentes" onPress={() => router.push("/addProperty_3")} />
        </View>
      </View>
    </View>
  );
}
