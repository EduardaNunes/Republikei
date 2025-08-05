import { View, ScrollView } from "react-native";
import React from "react";
import { styles } from "../../components/styles/favorites";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";

export default function Favorites() {

  const favoritePosts = [
    {
      id: "1",
      image: require("@/assets/Imagem.png"),
      title: "Quarto - Centro",
      price: 800,
    },
    {
      id: "2",
      image: require("@/assets/Imagem.png"),
      title: "Quarto - Bairro Primavera",
      price: 750,
    },
    {
      id: "3",
      image: require("@/assets/Imagem.png"),
      title: "Studio - UFJF",
      price: 900,
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}
        contentContainerStyle={{ alignItems: "center", gap: 20 }}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>FAVORITOS</AppText>
        </View>

       
          {favoritePosts.map((post) => (
            <PostBlock
              key={post.id}
              statusType="favorite"    // Passa o ícone coração
              image={post.image}
              title={post.title}
              price={post.price}
            />
          ))}
   
      </ScrollView>
      <Menu />
    </>
  );
}
