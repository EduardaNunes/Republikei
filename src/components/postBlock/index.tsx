import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import StatusPost from "../statusPost";
import AppText from "../appText";

type PostBlockProps = {
  image: any;
  title: string;
  price: number;
  type?: "favorite" | "preview";
  statusType?: "visibility" | "favorite";
  onPress?: () => void;
};

export default function PostBlock({
  image,
  title,
  price,
  type,
  statusType,
  onPress
}: PostBlockProps) {
  return (
    <TouchableOpacity
      style={
        type === "favorite" ? styles.containerFavorite : styles.containerPreview
      }
      onPress={onPress}
    >
      {/* Só mostra o status se for preview e statusType estiver definido */}
      {type !== "favorite" && statusType && (
        <StatusPost style={styles.status} type={statusType} />
      )}
      
      <Image
        source={image}
        style={type === "favorite" ? styles.imageFavorite : styles.imagePreview}
      />
      <AppText style={styles.title} >{title}</AppText>
      <AppText style={styles.price}>R$ {price}/mês</AppText>
    </TouchableOpacity>
  );
}
