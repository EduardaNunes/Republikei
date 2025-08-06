import { View, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../components/styles/favorites";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export default function Favorites() {

  const [myFavorites, setMyFavorites] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchImoveis = async () => {

        setLoading(true);
        
        try {

          const { data: { user } } = await supabase.auth.getUser();

          if (!user) {
            setMyFavorites([]); 
            return;
          }

          const { data, error } = await supabase
            .from('Imoveis')
            .select('*')
            .eq('proprietario', user.id); 

          if (error) throw error;

          if (data) {
            setMyFavorites(data);
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
      <ScrollView style={styles.container}
        contentContainerStyle={{ alignItems: "center", gap: 20 }}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title}>FAVORITOS</AppText>
        </View>
          {myFavorites.map((favorite) => (
            <PostBlock
              key={favorite.id}
              onPress={() => router.push(`/pvuLandLord/${favorite.id}`)}
              image={
                favorite.imagens && favorite.imagens.length > 0
                  ? { uri: favorite.imagens[0] }
                  : require("../../assets/Imagem.png") 
              }
              title={favorite.tipoMoradiaEspecifico + " - " + (favorite.bairro || 'Sem Bairro')}
              price={favorite.preco}
              statusType="favorite" 
            />
          ))}
      </ScrollView>
      <Menu />
    </>
  );
}
