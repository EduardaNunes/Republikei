import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type StatusPostProps = {
  type: "visibility" | "favorite";
  style?: object;
  isActive: boolean;
  onPress?: () => void;
};

export default function StatusPost({ type, style, isActive, onPress }: StatusPostProps) {
  // const [favoriteIcon, setFavoriteIcon] = useState<"favorite" | "favorite-border">("favorite-border");
  // const [visibilityIcon, setVisibilityIcon] = useState<"visibility" | "visibility-off">("visibility-off");

  // // Proteção contra tipo inválido (opcional, mas recomendada)
  // if (type !== "favorite" && type !== "visibility") return null;

  const isVisibility = type === "visibility";
  const visibilityIconName = isActive ? "visibility" : "visibility-off";
  const isOff = !isActive;

  const favoriteIconName = isActive ? "favorite" : "favorite-border";

  // const handlePress = () => {
  //   if (type === "favorite") {
  //     setFavoriteIcon(favoriteIcon === "favorite" ? "favorite-border" : "favorite");
  //   } else {
  //     setVisibilityIcon(visibilityIcon === "visibility" ? "visibility-off" : "visibility");
  //   }
  // };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        style,
        // Aplica o fundo laranja apenas se for do tipo visibilidade E estiver oculto
        isVisibility && isOff ? { backgroundColor: colors.orange[300] } : null,
      ]}
    >
      <MaterialIcons
        name={isVisibility ? visibilityIconName : favoriteIconName}
        size={24}
        color={
          isVisibility && isOff
            ? "#fff" // Ícone branco no fundo laranja
            : colors.orange[300] // Ícone laranja no fundo transparente
        }
      />
    </TouchableOpacity>
  );
}
