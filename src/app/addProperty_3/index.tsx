import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import SelectableBlock from "@/components/selectableBlock";
import { router } from "expo-router";



export default function AddProperty_3() {

  return (
    <>
    <View style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>CARACTERÍSTICAS</AppText>
            <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <SelectableBlock type="characteristics"/>
                <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
                <SelectableBlock type="vacancyType"/>
                <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                <SelectableBlock type="housingType"/>
                <AppText style={styles.subtitle}>MOBILIADO?</AppText>
                <SelectableBlock type="question"/>
            </View>
            <View  style={styles.buttonsContainer}>
                <SquareButton name="Voltar" variant="mediumS" onPress={()=> router.back()}></SquareButton>
                <SquareButton name="Continuar" variant="mediumP"></SquareButton>
            </View>
        </View>
    </View>
    <Menu></Menu>
    </>
  );
}
