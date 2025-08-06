import { FlatList, View, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from "react-native"; 
import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";

import { Imovel } from "@/utils/Imovel";

export default function SearchResult() {

  const [myProperties, setMyProperties] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleToggleVisibility = async (propertyId: string, currentState: boolean) => {
    const newState = !currentState;
    
    // Atualização otimista na UI
    const updatedProperties = myProperties.map(p =>
      p.id === propertyId ? { ...p, oculto: newState } : p
    );
    setMyProperties(updatedProperties);

    // Atualiza o Supabase
    const { error } = await supabase
      .from('Imoveis')
      .update({ oculto: newState })
      .eq('id', propertyId);
    
    // Se der erro...
    if (error) {
      Alert.alert("Erro", "Não foi possível atualizar o status do imóvel. Sincronizando com o servidor...");
      // ...simplesmente busque os dados novamente para reverter a UI para o estado real.
      fetchImoveis();
    }
  };

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
              // 👇 PASSE AS PROPS CORRETAS AQUI 👇
              isActive={!property.oculto} // Se 'oculto' é false, o ícone está 'ativo' (visível)
              onStatusPress={() => handleToggleVisibility(property.id, property.oculto)}
            />
          ))}
        </ScrollView>
        <BackButton
          type="plus"
          variant="medium"
          onPress={() => router.push("/addProperty_1")}
        />
      </View>
      <Menu />
    </>
  );
}
