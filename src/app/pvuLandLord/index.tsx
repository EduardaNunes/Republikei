import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/pvuLandLord";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { Category } from "@/components/category";
import SelectableBlock from "@/components/selectableBlock";
import { router } from "expo-router";
import StatusPost from "@/components/statusPost";
import LandlordName from "@/components/landlordName";
import PriceAndContactButton from "@/components/priceAndContactButton";
import BackButton from "@/components/backButton";



export default function PvuLandLord() {

const characteristics = [
  { id: "characteristics-1", name: "Aceita Animais" },
  { id: "characteristics-3", name: "Com Piscina" },
  { id: "characteristics-4", name: "Com Quintal" },
  { id: "characteristics-8", name: "Água Inclusa" },
  { id: "characteristics-9", name: "Gás Incluso" },
  { id: "characteristics-10", name: "Intenet Inclusa" },
];

  return (
    <>
    <ScrollView >
        <BackButton onPress={() => router.back()}/>
        <Image source={require("@/assets/Imagem.png")} style={styles.image} ></Image>
        <View style={styles.container}>
            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>QUARTO CENTRO</AppText>
                <StatusPost type={"visibility"} />
            </View>
            <AppText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</AppText>
            <View style={styles.geralContainer}>
                <View  style={styles.inputContainer}>
                    <AppText style={styles.subtitle}>TIPO DE MORADOR</AppText>
                    <SelectableBlock type="vacancyType"/>
                    <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                    <SelectableBlock type="housingType"/>
                    <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
                    <SelectableBlock readOnly objects={characteristics}/>
                    <AppText style={styles.subtitle}>MOBÍLIA</AppText>
                    <SelectableBlock type="furniture"/>
                </View>
                <AppText style={styles.subtitle}>LOCADOR</AppText>
                <LandlordName name={"Nome"} phone={"(83) 93784-3947"} />
            </View>

        </View>
    </ScrollView>
            <PriceAndContactButton price={800} />
    </>
  );
}
