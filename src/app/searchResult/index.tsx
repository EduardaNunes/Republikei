import { Image, View, ScrollView, Alert, ActivityIndicator } from "react-native";

import React, { useState, useEffect, useContext, useCallback } from "react";
import { styles } from "../../components/styles/searchResult";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router, useRouter } from "expo-router";
import { SearchContext } from "@/contexts/SearchContext";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";

export default function SearchResult() {

  const router = useRouter();
  const { filters } = useContext(SearchContext);
  const [results, setResults] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFilteredResults = useCallback(async () => {
    setLoading(true);
    try {
      
      let query = supabase
        .from('Imoveis')
        .select('*')
        .eq('oculto', false)
      ;

      if (filters.vacancyType?.name) {
        query = query.eq('tipoVaga', filters.vacancyType.name);
      }

      if (filters.housingType?.name) {
        query = query.eq('tipoMoradia', filters.housingType.name);
      }

      if (filters.isFurnished !== null) {
        query = query.eq('mobiliado', filters.isFurnished);
      }

      if (filters.characteristics.length > 0) {
        const charNames = filters.characteristics.map(c => c.name);
        query = query.contains('caracteristicas', charNames);
      }

      if (filters.ranking?.id === 'ranking-preco-crescente') {
        query = query.order('preco', { ascending: true });
      } else if (filters.ranking?.id === 'ranking-preco-decrescente') {
        query = query.order('preco', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;
      setResults(data || []);
    } catch (error: any) {
      Alert.alert("Erro na busca", error.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFilteredResults();
  }, [fetchFilteredResults]);

  return (
    <>
    <BackButton onPress={() => router.back()} />
    <ScrollView style={styles.container}>
        
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>RESULTADO</AppText>
            <AppText style={styles.title}>{results.length} imóveis encontrados</AppText>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />
        ) : (
          results.map((post) => (
            <PostBlock
              key={post.id}
              statusType="favorite"
              image={post.imagens?.[0] ? { uri: post.imagens[0] } : require("@/assets/Imagem.png")}
              title={`${post.tipoMoradiaEspecifico} - ${post.bairro}`}
              price={post.preco}
              isActive={false}
              onPress={() => router.push(`/pvuLandLord/${post.id}`)}
            />
          ))
        )}

        {!loading && results.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <AppText>Não foi encontrado nenhum imóvel para este filtro.</AppText>
          </View>
        )}
        
    </ScrollView>
    <NavigationBar/>
    </>
  );
}