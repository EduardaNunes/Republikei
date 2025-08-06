import { View, ScrollView } from "react-native"; 
import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";

export default function SearchResult() {
  // Lista simulada dos imóveis do landlord logado
  const myProperties = [
    {
      id: "1",
      title: "Quarto no Centro",
      price: 800,
      image: require("@/assets/Imagem.png"),
    },
    {
      id: "2",
      title: "Apartamento mobiliado",
      price: 1200,
      image: require("@/assets/Imagem.png"),
    },
    {
      id: "3",
      title: "Suíte com varanda",
      price: 950,
      image: require("@/assets/Imagem.png"),
    },
  ];

  return (
    <>
      <View style={styles.superContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center", gap: 20 }}
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>MEUS IMÓVEIS</AppText>
          </View>

          {myProperties.map((property) => (
            <PostBlock
              key={property.id}
              image={property.image}
              title={property.title}
              price={property.price}
              statusType="visibility" // sempre visível para o landlord
            />
          ))}
        </ScrollView>

        <BackButton
          type="plus"
          variant="medium"
          onPress={() => router.push("/addProperty_1")}
        />
      </View>
      <Menu />
    </>
  );
}
