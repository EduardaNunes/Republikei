import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import StatusPost from "../statusPost";
import AppText from "../appText";

type PostBlockProps = {
  image: any;
  title: string;
  price: number;
  //type?: "favorite" | "preview";
  statusType?: "visibility" | "favorite";
  onPress?: () => void;
  isActive: boolean; 
  onStatusPress?: () => void; 
};

export default function PostBlock({
  image,
  title,
  price,
  statusType,
  onPress,
  isActive,
  onStatusPress,
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
      <AppText style={styles.price}>R$ {price}/mês</AppText>
    </TouchableOpacity>
  );
}