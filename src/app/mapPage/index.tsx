import { Image, View, ScrollView, Alert, StyleSheet } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/homePage";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import { colors } from "@/styles/colors"; 

export default function MapPage() {

  const [region, setRegion] = useState({
    latitude: -21.7730967,
    longitude: -43.3731014,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

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
            region={region}
            onRegionChange={setRegion}
          >

            <Marker
              key={0}
              coordinate={{
                latitude: -21.7730967,
                longitude: -43.3731014
              }}
              title={'Título de Teste'}
              image={require('../../assets/property-icon-128.png')}
              description={'Teste de Descrição de uma marcador'}
            />

          </MapView>
        </View> 
        
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
});