import { View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import StatusPost from "../statusPost";
import AppText from "../appText";
import StarRating from "../starRating";

type PostBlockProps = {
  image: any;
  title: string;
  price: number;
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
  statusType,
  onPress,
  isActive,
  onStatusPress,
  avaliacaoMedia = 0,
  totalAvaliacoes = 0,
}: PostBlockProps) {
  return (
    <TouchableOpacity
      style={styles.containerPreview}
      onPress={onPress}
      disabled={!onPress}
    >
      {statusType && (
        <StatusPost
          style={styles.status}
          type={statusType}
          isActive={isActive}
          onPress={onStatusPress}
        />
      )}

      <Image source={image} style={styles.imagePreview} />
      <AppText style={styles.title}>{title}</AppText>

      <View style={styles.ratingRow}>
        <StarRating rating={avaliacaoMedia} readOnly size={14} />
        <AppText style={styles.ratingText}>
          {totalAvaliacoes > 0
            ? `${avaliacaoMedia.toFixed(1)} (${totalAvaliacoes})`
            : "Sem avaliações"}
        </AppText>
      </View>

      <AppText style={styles.price}>R$ {price}/mês</AppText>
    </TouchableOpacity>
  );
}