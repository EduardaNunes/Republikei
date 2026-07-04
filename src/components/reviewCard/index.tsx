import { View } from "react-native";
import AppText from "@/components/appText";
import StarRating from "@/components/starRating";
import { Avaliacao } from "@/utils/avaliacao";
import { styles } from "./styles";

type ReviewCardProps = {
  avaliacao: Avaliacao;
};

export default function ReviewCard({ avaliacao }: ReviewCardProps) {
  const data = new Date(avaliacao.created_at).toLocaleDateString("pt-BR");

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <AppText style={styles.autor}>{avaliacao.autorNome}</AppText>
        <AppText style={styles.data}>{data}</AppText>
      </View>
      <StarRating rating={avaliacao.nota} readOnly size={16} />
      {avaliacao.comentario && (
        <AppText style={styles.comentario}>{avaliacao.comentario}</AppText>
      )}
    </View>
  );
}