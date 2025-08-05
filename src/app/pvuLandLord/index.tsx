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
import HouseInfoList from "@/components/houseInfoList/houseInfoList";



export default function PvuLandLord() {

    const loggedUserId = "user123";
    const postOwnerId = "user123";

    const userType = loggedUserId === postOwnerId ? "owner" : "standard";

    //se for landlord vendo o proprio post: olhinho, se for renter aparece coração
    const statusType = userType === "owner" ? "visibility" : "favorite";

    //se for um landlord vendo post de outra pessoa nao é p aparecer icoen
    const shouldShowStatusPost = !(userType === "owner" && statusType === "favorite");



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

const houseData = {
  banheiros: 2,
  salasEstar: 1,
  cozinhas: 1,
  pessoasPorMoradia: 5,
  pessoasPorQuarto: 2,
};

const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const endereco = {
  rua: "Rua das Flores",
  numero: "123",
  bairro: "Jardim Primavera",
  complemento: "Apto 301", 
};


  return (
    <>
    <ScrollView >
        <BackButton onPress={() => router.back()}/>
        <ImageCarousel images={images} style={styles.image}/>
        <View style={styles.container}>
            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>QUARTO CENTRO</AppText>
                {shouldShowStatusPost && <StatusPost type={statusType} />}
            </View>
            <AppText>{desc}</AppText>
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
                    <AppText>
                      {`${endereco.rua}, nº ${endereco.numero}, Bairro ${endereco.bairro}`}
                      {endereco.complemento ? `, ${endereco.complemento}` : ""}
                    </AppText>
                    <AppText style={styles.subtitle}>MAIS INFORMAÇÕES</AppText>
                    <HouseInfoList data={houseData}/>

                <AppText style={styles.subtitle}>LOCADOR</AppText>
                <LandlordName name={"Nome"} phone={"(83) 93784-3947"} mail="abc@gmail.com" />
                </View>
            </View>

        </View>
    </ScrollView>
            <PriceAndContactButton price={800} />
    </>
  );
}
