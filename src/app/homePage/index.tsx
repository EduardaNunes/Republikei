import { Image, View, ScrollView, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => router.push("/searchPage")}
          style={styles.fakeInput}
          activeOpacity={0.8}
        >
          <AppText style={styles.fakeInputText}>Pesquisar</AppText>
        </TouchableOpacity>

        <Categories />

        <View style={styles.titleContainer}>
          <AppText style={styles.title}>SUGESTÕES</AppText>
        </View>

        <View style={styles.postContainer}>
          <PostBlock
            statusType="favorite"
            image={require("@/assets/Imagem.png")}
            title="Quarto"
            price={800}
          />

          <PostBlock
            statusType="favorite"
            image={require("@/assets/Imagem.png")}
            title="Quarto"
            price={800}
          />
          <PostBlock
            statusType="favorite"
            image={require("@/assets/Imagem.png")}
            title="Quarto"
            price={800}
          />
        </View>

      </ScrollView>
      <Menu />
    </>
  );
}
