import { View, KeyboardAvoidingView, ScrollView, Platform, Alert, ActivityIndicator } from "react-native";
import { styles } from "../../components/styles/addProperty";
import SquareButton from "@/components/button";
import Input from "@/components/input";
import AppText from "@/components/appText";
import Menu from "@/components/menu";
import { useRouter } from "expo-router";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext, useState, useEffect } from "react";
import axios from 'axios';

export default function AddProperty_1() {
  const router = useRouter();

  const { formData, updateFormData, resetForm } = useContext(NewPostContext);

  const [loading, setLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  const [localData, setLocalData] = useState({
    cep: formData.localizacao.cep,
    rua: formData.localizacao.rua,
    bairro: formData.localizacao.bairro,
    numero: formData.localizacao.numero ? formData.localizacao.numero.toString() : "",
    complemento: formData.localizacao.complemento || "",
    latitude: formData.localizacao.latitude,
    longitude: formData.localizacao.longitude,
    cidade: "",
    estado: ""
  });

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {
    setLocalData(prev => ({
      ...prev,
      cep: formData.localizacao.cep,
      rua: formData.localizacao.rua,
      bairro: formData.localizacao.bairro,
      numero: formData.localizacao.numero ? formData.localizacao.numero.toString() : "",
      complemento: formData.localizacao.complemento || "",
      latitude: formData.localizacao.latitude,
      longitude: formData.localizacao.longitude,
    }));
  }, [formData.localizacao]);

  // ================================================================================ //
  //                          GET ADRESS FROM CEP - BRASIL API 
  // ================================================================================ //

  const fetchAddressFromCep = async (cepValue: string) => {
    setCepLoading(true);
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${cepValue}`);
      
      setLocalData(prev => ({
        ...prev,
        rua: response.data.street,
        bairro: response.data.neighborhood,
        cidade: response.data.city,
        estado: response.data.state
      }));

    } catch (error) {
      setLocalData(prev => ({
        ...prev,
        rua: "",
        bairro: "",
        cidade: "",
        estado: ""
      }));
      Alert.alert("CEP não encontrado", "Por favor, verifique o CEP digitado.");
    } finally {
      setCepLoading(false);
    }
  };

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleChange = (field: keyof typeof localData, value: string | number) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
  };

  const handleCepChange = (text: string) => {
    const cleanedCep = text.replace(/[^0-9]/g, ""); // remove special characters

    handleChange("cep", cleanedCep);

    if (cleanedCep.length === 8) { // minimum cep valid size to search
      fetchAddressFromCep(cleanedCep);
    }
  };

  const handleCancel = () => {
    resetForm();
    router.back();
  };

  const handleContinue = async () => {
    if (!localData.cep || !localData.rua || !localData.bairro || !localData.numero) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const addressString = `${localData.rua}, ${localData.numero} - ${localData.bairro}, ${localData.cidade} - ${localData.estado}, ${localData.cep}`;
      const apiKey = process.env.GOOGLE_MAPS_API_KEY;

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(addressString)}&key=${apiKey}`;
      const response = await axios.get(url);

      if (response.data.status !== 'OK' || response.data.results.length === 0) {
        throw new Error("Não foi possível encontrar as coordenadas para este endereço. Verifique se os dados foram inseridos corretamente.");
      }

      const location = response.data.results[0].geometry.location;
      const lat = location.lat;
      const lng = location.lng;

      updateFormData({
        localizacao: {
            cep: localData.cep,
            rua: localData.rua,
            bairro: localData.bairro,
            numero: parseFloat(localData.numero),
            complemento: localData.complemento,
            latitude: lat,
            longitude: lng
        }
      });
      
      router.push("/addProperty_2");

    } catch (error: any) {
      Alert.alert("Erro de Geocoding", error.message);
    } finally {
      setLoading(false);
    }
  };

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

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
                  value={localData.cep}
                  maxLength={8}
                  containerStyle={{flex: 1}}
                />
                {cepLoading && <ActivityIndicator style={{marginLeft: 10}}/>}
              </View>
              <Input
                title="Rua"
                onChangeText={(t) => handleChange("rua", t)}
                value={localData.rua}
              />
              <Input
                title="Bairro"
                onChangeText={(t) => handleChange("bairro", t)}
                value={localData.bairro}
              />
              <View style={styles.subinputContainer}>
                <Input
                  variant="secondary"
                  title="Número"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(t) => handleChange("numero", t)}
                  value={localData.numero}
                />
                <Input
                  variant="secondary"
                  title="Complemento"
                  containerStyle={{ width: "48%" }}
                  onChangeText={(t) => handleChange("complemento", t)}
                  value={localData.complemento}
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
          onPress={handleCancel}
        />
        <SquareButton
          name="Continuar"
          variant="mediumP"
          disabled={loading}
          onPress={handleContinue}
        />
      </View>
      <Menu />
    </>
  );
}