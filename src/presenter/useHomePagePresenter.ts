import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Imovel } from "@/utils/Imovel";
import { categories } from "@/utils/categories";
import { User } from "@supabase/supabase-js";

interface postsState{
    all: Imovel[],
    filtered: Imovel[],
    userFavorite: Imovel[]
    selectedCategory: String
  }

export function useHomePagePresenter() {

  // ================================================================================ //
  //                                      STATES
  // ================================================================================ //

  const router = useRouter();

  const [posts, setPosts] = useState<postsState>({
    all: [],
    filtered: [],
    userFavorite: [],
    selectedCategory: '0'
  })

  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');

  // ================================================================================ //
  //                                   FETCH LOGIC
  // ================================================================================ //

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
            
      if (user) {
        setUserType(user.user_metadata.userType || null);
        setUserId(user.id);
      }

      const [allPosts, userFavoritePosts] = await Promise.all([
        getAllPosts(),
        getUserFavoritePosts(user?.id || '')
      ]);

      const updatedPosts = updatePosts(allPosts, userFavoritePosts)

      setPosts(prev => ({ 
        ...prev, 
        all: updatedPosts,
        userFavorite: updatedPosts.filter(p => p.isFavorited)
      }));
      
    } catch (error: any) {
      console.error("Erro na HomePage:", error.message);
      Alert.alert("Erro", "Não foi possível carregar os imóveis.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ================================================================================ //
  //                              FETCH AUX FUNCTIONS
  // ================================================================================ //

  const setSelectedCategoryId = (id: string) => {
    setPosts(prev => ({ ...prev, selectedCategory: id }));
  };

  const getAllPosts = async () => {
    const { data: posts, error: postsError } = await supabase
      .from('Imoveis')
      .select('*')
      .eq('oculto', false)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
    ;
    if (postsError) throw postsError;
    else return posts || [];
  }

  const getUserFavoritePosts = async (userId: string) => {
    const { data: posts, error: postsError } = await supabase
      .from('Favoritos')
      .select('post_id')
      .eq('user_id', userId)
    ;
    if (postsError) throw postsError;
    else return posts || [];
  }

  const updatePosts = (all: Imovel[], userFavorites: any[]) => {
    const userFavoritesId : string[] = userFavorites.map(post => post.post_id);
    const allPostsWithFavState = all.map(post => ({...post, isFavorited: userFavoritesId.includes(post.id)}));
    return allPostsWithFavState
  }

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {fetchPosts()}, [fetchPosts]);

  useEffect(() => {
    const filtered = posts.all.filter(post => {

      if (posts.selectedCategory === "0") return true;

      const categoryName = categories.find(category => category.id === posts.selectedCategory)?.name;
      return post.tipoMoradiaEspecifico === categoryName;
    });
    
    setPosts(prev => ({ ...prev, filtered }));
  }, [posts.selectedCategory, posts.all]);

  // ================================================================================ //
  //                                    HANDLERS
  // ================================================================================ //

  const handlePostPress = (postId: string) => {
    router.push(`/pvuLandLord/${postId}`);
  };

  const handleSearchPress = () => {
    router.push("/searchPage");
  };

  // ================================================================================ //
  //                                PRESENTER RETURN
  // ================================================================================ //

  return {
    loading,
    allPosts: posts.all,
    setPosts,
    filteredPosts: posts.filtered,
    selectedCategoryId: posts.selectedCategory,
    userType,
    userId,
    setSelectedCategoryId,
    handlePostPress,
    handleSearchPress,
    fetchPosts
  };
}