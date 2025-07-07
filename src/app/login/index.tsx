import {Image, View, TouchableOpacity, FlatList, Modal, Alert, Linking} from 'react-native';
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


export default function Login() {
  return (

    <SafeAreaProvider style={styles.container}>
        <BackButton style={styles.backButton} icon={"arrow-back"} />
        <SafeAreaView style={styles.imgContainer}>
            <Image
            source={require("@/assets/login-icon.png")}
            />
            <Text style={styles.title}> LOGIN </Text>
        </SafeAreaView>

      <View style={styles.containerTextAndButton}>
        <View style={styles.inputContainer}>
            <Input title={"Email"}></Input>
            <Input secureTextEntry={true} title={"Senha"}></Input>
        </View>
        
        <View style={styles.buttonContainer}>
            <SquareButton name="Entrar" />
            <View style={styles.signInContainer}>
                <Text>Não tem Login?</Text>
                <TouchableOpacity>
                    <Text style={styles.signInText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    </SafeAreaProvider>
  );
}

