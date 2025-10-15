import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import { Imovel } from "@/utils/Imovel";
import { categories } from "@/utils/categories";

export function useHomePagePresenter() {
  const router = useRouter();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0");
  const [allImoveis, setAllImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');

  // Efeito para buscar os dados iniciais
  useEffect(() => {
    const fetchImoveis = async () => {
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
        setAllImoveis(data);
      }
      
      setLoading(false);
    };

    fetchImoveis();
  }, []);

  // Efeito para filtrar os imóveis quando a categoria ou a lista principal mudam
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


  const handlePostPress = (postId: string) => {
    router.push(`/pvuLandLord/${postId}`);
  };

  const handleSearchPress = () => {
    router.push("/searchPage");
  };

  return {
    loading,
    filteredImoveis,
    selectedCategoryId,
    userType,
    userId,
    handlePostPress,
    handleSearchPress,
    setSelectedCategoryId, // Passando o setter diretamente para o componente de categorias
  };
}