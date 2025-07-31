import { Image, View, ScrollView, Alert } from "react-native";


import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";

export default function SearchResult() {

  return (
    <>
    <View style={styles.superContainer}>
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center", gap: 20 }}>
            
            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>MEUS IMÓVEIS</AppText>
            </View>
            <PostBlock  image={require("@/assets/Imagem.png")} title="Quarto" price={800}/>
            <PostBlock  image={require("@/assets/Imagem.png")} title="Quarto" price={800}/>
            <PostBlock  image={require("@/assets/Imagem.png")} title="Quarto" price={800}/>
        </ScrollView>
        <BackButton type="plus" variant="medium" onPress={() => router.push("/addProperty_1")} />
    </View>
    <Menu></Menu>
    </>
  );
}