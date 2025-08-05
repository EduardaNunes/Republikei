import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";

type LandlordNameProps = {
  name: string;
  phone: string;
  mail: string;
};

export default function LandlordName({ name, phone, mail }: LandlordNameProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.textName}>{name}</AppText>
        <AppText style={styles.textNumber}>{phone}</AppText>
        <AppText style={styles.textNumber}>{mail}</AppText>
      </View>
    </View>
  );
}
