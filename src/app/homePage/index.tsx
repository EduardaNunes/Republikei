import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/homePage";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import { colors } from "@/styles/colors"; 
import PostBlock from "@/components/postBlock";

export default function HomePage() {

  return (
    <>
    <ScrollView style={styles.container}>
        <Input placeholder="Pesquisar" placeholderTextColor={colors.gray[100]}></Input>
        <Categories></Categories>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>SUGESTÕES</AppText>
        </View>
        <PostBlock type="favorite" statusType="favorite" image="@/assets/Imagem.png" title="Quarto" price={800}/>


        
        
    </ScrollView>
    <Menu></Menu>
    </>
  );
}