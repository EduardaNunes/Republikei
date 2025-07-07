import {Image, View, TouchableOpacity, FlatList, Modal, Alert, Linking} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"


import {styles} from "./styles"
import { colors } from '@/styles/colors';
import { SquareButton } from '@/components/button';
import { Text } from "@/components/text";
import { Input } from '@/components/input';
import { Category } from '@/components/category';
import { Categories } from '@/components/categories';


export default function Index() {
  return (
    <View style={styles.container}>

      <Image
        source={require("@/assets/background.png")}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.containerTextAndButton}>
        <View>
            <View style={styles.titleContainer}>
                <MaterialIcons name="location-on" size={40} color={colors.orange[300]} />
                <Text style={styles.title}>REPUBLIKEI</Text>
            </View>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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

