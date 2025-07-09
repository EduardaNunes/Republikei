import { View, Text, Image } from "react-native";
import { styles } from "./styles";
import StatusPost from "../statusPost";

type PostBlockProps = {
  image: string;
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
        source={{ uri: image }}
        style={type === "favorite" ? styles.imageFavorite : styles.imagePreview}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>R$ {price}/mês</Text>
    </View>
  );
}
