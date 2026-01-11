import { FlatList, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from "react-native"; 
import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

import { postStatusPresenter } from "@/presenter/postStatusPresenter";
import { Imovel } from "@/utils/Imovel";

export default function SearchResult() {

  const [myProperties, setMyProperties] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  const fetchImoveis = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setMyProperties([]);
        return;
      }
      const { data, error } = await supabase
        .from('Imoveis')
        .select('*')
        .eq('proprietario', user.id);

      if (error) throw error;
      if (data) setMyProperties(data);

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
  //                                     HANDLERS 
  // ================================================================================ //

  const onToggleVisibility = async (propertyId: string, currentState: boolean) => {
    
    const { updatedList, error } = await postStatusPresenter.handleToggleStatus(
      myProperties, 
      propertyId, 
      currentState
    );

    setMyProperties(updatedList);

    if (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do imóvel. Sincronizando com o servidor...");
      fetchImoveis();
    }

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
          contentContainerStyle={{ alignItems: "center", gap: 20 }}
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>MEUS IMÓVEIS</AppText>
          </View>
          {myProperties.map((property) => (
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
              onStatusPress={() => onToggleVisibility(property.id, property.oculto)}
            />
          ))}
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
