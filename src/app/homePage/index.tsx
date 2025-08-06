import { Image, View, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import { useRouter } from "expo-router";
import { categories } from "@/utils/categories";
import { supabase } from "@/lib/supabase";
import { Imovel } from "@/utils/Imovel";
import { colors } from "@/styles/colors";

export default function HomePage() {
  const router = useRouter();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0"); 

  const [allImoveis, setAllImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);

  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');

  //const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  useEffect(() => {

    const fetchImoveis = async () => {

      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
            
      if (user) {
        setUserType(user.user_metadata.userType || null);
        setUserId(user.id);

        // const { data: favoritesData, error: favoritesError } = await supabase
        //   .from('favoritos')
        //   .select('imovel_id')
        //   .eq('user_id', user.id);
        
        // if (favoritesData) {
        //   const ids = new Set(favoritesData.map(fav => fav.imovel_id));
        //   setFavoriteIds(ids);
        // }

      }
      
      const { data, error } = await supabase
        .from('Imoveis')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (error) {
        console.error("Erro ao buscar imóveis:", error);
        Alert.alert("Erro", "Não foi possível carregar os imóveis.");
      } else if (data) {
        setAllImoveis(data);
        setFilteredImoveis(data);
      }
      
      setLoading(false);
    };

    fetchImoveis();
  }, []);

  useEffect(() => {
    
    const filtered = allImoveis.filter(imovel => {

      if (imovel.oculto) {
        return false; 
      }

      if (selectedCategoryId === "0") {
        return true;
      }

      const categoryName = categories.find(cat => cat.id === selectedCategoryId)?.name;
      return imovel.tipoMoradiaEspecifico === categoryName;

    });

    setFilteredImoveis(filtered);

  }, [selectedCategoryId, allImoveis]);
  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.orange[300]} />
      </View>
    );
  }

  // const handleToggleFavorite = async (imovelId: string) => {
  //   const isFavorited = favoriteIds.has(imovelId);
    
  //   const newFavoriteIds = new Set(favoriteIds);
  //   if (isFavorited) {
  //     newFavoriteIds.delete(imovelId);
  //   } else {
  //     newFavoriteIds.add(imovelId);
  //   }
  //   setFavoriteIds(newFavoriteIds);

  //   if (isFavorited) {
  //     await supabase.from('favoritos').delete().match({ user_id: userId, imovel_id: imovelId });
  //   } else {
  //     await supabase.from('favoritos').insert({ user_id: userId, imovel_id: imovelId });
  //   }
  // };

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

        <Categories 
          selectedCategoryId={selectedCategoryId} 
          onCategorySelect={setSelectedCategoryId} 
        />

        <View style={styles.titleContainer}>
          <AppText style={styles.title}>SUGESTÕES</AppText>
        </View>

        <View style={styles.postContainer}>
          {filteredImoveis.map((post) => {
            let statusType: "visibility" | "favorite" | undefined = undefined;
            if (userType === "standard") {
              statusType = "favorite";
            } else if (userType === "owner" && userId === post.proprietario) {
              statusType = undefined;
          }
            return (
              <PostBlock
                key={post.id}
                image={
                  post.imagens && post.imagens.length > 0
                    ? { uri: post.imagens[0] }
                    : require("../../assets/Imagem.png")
                }
                title={post.tipoMoradiaEspecifico + " - " + post.bairro}
                price={post.preco}
                statusType={statusType}
                onPress={() => router.push(`/pvuLandLord/${post.id}`)}
                isActive={!post.oculto}
              />
            );
          })}
        </View>
      </ScrollView>
      <Menu />
    </>
  );
}
