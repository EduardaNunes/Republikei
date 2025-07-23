import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/homePage";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import Categories from "@/components/categories";
import { colors } from "@/styles/colors"; 
import PostBlock from "@/components/postBlock";

export default function MapPage() {

  return (
    <>
    <View style={styles.container}>
        <Input placeholder="Pesquisar" placeholderTextColor={colors.gray[100]}></Input>
        <Categories></Categories>
        <View  style={styles.titleContainer}>
            <AppText> colocar mapa aqui</AppText>
        </View> 
        
    </View>
    <Menu></Menu>
    </>
  );
}