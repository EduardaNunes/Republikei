import {
  Image,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { SquareButton } from "@/components/button";
import { Text } from "@/components/text";
import LandlordName from "@/components/landlordName";

export default function Index() {
  return (
    <View style={styles.container}>

      <Image
        source={require("@/assets/background.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <LandlordName />
      <View style={styles.containerTextAndButton}>
        <View>
          <View style={styles.titleContainer}>
            <MaterialIcons
              name="location-on"
              size={32}
              color={colors.orange[300]}
            />
            <Text style={styles.title}>Republikei</Text>
          </View>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <SquareButton name="Cadastro Locador" variant="secondary" />
          <SquareButton name="Cadastro Locatário" variant="secondary" />
          <SquareButton name="Login" />
        </View>
      </View>
    </View>
  );
}
