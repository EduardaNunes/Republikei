import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/profileRenter";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";



export default function ProfileRenter() {

  return (
    <>
    <ScrollView style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>NOME PERFIL</AppText>
        </View>
        <View  style={styles.inputContainer}>
            <Input title="Email"></Input>
            <Input title="Senha"></Input>
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
