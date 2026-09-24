import { View, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../components/styles/favorites";
import AppText from "@/components/appText";
import Logo from "@/components/logo";
import NavigationBar from "@/components/navigationBar";
import PostBlock from "@/components/postBlock";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";
import { avaliacaoPresenter } from "@/presenter/avaliacaoPresenter";
import { colors } from "@/styles/colors";

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

      const ids = formattedData.map((post) => post.id);
      const mediasMap = await avaliacaoPresenter.getMediaAvaliacoesPorImoveis(ids);

      const dataWithRatings = formattedData.map((post) => ({
        ...post,
        avaliacaoMedia: mediasMap.get(post.id)?.media || 0,
        totalAvaliacoes: mediasMap.get(post.id)?.total || 0,
      }));

      setPosts({ all: dataWithRatings });

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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const total = posts.all.length;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Logo />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/chatHub")}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            {/* TODO: apontar para a tela de notificações quando existir */}
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="notifications-none" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeaderRow}>
          <AppText style={styles.sectionTitle}>Favoritos</AppText>
          {total > 0 && (
            <AppText style={styles.sectionCount}>
              {total} {total === 1 ? "imóvel" : "imóveis"}
            </AppText>
          )}
        </View>

        {total > 0 
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
              avaliacaoMedia={favorite.avaliacaoMedia}
              totalAvaliacoes={favorite.totalAvaliacoes}
            />
          ))
          : (
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconBox}>
                <MaterialIcons name="favorite-border" size={28} color={colors.primary} />
              </View>
              <AppText style={styles.emptyTitle}>Nenhum favorito ainda</AppText>
              <AppText style={styles.emptyText}>
                Toque no coração de um anúncio para salvá-lo aqui.
              </AppText>
            </View>
          )
        }
      </ScrollView>

      <NavigationBar />
    </View>
  );
}
