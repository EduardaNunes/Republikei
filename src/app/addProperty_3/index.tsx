import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";



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
                <View style={styles.subCategoryContainer}>
                    <Category name="Permite animais"></Category>
                    <Category name="Permite fumantes"></Category>
                    <Category name="Com Quintal"></Category>
                    <Category name="Com Piscina"></Category>
                    <Category name="Luz Inclusa"></Category>
                    <Category name="Água Inclusa"></Category>
                    <Category name="Condomínio Incluso"></Category>
                    <Category name="Internet Inclusa"></Category>
                </View>
                <AppText style={styles.subtitle}>TIPO DE VAGA</AppText>
                <View style={styles.subCategoryContainer}>
                    <Category name="Feminina"></Category>
                    <Category name="Masculina"></Category>
                    <Category name="Mista"></Category>    
                </View>
                <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                <View style={styles.subCategoryContainer}>
                    <Category name="Compartilhada"></Category>
                    <Category name="Completa"></Category>
                </View>
                <AppText style={styles.subtitle}>MOBILIADO?</AppText>
                <View style={styles.subCategoryContainer}>
                    <Category name="Sim"></Category>
                    <Category name="Não"></Category>
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
