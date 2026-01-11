import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import { colors } from "@/styles/colors";
import { useHomePagePresenter } from "@/presenter/useHomePagePresenter";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";

export default function HomePage() {
  const {
    loading,
    filteredPosts,
    selectedCategoryId,
    userType,
    userId,
    handlePostPress,
    handleSearchPress,
    setSelectedCategoryId,
  } = useHomePagePresenter();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.orange[300]} />
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={handleSearchPress}
          style={styles.fakeInput}
          activeOpacity={0.8}
        >
          <AppText style={styles.fakeInputText}>Pesquisar</AppText>
        </TouchableOpacity>

        <Categories 
          selectedCategoryId={selectedCategoryId} 
          onCategorySelect={setSelectedCategoryId} 
        />

        <View style={styles.titleContainer}>
          <AppText style={styles.title}>SUGESTÕES</AppText>
        </View>

        <View style={styles.postContainer}>
          {filteredPosts.map((post) => {

            const isOwner = userId === post.proprietario;
            const statusType = isOwner ? "visibility" : "favorite";

            return (
              <PostBlock
                key={post.id}
                image={
                  post.imagens && post.imagens.length > 0
                    ? { uri: post.imagens[0] }
                    : require("../../assets/Imagem.png")
                }
                title={post.tipoMoradiaEspecifico + " - " + post.bairro}
                price={post.preco}
                statusType={statusType}
                onPress={() => handlePostPress(post.id)}
                isActive={!post.oculto}
                //onStatusPress={postStatusPresenter.handleStatusPress(isOwner)}
              />
            );
          })}
        </View>
      </ScrollView>
      <NavigationBar />
    </>
  );
}