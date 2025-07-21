import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";



export default function AddProperty_5() {

  return (
    <>
    <View style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>COMPARTILHADA</AppText>
            <AppText style={styles.subtitle}>SELECIONAR MORADIA</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <View style={styles.subCategoryContainer}>
                    <Category name="República"></Category>
                    <Category name="Quarto"></Category>
                </View>
                <AppText style={styles.subtitle}>QUANTIDADE DE PESSOAS</AppText>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="No Quarto" containerStyle={{ width: "48%" }} ></Input>
                    <Input variant="secondary" title="Na Moradia" containerStyle={{ width: "48%" }} ></Input>
                </View>
                <AppText style={styles.subtitle}>SELECIONAR MÓVEIS</AppText>
                <View style={styles.subCategoryContainer}>
                    <Category name="Cama"></Category>
                    <Category name="Colchão"></Category>
                    <Category name="Mesa Jantar"></Category>
                    <Category name="Varal"></Category>
                    <Category name="Geladeira"></Category>
                    <Category name="Guarda Roupa"></Category>
                    <Category name="AirFryer"></Category>
                    <Category name="Armário"></Category>
                    <Category name="Escrivaninha"></Category>
                    <Category name="Microondas"></Category>
                    <Category name="Ar Condicionado"></Category>
                    <Category name="Fogão"></Category>
                    <Category name="Televisão"></Category>
                    <Category name="Máquina de Lavar Roupa Roupa"></Category>
                    <Category name="Máquina de Lavar Louça"></Category>
                </View>
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
