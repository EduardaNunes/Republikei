import { View, ScrollView, Alert, ActivityIndicator, TouchableOpacity, Linking, Share } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "../../components/styles/pvuLandLord";
import AppText from "@/components/appText";
import { router, useLocalSearchParams } from "expo-router";
import { ImageCarousel } from "@/components/imagesCarrossel";
import HouseInfoList from "@/components/houseInfoList/houseInfoList";
import { useEffect, useState } from "react";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";
import ReviewsSection from "@/components/reviewsSection";
import { avaliacaoPresenter } from "@/presenter/avaliacaoPresenter";

import { getPropertyDetails, handleDeleteAction, handleEditAction } from "@/presenter/postPvuPresenter";
import { postStatusPresenter } from "@/presenter/postStatusPresenter";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext } from "react";
import { colors } from "@/styles/colors";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("") || "?";
}

export default function PvuLandLord() {

  const { id } = useLocalSearchParams<{ id: string }>();

  const [property, setProperty] = useState<Imovel | null>(null);
  const { loadPropertyForEdit } = useContext(NewPostContext);

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [ratingResumo, setRatingResumo] = useState({ media: 0, total: 0 });

  const [ownerInfo, setOwnerInfo] = useState({
    type: "",
    name: "",
    phone: "",
    email: "",
    userIsOwner: false,
  });

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {

    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const result = await getPropertyDetails(id);

        setProperty(result.property);
        setOwnerInfo(result.ownerInfo);

        const avaliacoes = await avaliacaoPresenter.getAvaliacoesByImovel(id);
        setRatingResumo(avaliacaoPresenter.getResumoAvaliacoes(avaliacoes));

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);

          if (!result.ownerInfo.userIsOwner) {
            const { data: fav } = await supabase
              .from("Favoritos")
              .select("id")
              .eq("user_id", user.id)
              .eq("post_id", id)
              .maybeSingle();
            setIsFavorited(!!fav);
          }
        }

      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do imóvel. | " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

  }, [id]);

  // ================================================================================ //
  //                                     HANDLERS
  // ================================================================================ //

  const onEdit = () => {
    if (property) handleEditAction(property, loadPropertyForEdit, router);
  };

  const onDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja mesmo excluir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await handleDeleteAction(id);
              Alert.alert("Sucesso", "Imóvel excluído.");
              router.replace("/myPosts");
            } catch (e) {
              Alert.alert("Erro", "Falha ao excluir.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const onToggleFavorite = async () => {
    if (!userId || !id) return;
    const next = !isFavorited;
    setIsFavorited(next);
    try {
      await postStatusPresenter.updateFavorites(userId, id, next);
    } catch {
      setIsFavorited(!next); // reverte se der erro
    }
  };

  const onShare = () => {
    if (!property) return;
    Share.share({
      message: `${property.tipoMoradiaEspecifico} - ${property.bairro} | R$ ${property.preco}/mês\nConfira no Republikei!`,
    });
  };

  const onWhatsApp = () => {
    const digits = (ownerInfo.phone || "").replace(/\D/g, "");
    if (!digits) {
      Alert.alert("Contato indisponível", "Este locador não cadastrou um telefone.");
      return;
    }
    Linking.openURL(`https://wa.me/55${digits}`);
  };

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />;
  }

  if (!property) {
    return <AppText>Imóvel não encontrado.</AppText>;
  }

  const tags = [
    property.tipoVaga,
    property.tipoMoradia,
    property.mobiliado ? "Mobiliado" : null,
    ...(property.caracteristicas || []),
    ...(property.moveisDisponiveis || []),
  ].filter(Boolean) as string[];

  return (
    <View style={styles.screen}>
      <View style={styles.carouselWrapper}>
        <ImageCarousel
          images={
            property.imagens && property.imagens.length > 0
              ? property.imagens.map((url) => ({ uri: url }))
              : [require("../../assets/Imagem.png")]
          }
          height={285}
        />
        <View style={styles.carouselOverlay} pointerEvents="none" />

        <View style={styles.topControlsRow}>
          <TouchableOpacity style={styles.glassButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={24} color={colors.white} />
          </TouchableOpacity>

          <View style={styles.glassButtonRow}>
            {!ownerInfo.userIsOwner && (
              <TouchableOpacity style={styles.glassButton} onPress={onToggleFavorite}>
                <MaterialIcons
                  name={isFavorited ? "favorite" : "favorite-border"}
                  size={18}
                  color={isFavorited ? colors.primary : colors.white}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.glassButton} onPress={onShare}>
              <MaterialIcons name="share" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.typeRatingRow}>
          <AppText style={styles.typeBadge}>{property.tipoMoradiaEspecifico}</AppText>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={12} color={colors.star} />
            <AppText style={styles.ratingValue}>{ratingResumo.media.toFixed(1)}</AppText>
            <AppText style={styles.ratingTotal}>
              ({ratingResumo.total} avaliações)
            </AppText>
          </View>
        </View>

        <AppText style={styles.title}>
          {property.tipoMoradiaEspecifico} - {property.bairro || "Sem Bairro"}
        </AppText>

        {/* Preço */}
        <View style={styles.priceCard}>
          <View>
            <AppText style={styles.priceLabel}>Valor mensal</AppText>
            <AppText style={styles.priceValue}>R$ {property.preco}</AppText>
            <AppText style={styles.priceSub}>
              {property.mobiliado ? "imóvel mobiliado" : "consulte condições"}
            </AppText>
          </View>
        </View>

        {/* Localização */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Localização</AppText>
          <View style={styles.card}>
            <View style={styles.locationRow}>
              <View style={styles.locationIconBox}>
                <MaterialIcons name="place" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <AppText style={styles.locationAddress}>
                  {property.rua}, nº {property.numero}
                  {property.complemento ? `, ${property.complemento}` : ""}
                </AppText>
                <AppText style={styles.locationSub}>
                  {property.bairro} - CEP {property.cep}
                </AppText>
              </View>
            </View>

            {tags.length > 0 && (
              <View style={styles.tagsRow}>
                {tags.map((tag, i) => (
                  <View key={`${tag}-${i}`} style={styles.tag}>
                    <AppText style={styles.tagText}>{tag}</AppText>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Descrição */}
        {!!property.descricao && (
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Sobre o imóvel</AppText>
            <AppText style={styles.description}>{property.descricao}</AppText>
          </View>
        )}

        {/* Detalhes numéricos (cômodos etc.) */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Detalhes do imóvel</AppText>
          <View style={styles.card}>
            <HouseInfoList
              variant="darkGray"
              data={{
                banheiros: property.num_banheiro,
                salasEstar: property.num_salaEstar,
                cozinhas: property.num_cozinha,
                pessoasPorMoradia: property.num_pessoasCasa,
                pessoasPorQuarto: property.num_pessoasQuarto,
                areasServico: property.num_areaServico,
                vagasGaragem: property.num_garagem,
                salasJantar: property.num_salaJantar,
                varandas: property.num_varanda,
                quartos: property.num_quartos,
              }}
            />
          </View>
        </View>

        {/* Avaliações */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Avaliações</AppText>
          <View style={styles.card}>
            <ReviewsSection imovelId={property.id} isOwner={ownerInfo.userIsOwner} />
          </View>
        </View>

        {/* Locador OU ações do proprietário */}
        {ownerInfo.userIsOwner ? (
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Gerenciar anúncio</AppText>
            <View style={styles.ownerActionsRow}>
              <TouchableOpacity style={styles.actionButtonPrimary} onPress={onEdit}>
                <AppText style={styles.actionButtonText}>Editar</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonDanger} onPress={onDelete}>
                <AppText style={styles.actionButtonText}>Excluir</AppText>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.section}>
            <AppText style={styles.sectionTitle}>Locador</AppText>
            <View style={styles.card}>
              <View style={styles.ownerHeaderRow}>
                <View style={styles.avatar}>
                  <AppText style={styles.avatarText}>{getInitials(ownerInfo.name || "?")}</AppText>
                </View>
                <View style={{ flex: 1 }}>
                  <AppText style={styles.ownerName}>{ownerInfo.name}</AppText>
                  {/* Selo/tempo de resposta são visuais — sem esses dados no banco ainda */}
                  <View style={styles.verifiedRow}>
                    <MaterialIcons name="verified" size={11} color={colors.success} />
                    <AppText style={styles.verifiedText}>Verificado</AppText>
                  </View>
                </View>
              </View>

              <View style={styles.phoneRow}>
                <MaterialIcons name="phone" size={14} color={colors.textGray} />
                <AppText style={styles.phoneText}>{ownerInfo.phone}</AppText>
              </View>

              <TouchableOpacity style={styles.whatsappButton} onPress={onWhatsApp}>
                <MaterialIcons name="chat" size={18} color={colors.white} />
                <AppText style={styles.whatsappText}>Contato via WhatsApp</AppText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}