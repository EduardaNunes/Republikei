import { View, Text, Image } from "react-native";
import { styles } from "./styles";

type FavoritePostProps = {
  image: string;
  title: string;
  price: number;
};

export default function FavoritePost({
  image,
  title,
  price,
}: FavoritePostProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>R$ {price}/mês</Text>
    </View>
  );
}
