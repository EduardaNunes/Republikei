import { Image, View, ScrollView, Alert } from "react-native";

import React, { useState, useEffect } from "react";
import { styles } from "../../components/styles/favorites";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/backButton";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import PostBlock from "@/components/postBlock";



export default function Favorites() {

  return (
    <>
    <ScrollView style={styles.container}>
        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>FAVORITOS</AppText>
        </View>
        <View  style={styles.postContainer}>
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
        
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
            <PostBlock
                type="favorite"
                image={""}
                title={"Quarto - centro"}
                price={800}
            />
        </View>
    </ScrollView>
    <Menu></Menu>
    </>
  );
}