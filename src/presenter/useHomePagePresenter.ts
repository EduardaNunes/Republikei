import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Imovel } from "@/utils/Imovel";
import { categories } from "@/utils/categories";

export function useHomePagePresenter() {
  const router = useRouter();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");
  const [allPosts, setAllPosts] = useState<Imovel[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
            
      if (user) {
        setUserType(user.user_metadata.userType || null);
        setUserId(user.id);
      }

      const { data: posts, error: postsError } = await supabase
        .from('Imoveis')
        .select('*')
        .eq('oculto', false)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (postsError) throw postsError;

      let favoritesId: string[] = [];
      if (user?.id) {
        const { data: favPosts } = await supabase
          .from('Favoritos')
          .select('post_id')
          .eq('user_id', user?.id);
        
        if (favPosts) favoritesId = favPosts.map(favPost => favPost.post_id);
      }

      if (posts) {
        const postsWithFavs = posts.map(post => ({
          ...post,
          isFavorited: favoritesId.includes(post.id)
        }));
        setAllPosts(postsWithFavs);
      }
      
    } catch (error: any) {
      console.error("Erro na HomePage:", error.message);
      Alert.alert("Erro", "Não foi possível carregar os imóveis.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    const filtered = allPosts.filter(post => {

      if (selectedCategoryId === "0") return true;
      const categoryName = categories.find(cat => cat.id === selectedCategoryId)?.name;
      return post.tipoMoradiaEspecifico === categoryName;

    });
    setFilteredPosts(filtered);
  }, [selectedCategoryId, allPosts]);


  const handlePostPress = (postId: string) => {
    router.push(`/pvuLandLord/${postId}`);
  };

  const handleSearchPress = () => {
    router.push("/searchPage");
  };

  return {
    loading,
    allPosts,
    setAllPosts,
    filteredPosts,
    setFilteredPosts,
    selectedCategoryId,
    userType,
    userId,
    handlePostPress,
    handleSearchPress,
    setSelectedCategoryId,
    fetchPosts
  };
}