import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";



export default function AddProperty_2() {

  return (
    <>
    <View style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>INFORMAÇÕES</AppText>
            <AppText style={styles.subtitle}>NÚMERO DE ...</AppText>
        </View>
        <View style={styles.geralContainer}>
            <View  style={styles.inputContainer}>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Pessoas/Imóvel" containerStyle={{ width: "48%" }}></Input>
                    <Input variant="secondary" title="Banheiros" containerStyle={{ width: "48%" }}></Input>
                </View>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Salas de Estar" containerStyle={{ width: "48%" }}></Input>
                    <Input variant="secondary" title="Áreas de Serviço" containerStyle={{ width: "48%" }}></Input>
                </View>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Vagas Garagem" containerStyle={{ width: "48%" }}></Input>
                    <Input variant="secondary" title="Cozinhas" containerStyle={{ width: "48%" }}></Input>
                </View>
                <View style={styles.subinputContainer}>
                    <Input variant="secondary" title="Salas Jantar" containerStyle={{ width: "48%" }}></Input>
                    <Input variant="secondary" title="Varandas" containerStyle={{ width: "48%" }}></Input>
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
