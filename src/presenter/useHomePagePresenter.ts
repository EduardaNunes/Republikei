import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      const { data: { user } } = await supabase.auth.getUser();
            
      if (user) {
        setUserType(user.user_metadata.userType || null);
        setUserId(user.id);
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
        setAllPosts(data);
      }
      
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = allPosts.filter(imovel => {
      if (imovel.oculto) {
        return false; 
      }
      if (selectedCategoryId === "0") {
        return true;
      }
      const categoryName = categories.find(cat => cat.id === selectedCategoryId)?.name;
      return imovel.tipoMoradiaEspecifico === categoryName;
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
    filteredPosts,
    selectedCategoryId,
    userType,
    userId,
    handlePostPress,
    handleSearchPress,
    setSelectedCategoryId,
  };
}