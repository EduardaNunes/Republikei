import { View, Text } from "react-native";
import { styles } from "./styles";
import AppText from "../appText";

type LandlordNameProps = {
  name: string;
  phone: string;
  email: string;
};

export default function OwnerData({ name, phone, email }: LandlordNameProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <AppText style={styles.textName}>{name}</AppText>
        <AppText style={styles.textNumber}>{phone}</AppText>
        <AppText style={styles.textNumber}>{email}</AppText>
      </View>
    </View>
  );
}
