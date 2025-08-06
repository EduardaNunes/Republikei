import { FlatList, View, ScrollView, Alert, ActivityIndicator } from "react-native"; 
import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Property {
  id: string,
  tipoMoradiaEspecifico: string,
  bairro: string,
  preco: number,
  imagens: string[],
  oculto: boolean
}

export default function SearchResult() {
  // Lista simulada dos imóveis do landlord logado
  // const myProperties = [
  //   {
  //     id: "1",
  //     title: "Quarto no Centro",
  //     price: 800,
  //     image: require("@/assets/Imagem.png"),
  //   },
  //   {
  //     id: "2",
  //     title: "Apartamento mobiliado",
  //     price: 1200,
  //     image: require("@/assets/Imagem.png"),
  //   },
  //   {
  //     id: "3",
  //     title: "Suíte com varanda",
  //     price: 950,
  //     image: require("@/assets/Imagem.png"),
  //   },
  // ];

  const [myProperties, setMyProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImoveis = async () => {

      setLoading(true);
      
      try {

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setMyProperties([]); 
          return;
        }

        const { data, error } = await supabase
          .from('Imoveis')
          .select('*')
          .eq('proprietario', user.id); 

        if (error) throw error;

        if (data) {
          setMyProperties(data);
        }

      } catch (error: any) {
        console.error("Erro ao buscar imóveis:", error);
        Alert.alert("Erro", "Não foi possível carregar seus imóveis.");
      } finally {
        setLoading(false);
      }
    };

  fetchImoveis();
},[]);

  if (loading) {
    return <ActivityIndicator />;
  }

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
              image={
                property.imagens && property.imagens.length > 0
                  ? { uri: property.imagens[0] }
                  : require("../../assets/Imagem.png") 
              }
              title={property.tipoMoradiaEspecifico + " - " + (property.bairro || 'Sem Bairro')}
              price={property.preco}
              statusType="visibility"
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
