import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import SelectableBlock from "@/components/selectableBlock";



export default function AddProperty_4() {

  return (
    <>
    <View style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>COMPLETA</AppText>
            <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <SelectableBlock type="completeHouseType"/>
                <AppText style={styles.subtitle}>QUANTIDADE</AppText>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Quartos" containerStyle={{ width: "48%" }} ></Input>
                </View>
                <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                <SelectableBlock type="furniture"/>
            </View>
            <View  style={styles.buttonsContainer}>
                <SquareButton name="Voltar" variant="mediumS"></SquareButton>
                <SquareButton name="Continuar" variant="mediumP"></SquareButton>
            </View>
        </View>
    </View>
    <Menu></Menu>
    </>
  );
}
