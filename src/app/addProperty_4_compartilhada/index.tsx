import { View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import SelectableBlock from "@/components/selectableBlock";
import { useRouter } from "expo-router";

export default function AddProperty_4_compartilhada() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>COMPARTILHADA</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
            <SelectableBlock type="sharedHouseType"></SelectableBlock>
            <AppText style={styles.subtitle}>QUANTIDADE DE PESSOAS</AppText>
            <View style={styles.subinputContainer}>
              <Input
                variant="secondary"
                title="No Quarto"
                containerStyle={{ width: "48%" }}
              ></Input>
              <Input
                variant="secondary"
                title="Na Moradia"
                containerStyle={{ width: "48%" }}
              ></Input>
            </View>
            <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
            <SelectableBlock type="furniture"></SelectableBlock>
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
              onPress={() => router.push("/addProperty_5")}
            ></SquareButton>
          </View>
        </View>
      </View>
      <Menu></Menu>
    </>
  );
}
