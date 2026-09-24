import { View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "../../components/styles/homePage";
import AppText from "@/components/appText";
import Logo from "@/components/logo";
import NavigationBar from "@/components/navigationBar";
import Categories from "@/components/categories";
import PostBlock from "@/components/postBlock";
import Input from "@/components/input";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useHomePagePresenter } from "@/presenter/useHomePagePresenter";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";

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
    fetchPosts,
  } = useHomePagePresenter();

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: colors.backgroundLight }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Logo />
          <View style={styles.headerIcons}>
            {/* TODO: apontar para as telas de chat/notificações quando existirem */}
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="notifications-none" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchRow}>
          <TouchableOpacity style={{ flex: 1 }} onPress={handleSearchPress} activeOpacity={0.8}>
            <Input
              title=""
              placeholder="Pesquisar imóveis..."
              autoCapitalize="none"
              icon="search"
              editable={false}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoriesRow}>
          <Categories
            selectedCategoryId={selectedCategoryId.toString()}
            onCategorySelect={setSelectedCategoryId}
          />
        </View>

        <View style={styles.sectionHeaderRow}>
          <AppText style={styles.sectionTitle}>Vagas em Destaque</AppText>
          <TouchableOpacity onPress={handleSearchPress}>
            <AppText style={styles.sectionLink}>Ver todas</AppText>
          </TouchableOpacity>
        </View>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => {
            const isOwner = userId === post.proprietario;
            const statusType = isOwner ? "visibility" : "favorite";

            if (post.oculto) return null;

            const address = `${post.rua}${post.numero ? ", " + post.numero : ""} - ${post.bairro}`;

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
                type={post.tipoMoradiaEspecifico}
                address={address}
                tags={post.caracteristicas}
                statusType={statusType}
                onPress={() => handlePostPress(post.id)}
                isActive={isOwner ? !post.oculto : !!post.isFavorited}
                onStatusPress={() =>
                  postStatusPresenter.handleStatusPress({
                    isOwner,
                    userId,
                    post,
                    currentList: allPosts,
                    setPosts: setPosts,
                    refreshCallback: fetchPosts,
                  })
                }
                avaliacaoMedia={post.avaliacaoMedia}
                totalAvaliacoes={post.totalAvaliacoes}
              />
            );
          })
        ) : (
          <AppText style={styles.emptyText}>Nenhum anúncio encontrado.</AppText>
        )}
      </ScrollView>

      <NavigationBar />
    </View>
  );
}
