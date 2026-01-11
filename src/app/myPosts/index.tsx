import { FlatList, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from "react-native"; 
import { styles } from "../../components/styles/myPosts";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

import { postStatusPresenter } from "@/presenter/postStatusPresenter";
import { Imovel } from "@/utils/Imovel";

interface PostsState {
  all: Imovel[];
  filtered: Imovel[];
  selectedCategory: string;
}

export default function SearchResult() {

  const [posts, setPosts] = useState<PostsState>({
    all: [],
    filtered: [],
    selectedCategory: '0'
  });

  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  const fetchImoveis = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || '');

      const myPostsData = await getMyPosts(user?.id || '');
      setPosts(prev => ({ ...prev, all: myPostsData }));

    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar seus imóveis.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImoveis();
  }, [fetchImoveis]);

  // ================================================================================ //
  //                               FETCH AUX FUNCTIONS 
  // ================================================================================ //

  const getMyPosts = async (ownerId: string) => {
    const { data, error } = await supabase
      .from('Imoveis')
      .select('*')
      .eq('proprietario', ownerId);

    if (error) throw error;
    return data || [];
  };

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const onToggleVisibility = async (post: Imovel) => {
    
    await postStatusPresenter.handleStatusPress({
      isOwner: true,
      userId: userId,
      post: post,
      currentList: posts.all,
      setPosts: setPosts, 
      refreshCallback: fetchImoveis
    });
  };

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={styles.superContainer}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ alignItems: "center", gap: 20, paddingBottom: 100 }}
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>MEUS IMÓVEIS</AppText>
          </View>

          {posts.all.length > 0 ? (
            posts.all.map((property) => (
              <PostBlock
                key={property.id}
                onPress={() => router.push(`/pvuLandLord/${property.id}`)}
                image={
                  property.imagens && property.imagens.length > 0
                    ? { uri: property.imagens[0] }
                    : require("../../assets/Imagem.png")
                }
                title={property.tipoMoradiaEspecifico + " - " + (property.bairro || 'Sem Bairro')}
                price={property.preco}
                statusType="visibility"
                isActive={!property.oculto}
                onStatusPress={() => onToggleVisibility(property)}
              />
            ))
          ) : (
            <View style={{ marginTop: 40 }}>
              <AppText>Você ainda não possui imóveis cadastrados.</AppText>
            </View>
          )}
        </ScrollView>
        
        <BackButton
          type="plus"
          variant="medium"
          onPress={() => router.push("/addProperty_1")}
        />
      </View>
      <NavigationBar />
    </>
  );
}
