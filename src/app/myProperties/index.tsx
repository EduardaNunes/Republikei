import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/myProperties";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";
import BackButton from "@/components/backButton";
import { router } from "expo-router";

export default function SearchResult() {

  return (
    <>
    <View style={styles.superContainer}>
        <ScrollView style={styles.container}>
            
            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>MEUS IMÓVEIS</AppText>
            </View>
            <PostBlock  image={require("@/assets/Imagem.png")} title="Quarto" price={800}/>
            
        </ScrollView>
        <BackButton type="plus" onPress={() => router.back()} />
    </View>
    <Menu></Menu>
    </>
  );
}