import {Image, View, TouchableOpacity, FlatList, Modal, Alert, Linking, ScrollView} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"


import {styles} from "./styles"
import { colors } from '@/styles/colors';
import { SquareButton } from '@/components/button';
import { Text } from "@/components/text";
import { Input } from '@/components/input';
import { Category } from '@/components/category';
import { Categories } from '@/components/categories';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '@/components/backButton';


export default function SignInLandLord() {
  return (

    <ScrollView style={styles.container}>
        <BackButton style={styles.backButton} icon={"arrow-back"} />
        <SafeAreaView style={styles.imgContainer}>
            <Image
            source={require("@/assets/cadLocat-icon.png")}
            />
            <Text style={styles.title}> CADASTRO LOCADOR </Text>
        </SafeAreaView>

      <View style={styles.containerTextAndButton}>
        <View style={styles.inputContainer}>
            <Input title={"Usuário"}></Input>
            <Input title={"Email"}></Input>
            <Input title={"Telefone"}></Input>
            <Input secureTextEntry={true} title={"Senha"}></Input>
            <Input secureTextEntry={true} title={"Confirmar Senha"}></Input>
        </View>
            <SquareButton name="Cadastrar" />
      </View>
    </ScrollView>
  );
}

