import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/pvuLandLord";
import AppText from "@/components/appText";
import SelectableBlock from "@/components/selectableBlock";
import { router } from "expo-router";
import StatusPost from "@/components/statusPost";
import LandlordName from "@/components/landlordName";
import PriceAndContactButton from "@/components/priceAndContactButton";
import BackButton from "@/components/backButton";
import { ImageCarousel } from "@/components/imagesCarrossel";



export default function PvuLandLord() {

const characteristics = [
  { id: "characteristics-1", name: "Aceita Animais" },
  { id: "characteristics-3", name: "Com Piscina" },
  { id: "characteristics-4", name: "Com Quintal" },
  { id: "characteristics-8", name: "Água Inclusa" },
  { id: "characteristics-9", name: "Gás Incluso" },
  { id: "characteristics-10", name: "Intenet Inclusa" },
];

const furniture = [
  { id: "furniture-geladeira", name: "Geladeira" },
  { id: "furniture-armario", name: "Armário" },
  { id: "furniture-microondas", name: "Microondas" },
  { id: "furniture-lavar_louca", name: "Máquina de Lavar Louça" },
  { id: "furniture-varal", name: "Varal" },
  { id: "furniture-mesa_jantar", name: "Mesa de Jantar" },
  { id: "furniture-tv", name: "Televisão" },
];

const images = [
  require('@/assets/Imagem.png'),
  require('@/assets/Imagem.png'),
  require('@/assets/Imagem.png'),
  require('@/assets/Imagem.png'),
  require('@/assets/Imagem.png'),
  require('@/assets/Imagem.png'),
]

  return (
    <>
    <ScrollView >
        <BackButton onPress={() => router.back()}/>
        <ImageCarousel images={images} style={styles.image}/>
        <View style={styles.container}>
            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>QUARTO CENTRO</AppText>
                <StatusPost type={"visibility"} />
            </View>
            <AppText>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</AppText>
            <View style={styles.geralContainer}>
                <View  style={styles.inputContainer}>
                    <AppText style={styles.subtitle}>TIPO DE MORADOR</AppText>
                    <SelectableBlock objects={[{id: "1" , name: "Feminina"}]} readOnly/>
                    <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                    <SelectableBlock objects={[{id: "1" , name: "Compartilhada"}]} readOnly/>
                    <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
                    <SelectableBlock readOnly objects={characteristics}/>
                    <AppText style={styles.subtitle}>MOBÍLIA</AppText>
                    <SelectableBlock readOnly objects={furniture}/>
                    <AppText style={styles.subtitle}>ENDEREÇO</AppText>
                <AppText>Rua xxx, Bairro YYY </AppText>
                <AppText style={styles.subtitle}>MAIS INFORMAÇÕES</AppText>
                <AppText>Nº Banheiros: </AppText>
                <AppText>Nº Salas de Estar: </AppText>
                <AppText>Nº Áreas de Serviço: </AppText>
                <AppText>Nº Vagas de Garagem : </AppText>
                <AppText>Nº Cozinhas: </AppText>
                <AppText>Nº Saças de Jantar: </AppText>
                <AppText>Nº Varanda: </AppText>
                <AppText>Nº Banheiros: </AppText>
                {/* Se for moradia completa */}
                <AppText>Nº Quartos: </AppText>
                {/* Se for moradia Compartilhada */}
                <AppText>Nº Pessoas/Quarto: </AppText>
                <AppText>Nº Pessoas/Moradia: </AppText>

                <AppText style={styles.subtitle}>LOCADOR</AppText>
                <LandlordName name={"Nome"} phone={"(83) 93784-3947"} />
                </View>
            </View>

        </View>
    </ScrollView>
            <PriceAndContactButton price={800} />
    </>
  );
}
