import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import StatusPost from "../statusPost";
import AppText from "../appText";

type PostBlockProps = {
  image: any;
  title: string;
  price: number;
  type?: "favorite" | "preview";
  statusType?: "visibility" | "favorite";
};

export default function PostBlock({
  image,
  title,
  price,
  type = "preview",
  statusType = "visibility",
}: PostBlockProps) {
  return (
    <View
      style={
        type === "favorite" ? styles.containerFavorite : styles.containerPreview
      }
    >
      {type === "favorite" ? (
        <></>
      ) : (
        <StatusPost style={styles.status} type={statusType} />
      )}
      <Image
        source={image}
        style={type === "favorite" ? styles.imageFavorite : styles.imagePreview}
      />
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.price}>R$ {price}/mês</AppText>
    </View>
  );
}
