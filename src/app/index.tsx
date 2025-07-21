import { Image, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../components/styles/indexStyles";
import { colors } from "@/styles/colors";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";

import { useRouter } from "expo-router";

export default function Index() {

  const router = useRouter();

  return (
    <View style={styles.container}>
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
          <SquareButton name="Teste componentes" onPress={() => router.push("/searchPage")} />
        </View>
      </View>
    </View>
  );
}
