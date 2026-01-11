import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/searchPage";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import { Category } from "@/components/category";
import SelectableBlock from "@/components/selectableBlock";
import { router } from "expo-router";



export default function SearchPage() {

  return (
    <>
    <ScrollView style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>PESQUISA</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <Input title="Localização"></Input>
                <AppText style={styles.subtitle}>TIPO DE MORADOR</AppText>
                <SelectableBlock type="vacancyType"/>
                <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                <SelectableBlock type="housingType"/>
                <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
                <SelectableBlock type="characteristics"/>
                <AppText style={styles.subtitle}>MOBILIADO?</AppText>
                <SelectableBlock type="question"/>
                <AppText style={styles.subtitle}>ORDENAR POR</AppText>
                <SelectableBlock type="ranking"/>
            </View>
            <View style={styles.buttonsContainer} >
                <SquareButton name="Pesquisar" onPress={() => Alert.alert('Em Desenvolvimento')}></SquareButton>
                <SquareButton name="Voltar" variant="secondary" onPress={()=> router.back()}></SquareButton>
            </View>
        </View>
    </ScrollView>
    </>
  );
}
