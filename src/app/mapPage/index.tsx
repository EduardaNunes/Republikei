import { Image, View, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../../lib/supabase";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/mapPage";
import AppText from "@/components/appText";
import Logo from "@/components/logo";
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

// initialRegion (e não region): assim o mapa não "volta" para o ponto inicial
// toda vez que a tela re-renderiza (ex.: ao tocar em um marcador).
const INITIAL_REGION = {
  latitude: -21.7731029,
  longitude: -43.3705765,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function MapPage() {

  const router = useRouter();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0"); 

  const [allImoveis, setAllImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState<Imovel | null>(null); 

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

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

  // Some o card se o imóvel selecionado não estiver mais no filtro atual
  useEffect(() => {
    if (selectedImovel && !filteredImoveis.some((imovel) => imovel.id === selectedImovel.id)) {
      setSelectedImovel(null);
    }
  }, [filteredImoveis, selectedImovel]);

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  const total = filteredImoveis.length;

  return (
    <View style={styles.screen}>

      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Logo />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/chatHub")}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            {/* TODO: apontar para a tela de notificações quando existir */}
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="notifications-none" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.categoriesRow}>
          <Categories 
            compact
            selectedCategoryId={selectedCategoryId} 
            onCategorySelect={setSelectedCategoryId} 
          />
        </View>
      </View>

      <View style={styles.mapContainer}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          userInterfaceStyle="light"
          provider={PROVIDER_GOOGLE}
          initialRegion={INITIAL_REGION}
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

        {!loading && (
          <View style={styles.resultsPill} pointerEvents="none">
            <MaterialIcons name="place" size={14} color={colors.primary} />
            <AppText style={styles.resultsPillText}>
              {total} {total === 1 ? "imóvel" : "imóveis"} no mapa
            </AppText>
          </View>
        )}

        {loading && (
          <View style={styles.loadingOverlay} pointerEvents="none">
            <View style={styles.loadingBox}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          </View>
        )}
      </View>

      {selectedImovel && (
        <TouchableOpacity 
          style={styles.calloutContainer}
          activeOpacity={0.9}
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
            {!!selectedImovel.tipoMoradiaEspecifico && (
              <View style={styles.calloutTypeBadge}>
                <AppText style={styles.calloutTypeBadgeText}>
                  {selectedImovel.tipoMoradiaEspecifico}
                </AppText>
              </View>
            )}
            <AppText style={styles.calloutTitle} numberOfLines={1}>
              {selectedImovel.rua}, {selectedImovel.numero}
            </AppText>
            <AppText style={styles.calloutPrice}>R$ {selectedImovel.preco}/mês</AppText>
            <AppText style={styles.calloutLink}>Ver detalhes →</AppText>
          </View>
        </TouchableOpacity>
      )}

      <NavigationBar/>
    </View>
  );
}
