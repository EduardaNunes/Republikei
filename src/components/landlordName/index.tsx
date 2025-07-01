import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

export default function LandlordName() {
  return (
    <View>
      <View>
        <MaterialIcons name="person" size={32} color={colors.orange[300]} />
      </View>
      <Text>Nome do Locatário</Text>
      <Text>Número do Locatário</Text>
    </View>
  );
}
