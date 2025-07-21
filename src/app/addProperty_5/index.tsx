import { View } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import { useRouter } from "expo-router";

export default function AddProperty_5() {
  const router = useRouter();

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>DETALHES</AppText>
          <AppText style={styles.subtitle}>DESCRIÇÃO</AppText>
        </View>
        <View style={styles.geralContainer}>
          <View style={styles.inputContainer}>
            <Input
              title="Adicionar Descrição"
              containerStyle={{ width: "100%" }}
            ></Input>
            <Input
              variant="secondary"
              title="Mensalidade/Aluguel"
              containerStyle={{ width: "100%" }}
            ></Input>

            <AppText style={styles.subtitle}>FOTOS (MAX 15)</AppText>
            <View style={styles.subCategoryContainer}>
              <Category name="Upload Fotos"></Category>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <SquareButton
              name="Voltar"
              variant="mediumS"
              onPress={() => router.back()}
            ></SquareButton>
            <SquareButton name="Continuar" variant="mediumP"></SquareButton>
          </View>
        </View>
      </View>
      <Menu></Menu>
    </>
  );
}
