import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

export default function LandlordName() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="person" size={32} color={colors.orange[300]} />
      </View>
      <View>
        <Text style={styles.text}>Nome do Locatário</Text>
        <Text style={styles.text}>Número do Locatário</Text>
      </View>
    </View>
  );
}
