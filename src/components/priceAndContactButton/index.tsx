import { styles } from "./styles";
import AppText from "../appText";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SquareButton from "../button";

type PriceAndContactButtonProps = {
  price: number;
  isOwner: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PriceAndContactButton({
  price,
  isOwner,
  onEdit,
  onDelete,
}: PriceAndContactButtonProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.priceText}>R$ {price}/mês</AppText>
      {isOwner ? (
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
            <MaterialIcons name="edit" size={28} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={styles.iconButton}>
            <MaterialIcons name="delete" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      ) : (
         <SquareButton name="Mapa" variant="darkGrayS" />
      )}
    </View>
  );
}
