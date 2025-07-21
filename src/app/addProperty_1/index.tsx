import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { router } from "expo-router";



export default function AddProperty_1() {

  return (
    <>
    <View style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>ADICIONAR IMÓVEL</AppText>
            <AppText style={styles.subtitle}>LOCALIZAÇÃO</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <Input title="CEP"></Input>
                <Input title="Rua"></Input>
                <Input title="Bairro"></Input>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Número" containerStyle={{ width: "48%" }}></Input>
                    <Input variant="secondary" title="Complemento" containerStyle={{ width: "48%" }}></Input>
                </View>
            </View>
            <View  style={styles.buttonsContainer}>
                <SquareButton name="Cancelar" variant="mediumS"></SquareButton>
                <SquareButton name="Continuar" variant="mediumP" onPress={()=> router.push("/addProperty_2")}></SquareButton>
            </View>
        </View>
    </View>
    <Menu></Menu>
    </>
  );
}
