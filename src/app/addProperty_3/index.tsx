import { View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";

export default function AddProperty_3() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>CARACTERÍSTICAS</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
            <SelectableBlock type="characteristics"></SelectableBlock>
            <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
            <SelectableBlock type="vacancyType"></SelectableBlock>
            <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
            <SelectableBlock type="housingType"></SelectableBlock>
            <AppText style={styles.subtitle}>MOBILIADO?</AppText>
            <SelectableBlock type="question"></SelectableBlock>
          </View>
          <View style={styles.buttonsContainer}>
            <SquareButton
              name="Voltar"
              variant="mediumS"
              onPress={() => router.back()}
            ></SquareButton>
            <SquareButton
              name="Continuar"
              variant="mediumP"
              onPress={() => router.push("/addProperty_4_completa")} // precisamos depois fazer a lógica pra cada um ir pra uma
            ></SquareButton>
          </View>
        </View>
      </View>
      <Menu></Menu>
    </>
  );
}
