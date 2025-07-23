import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/searchResult";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";
import SquareButton from "@/components/button";

export default function SearchResult() {

  return (
    <>
    <BackButton onPress={() => router.back()} />
    <ScrollView style={styles.container}>
        
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>PESQUISA</AppText>
            <View style={styles.buttonContainer}>
                <SquareButton variant="mediumS" name="Pesquisa"/>
                <SquareButton variant="mediumS" name="Ver Mapa"/>
            </View>
        </View>
        <PostBlock type="favorite" statusType="favorite" image="@/assets/Imagem.png" title="Quarto" price={800}/>

        
        
    </ScrollView>
    <Menu></Menu>
    </>
  );
}