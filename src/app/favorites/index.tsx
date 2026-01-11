import { View, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { styles } from "../../components/styles/favorites";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import PostBlock from "@/components/postBlock";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";

interface FavoritesState {
  all: Imovel[];
}

export default function Favorites() {

  const [posts, setPosts] = useState<FavoritesState>({ all: [] });
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //


  const fetchImoveis = useCallback(async () => {

    setLoading(true);
    
    try {

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      else setUserId(user?.id || '')

      const userFavoritePosts = await getUserFavoritePosts(user?.id || '');
      const formattedData = formatUserFavoritePosts(userFavoritePosts);
      setPosts({ all: formattedData });

    } catch (error: any) {
      console.error("Erro ao buscar favoritos:", error);
      Alert.alert("Erro", "Não foi possível carregar seus favoritos.");

    } finally {
      setLoading(false);

    }

  }, []);

  useEffect(() => {
    fetchImoveis();
  }, [fetchImoveis]);

  // ================================================================================ //
  //                                 FETCH AUX FUNCTIONS 
  // ================================================================================ //

  const getUserFavoritePosts = async (userId: string) => {
    const { data, error } = await supabase
      .from('Favoritos')
      .select(`
        post_id,
        Imoveis (*)
      `)
      .eq('user_id', userId); 

    if (error) throw error;
    else return data || []
  }

  const formatUserFavoritePosts = (userFavoritePosts: any[]) => {
    const formattedFavorites = userFavoritePosts
      .map((post: any) => ({
        ...post.Imoveis,
        isFavorited: true
      }))
      .filter(post => post.id !== null)
    ;
    return formattedFavorites;
  }


  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //
  
  const onToggleFavorite = async (post: Imovel) => {
    await postStatusPresenter.handleStatusPress({
      isOwner: false,
      userId: userId,
      post: post,
      currentList: posts.all,
      setPosts: setPosts,
      refreshCallback: fetchImoveis
    });
    
    setPosts(prev => ({
      ...prev,
      all: prev.all.filter(p => p.id !== post.id || p.isFavorited)
    }));
  };
  
  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //
  
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
          {posts.all.length > 0 
            ? posts.all.map((favorite) => (
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
                isActive={!!favorite.isFavorited}
                onStatusPress={() => onToggleFavorite(favorite)}
              />
            ))
            : (<AppText>Nenhum favorito para exibir</AppText>)
          }
      </ScrollView>
      <NavigationBar />
    </>
  );
}
