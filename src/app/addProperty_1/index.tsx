import { View, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useState } from "react";
import { Localizacao } from "@/utils/typesAux";
import axios from 'axios';

export default function AddProperty_1() {
  const router = useRouter();

  const { addProperty1, localizacao } = useContext(NewPostContext);

  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const [cep, setCep] = useState(localizacao.cep);
  const [rua, setRua] = useState(localizacao.rua);
  const [bairro, setBairro] = useState(localizacao.bairro);
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState(""); 
  const [numero, setNumero] = useState(localizacao.numero ? localizacao.numero.toString() : "");
  const [complemento, setComplemento] = useState(localizacao.complemento);


    const fetchAddressFromCep = async (cepValue: string) => {
    setCepLoading(true);
    try {

      // 1. Coleta as informações da api de acordo com o cep
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cepValue}`);
      
      // 2. Preenche com a resposta obtida
      setRua(response.data.street);
      setBairro(response.data.neighborhood);
      setCidade(response.data.city);  
      setEstado(response.data.state);

    } catch (error) {
      // Limpa os campos se o CEP for inválido
      setRua("");
      setBairro("");
      setCidade("");
      setEstado("");
      Alert.alert("CEP não encontrado", "Por favor, verifique o CEP digitado.");
    } finally {
      setCepLoading(false);
    }
  };

  const handleCepChange = (text: string) => {

    // Remove qualquer caractere que não seja número
    const cleanedCep = text.replace(/[^0-9]/g, "");
    setCep(cleanedCep);

    // Se o CEP atingir 8 dígitos, dispare a busca
    if (cleanedCep.length === 8) {
      fetchAddressFromCep(cleanedCep);
    }

  };

  const handleEnvio = async () => {
    
    if (!cep || !rua || !bairro || !numero ) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try{
      // 1. Monta o endereço em uma única string
      const addressString = `${rua}, ${numero} - ${bairro}, ${cidade} - ${estado}, ${cep}`;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;

      // 2. Chama a API de Geocoding
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`;
      const response = await axios.get(url);

      // 3. Verifica se o Google encontrou o endereço
      if (response.data.status !== 'OK' || response.data.results.length === 0) {
        throw new Error("Não foi possível encontrar as coordenadas para este endereço. Verifique se os dados foram inseridos corretamente.");
      }

      // 4. Extraia a latitude e longitude da resposta
      const location = response.data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      const aux: Localizacao = {
        cep: cep,
        rua: rua,
        bairro: bairro,
        numero: parseFloat(numero),
        complemento: complemento,
        latitude: latitude,
        longitude: longitude,
      };

      addProperty1(aux);
      router.push("/addProperty_2");

    } catch (error: any) {
      Alert.alert("Erro de Geocoding", error.message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 20,
            paddingHorizontal: 20,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>ADICIONAR IMÓVEL</AppText>
            <AppText style={styles.subtitle}>LOCALIZAÇÃO</AppText>
          </View>

          <View style={styles.geralContainer}>
            <View style={styles.inputContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Input
                  title="CEP"
                  keyboardType="numeric"
                  onChangeText={handleCepChange}
                  value={cep}
                  maxLength={8}
                  containerStyle={{flex: 1}}
                />
                {/* Mostra um indicador de loading durante a busca */}
                {cepLoading && <ActivityIndicator style={{marginLeft: 10}}/>}
              </View>
              <Input
                title="Rua"
                onChangeText={setRua}
                value={rua}
              />
              <Input
                title="Bairro"
                onChangeText={setBairro}
                value={bairro}
              />
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Número"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setNumero}
                  value={numero}
                />
                <Input
                  variant="secondary"
                  title="Complemento"
                  containerStyle={{ width: "48%" }}
                  onChangeText={setComplemento}
                  value={complemento}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.buttonsContainer}>
        <SquareButton
          name="Cancelar"
          variant="mediumS"
          onPress={() => router.back()}
        />
        <SquareButton
          name="Continuar"
          variant="mediumP"
          disabled={loading}
          onPress={handleEnvio}
        />
      </View>
      <Menu />
    </>
  );
}
