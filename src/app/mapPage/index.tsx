import { Image, View, ScrollView, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { supabase } from "../../lib/supabase";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/mapPage";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import Categories from "@/components/categories";
import { colors } from "@/styles/colors"; 
import { useRouter } from "expo-router";
import { categories } from "@/utils/categories";

interface Imovel {
  id: string;
  latitude: number;
  longitude: number;
  rua?: string;
  numero?: number;
  preco?: number;
  imagens?: string[];
  tipoMoradiaEspecifico?: string;
}

export default function MapPage() {

  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: -21.7731029,
    longitude: -43.3705765,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0"); 

  const [allImoveis, setAllImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState<any>(null); 

  useEffect(() => {
    const fetchImoveis = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('Imoveis')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .not('oculto', 'is', true);

      if (error) {
        console.error("Erro ao buscar imóveis:", error);
        Alert.alert("Erro", "Não foi possível carregar os imóveis.");
      } else if (data) {
        setAllImoveis(data);
        setFilteredImoveis(data);
      }
      
      setLoading(false);
    };

    fetchImoveis();
  }, []);

  useEffect(() => {
  
    if (selectedCategoryId === "0") { // Todos
      setFilteredImoveis(allImoveis);
      return;
    }

    const categoryName = categories.find(category => category.id === selectedCategoryId)?.name;

    const filtered = allImoveis.filter(
      (imovel) => imovel.tipoMoradiaEspecifico === categoryName
    );
    setFilteredImoveis(filtered);

  }, [selectedCategoryId, allImoveis]);

  return (
    <>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("@/assets/paper_texture.png")}
          style={styles.paperTexture}
        />
      </View>

      <View style={styles.container}>

        <Categories 
          selectedCategoryId={selectedCategoryId} 
          onCategorySelect={setSelectedCategoryId} 
        />

        <View  style={styles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            userInterfaceStyle='dark'
            provider="google"
            region={region}
            onPress={() => setSelectedImovel(null)}
          >
            {filteredImoveis.map((imovel) => (
              <Marker
                key={imovel.id}
                coordinate={{
                  latitude: imovel.latitude,
                  longitude: imovel.longitude,
                }}
                image={require('../../assets/map-property-icon-128.png')}
                onPress={() => setSelectedImovel(imovel)}
              />
            ))}
          </MapView>
          {loading && <ActivityIndicator style={StyleSheet.absoluteFillObject} color={colors.backgroundGreen} size="large" />}
        </View>
        {selectedImovel && (
          <TouchableOpacity 
            style={styles.calloutContainer}
            onPress={() => router.push(`/pvuLandLord/${selectedImovel.id}`)}
          >
            <Image 
              style={styles.calloutImage} 
              source={
                selectedImovel.imagens && selectedImovel.imagens.length > 0
                  ? { uri: selectedImovel.imagens[0] }
                  : require("../../assets/Imagem.png") 
              }
            />
            <View style={styles.calloutTextContainer}>
              <AppText style={styles.calloutTitle}>{selectedImovel.rua}, {selectedImovel.numero}</AppText>
              <AppText style={styles.calloutPrice}>R$ {selectedImovel.preco}/mês</AppText>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <NavigationBar/>
    </>
  );
}