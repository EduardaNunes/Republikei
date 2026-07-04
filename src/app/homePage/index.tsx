import { View, ScrollView, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import React from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import NavigationBar from "@/components/navigationBar";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import { colors } from "@/styles/colors";
import { useHomePagePresenter } from "@/presenter/useHomePagePresenter";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";
import Input from "@/components/input";

export default function HomePage() {
  const {
    loading,
    allPosts,
    setPosts,
    filteredPosts,
    selectedCategoryId,
    userId,
    handlePostPress,
    handleSearchPress,
    setSelectedCategoryId,
    fetchPosts
  } = useHomePagePresenter();

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.backgroundGreen}/>
      </View>
    );
  }

  return (
    <>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("@/assets/paper_texture.png")}
          style={styles.paperTexture}
        />
      </View>

      <ScrollView style={styles.container}>

        <TouchableOpacity
          onPress={handleSearchPress}
          activeOpacity={0.8}
        >
          <Input
            title=""
            placeholder="Pesquisar"
            autoCapitalize="none"
            icon='search'

          />
        </TouchableOpacity>

        <Categories 
          selectedCategoryId={selectedCategoryId.toString()} 
          onCategorySelect={setSelectedCategoryId} 
        />

        <View style={styles.titleContainer}>
          <AppText style={styles.title}>SUGESTÕES</AppText>
        </View>

        <View style={styles.postContainer}>
          {filteredPosts.map((post) => {

            const isOwner = userId === post.proprietario;
            const statusType = isOwner ? "visibility" : "favorite";

            if (post.oculto) return null;

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
                isActive={isOwner ? !post.oculto : !!post.isFavorited}
                onStatusPress={() => postStatusPresenter.handleStatusPress({
                  isOwner,
                  userId,
                  post,
                  currentList: allPosts,
                  setPosts: setPosts,
                  refreshCallback: fetchPosts
                })}
              />
            );
          })}
        </View>
      </ScrollView>

      <NavigationBar />
    </>
  );
}