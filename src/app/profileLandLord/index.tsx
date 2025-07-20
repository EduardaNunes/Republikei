import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/profileRenter";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/backButton";
import AppText from "@/components/appText";
import PhotosCounter from "@/components/photosCounter";
import Menu from "@/components/menu";



export default function ProfileLandLord() {

  return (
    <>
    
    <ScrollView style={styles.container}>
        <View  style={styles.titleContainer}>
            {/* colocar a foto quando tiver o componente */}
            <AppText style={styles.title}>NOME PERFIL</AppText>
        </View>
        <View  style={styles.inputContainer}>
            <Input title="Email"></Input>
            <Input title="Senha"></Input>
            <Input title="Celular"></Input>
            <Input title="Descrição"></Input>
        </View>
        <View  style={styles.buttonsContainer}>
            <SquareButton name="Logout" variant="shortS"></SquareButton>
            <SquareButton name="Editar" variant="shortP"></SquareButton>
        </View>
    </ScrollView>
    <Menu></Menu>
    </>
  );
}
