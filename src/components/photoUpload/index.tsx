import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppText from "@/components/appText";
import { styles } from "./styles";


type Props = {
  maxImages?: number;
  onImagesChange?: (uris: string[]) => void;
};

export default function ImagePickerComponent({
  maxImages = 15,
  onImagesChange,
}: Props) {
  const [imagens, setImagens] = useState<string[]>([]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Acesse as configurações do app.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      selectionLimit: maxImages - imagens.length,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      const novasImagens = [...imagens, ...selectedUris].slice(0, maxImages);
      setImagens(novasImagens);
      onImagesChange?.(novasImagens);
    }
  };

  const removeImage = (uri: string) => {
    const novas = imagens.filter((item) => item !== uri);
    setImagens(novas);
    onImagesChange?.(novas);
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
        <AppText style={styles.uploadText}>Upload Fotos</AppText>
      </TouchableOpacity>

      <View style={styles.imagePreviewContainer}>
        {imagens.map((uri, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              Alert.alert(
                "Remover imagem?",
                "Deseja remover esta imagem da seleção?",
                [
                  { text: "Cancelar", style: "cancel" },
                  { text: "Remover", onPress: () => removeImage(uri) },
                ]
              )
            }
          >
            <Image source={{ uri }} style={styles.previewImage} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
