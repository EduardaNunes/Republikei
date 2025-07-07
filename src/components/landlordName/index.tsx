import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type LandlordNameProps = {
  name?: string;
  phone?: string;
};

export default function LandlordName({name, phone}: LandlordNameProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="person" size={32} color={colors.orange[300]} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textName}>{name}</Text>
        <Text style={styles.textNumber}>{phone}</Text>
      </View>
      <MaterialIcons
        style={styles.button}
        name="arrow-forward-ios"
        size={32}
        color={colors.orange[300]}
      />
    </View>
  );
}
