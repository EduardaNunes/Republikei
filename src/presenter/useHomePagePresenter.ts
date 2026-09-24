import { useState, useEffect, useCallback, useContext } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Imovel } from "@/utils/Imovel";
import { categories } from "@/utils/categories";
import { avaliacaoPresenter } from "@/presenter/avaliacaoPresenter";
import { SearchContext } from "@/contexts/SearchContext";
import { applySearchFilters, countActiveFilters } from "@/utils/searchFilters";

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

  // Filtros avançados da home (escolhidos na página de filtros)
  const { filters, resetFilters } = useContext(SearchContext);
  const homeFilters = filters.home;

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

      const ids = updatedPosts.map((post) => post.id);
      const mediasMap = await avaliacaoPresenter.getMediaAvaliacoesPorImoveis(ids);

      const postsComMedia: Imovel[] = updatedPosts.map((post) => ({
        ...post,
        avaliacaoMedia: mediasMap.get(post.id)?.media || 0,
        totalAvaliacoes: mediasMap.get(post.id)?.total || 0,
      }));

      setPosts(prev => ({
        ...prev,
        all: postsComMedia,
        userFavorite: postsComMedia.filter(p => p.isFavorited)
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

  const getAllPosts = async (): Promise<Imovel[]> => {
    const { data: posts, error: postsError } = await supabase
      .from('Imoveis')
      .select('*')
      .eq('oculto', false)
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
    ;
    if (postsError) throw postsError;
    else return (posts || []) as Imovel[];
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

  const updatePosts = (all: Imovel[], userFavorites: any[]): Imovel[] => {
    const userFavoritesId: string[] = userFavorites.map(post => post.post_id);
    const allPostsWithFavState = all.map(post => ({ ...post, isFavorited: userFavoritesId.includes(post.id) }));
    return allPostsWithFavState;
  }

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {fetchPosts()}, [fetchPosts]);

  // Filtro rápido (categoria) + filtros avançados
  useEffect(() => {
    const byCategory = posts.all.filter(post => {

      if (posts.selectedCategory === "0") return true;

      const categoryName = categories.find(category => category.id === posts.selectedCategory)?.name;
      return post.tipoMoradiaEspecifico === categoryName;
    });

    const filtered = applySearchFilters(byCategory, homeFilters);
    
    setPosts(prev => ({ ...prev, filtered }));
  }, [posts.selectedCategory, posts.all, homeFilters]);

  // ================================================================================ //
  //                                    HANDLERS
  // ================================================================================ //

  const handlePostPress = (postId: string) => {
    router.push(`/pvuLandLord/${postId}`);
  };

  const handleChatPress = () => {
    router.push("/chatHub");
  };

  const handleFilterPress = () => {
    router.push({ pathname: "/searchPage", params: { scope: "home" } });
  };

  const handleClearFilters = () => {
    setSelectedCategoryId("0");
    resetFilters("home");
  };

  const activeFilterCount = countActiveFilters(homeFilters);
  const hasActiveFilters = posts.selectedCategory !== "0" || activeFilterCount > 0;

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
    activeFilterCount,
    hasActiveFilters,
    setSelectedCategoryId,
    handlePostPress,
    handleFilterPress,
    handleClearFilters,
    handleChatPress,
    fetchPosts
  };
}