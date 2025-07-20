import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";



export default function AddProperty_1() {

  return (
    <>
    <ScrollView style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>ADICIONAR IMÓVEL</AppText>
            <AppText style={styles.subtitle}>LOCALIZAÇÃO</AppText>
        </View>
        <View  style={styles.inputContainer}>
            <Input title="CEP"></Input>
            <Input title="Rua"></Input>
            <Input title="Bairro"></Input>
            <View style={styles.subinputContainer}>
                <Input title="Número"></Input>
                <Input title="Complemento"></Input>
            </View>
        </View>
        <View  style={styles.buttonsContainer}>
            <SquareButton name="Logout" variant="shortS"></SquareButton>
            <SquareButton name="Editar" variant="shortP"></SquareButton>
        </View>
    </ScrollView>
    <Menu></Menu>
    </>
  );
}
