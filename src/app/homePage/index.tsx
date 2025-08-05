import { Image, View, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();

  // Simulação de usuário logado
  const loggedUserId = "user123";
  const loggedUserType = "landlord"; // pode ser "renter" ou "landlord"

  // Simulação de posts
  const posts = [
    {
      id: 1,
      ownerId: "user123", // mesmo dono
      title: "Quarto Centro",
      price: 800,
      image: require("@/assets/Imagem.png"),
    },
    {
      id: 2,
      ownerId: "user333", // outro usuário
      title: "Apartamento Sul",
      price: 950,
      image: require("@/assets/Imagem.png"),
    },
    {
      id: 3,
      ownerId: "user789", // outro usuário
      title: "Studio UFJF",
      price: 700,
      image: require("@/assets/Imagem.png"),
    },
  ];

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
          {posts.map((post) => {
            let statusType: "visibility" | "favorite" | undefined = undefined;

            if (loggedUserType === "renter") {
              statusType = "favorite";
            } else if (loggedUserType === "landlord") {
              if (loggedUserId === post.ownerId) {
                statusType = "visibility";
              } else {
                statusType = undefined;
              }
            }

            return (
              <PostBlock
                key={post.id}
                image={post.image}
                title={post.title}
                price={post.price}
                statusType={statusType}
              />
            );
          })}
        </View>
      </ScrollView>
      <Menu />
    </>
  );
}
