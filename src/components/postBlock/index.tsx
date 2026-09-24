import { View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import AppText from "../appText";
import { colors } from "@/styles/colors";

type PostBlockProps = {
  image: any;
  title: string;
  price: number;
  type?: string;
  address?: string;
  tags?: string[];
  statusType?: "visibility" | "favorite";
  onPress?: () => void;
  isActive: boolean;
  onStatusPress?: () => void;
  avaliacaoMedia?: number;
  totalAvaliacoes?: number;
};

export default function PostBlock({
  image,
  title,
  price,
  type,
  address,
  tags = [],
  statusType,
  onPress,
  isActive,
  onStatusPress,
  avaliacaoMedia = 0,
  totalAvaliacoes = 0,
}: PostBlockProps) {
  const iconOn = statusType === "visibility" ? "visibility" : "favorite";
  const iconOff = statusType === "visibility" ? "visibility-off" : "favorite-border";
  const safeTags = tags ?? [];

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />

        {statusType && (
          <TouchableOpacity style={styles.favoriteButton} onPress={onStatusPress}>
            <MaterialIcons
              name={isActive ? iconOn : iconOff}
              size={18}
              color={isActive ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        )}

        <View style={styles.priceBadge}>
          <AppText style={styles.priceBadgeText}>R$ {price}/mês</AppText>
        </View>

        {!!type && (
          <View style={styles.typeBadge}>
            <AppText style={styles.typeBadgeText}>{type}</AppText>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <AppText style={styles.title}>{title}</AppText>

        {!!address && (
          <View style={styles.addressRow}>
            <MaterialIcons name="place" size={13} color={colors.textMuted} />
            <AppText style={styles.addressText} numberOfLines={1}>
              {address}
            </AppText>
          </View>
        )}

        {safeTags.length > 0 && (
          <View style={styles.tagsRow}>
            {safeTags.slice(0, 3).map((tag) => (
              <View key={tag} style={styles.tag}>
                <AppText style={styles.tagText}>{tag}</AppText>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footerRow}>
          <View style={styles.ratingRow}>
            <MaterialIcons name="star" size={14} color={colors.star} />
            <AppText style={styles.ratingValue}>{avaliacaoMedia.toFixed(1)}</AppText>
            <AppText style={styles.ratingTotal}>
              {totalAvaliacoes > 0 ? `(${totalAvaliacoes} avaliações)` : "Sem avaliações"}
            </AppText>
          </View>
          <AppText style={styles.viewDetails}>Ver detalhes →</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}
