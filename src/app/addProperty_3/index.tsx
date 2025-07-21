import { View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";

export default function AddProperty_3() {
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
            <SquareButton name="Voltar" variant="mediumS"></SquareButton>
            <SquareButton name="Continuar" variant="mediumP"></SquareButton>
          </View>
        </View>
      </View>
      <Menu></Menu>
    </>
  );
}
