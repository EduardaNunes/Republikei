import { Image, View, ScrollView, Alert, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { supabase } from "../../lib/supabase";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/homePage";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import { colors } from "@/styles/colors"; 
import { useRouter } from "expo-router";

interface Imovel {
  id: string;
  latitude: number;
  longitude: number;
  rua?: string;
  numero?: number;
  preco?: number;
  imagens?: string[];
}

export default function MapPage() {

  const router = useRouter();

  const [region, setRegion] = useState({
    latitude: -21.7731029,
    longitude: -43.3705765,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState<any>(null); // Para o painel de info

  useEffect(() => {
    const fetchImoveis = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('Imoveis')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);

      if (error) {
        console.error("Erro ao buscar imóveis:", error);
        Alert.alert("Erro", "Não foi possível carregar os imóveis.");
      } else if (data) {
        setImoveis(data);
      }
      
      setLoading(false);
    };

    fetchImoveis();
  }, []);

  return (
    <>
    <View style={styles.container}>
        <Input placeholder="Pesquisar" placeholderTextColor={colors.gray[100]}></Input>
        <Categories></Categories>
        <View  style={localStyles.mapContainer}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            userInterfaceStyle='dark'
            provider="google"
            initialRegion={region}
            onPress={() => setSelectedImovel(null)}
          >
            {imoveis.map((imovel) => (
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
          {loading && <ActivityIndicator style={StyleSheet.absoluteFillObject} size="large" />}
        </View>
        {selectedImovel && (
          <TouchableOpacity 
            style={localStyles.calloutContainer}
            onPress={() => router.push(`/property/${selectedImovel.id}`)}
          >
            <Image 
              source={{ uri: selectedImovel.imagens ? selectedImovel.imagens[0] : undefined }} 
              style={localStyles.calloutImage} 
            />
            <View style={localStyles.calloutTextContainer}>
              <AppText style={localStyles.calloutTitle}>{selectedImovel.rua}, {selectedImovel.numero}</AppText>
              <AppText style={localStyles.calloutPrice}>R$ {selectedImovel.preco}/mês</AppText>
            </View>
          </TouchableOpacity>
        )}
        
    </View>
    <Menu></Menu>
    </>
  );
}

const localStyles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  calloutContainer: {
    position: 'absolute',
    bottom: 90,
    left: '5%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  calloutImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  calloutTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  calloutTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  calloutPrice: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
});