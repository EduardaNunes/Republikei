import React, { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type StatusPostProps = {
  type: "visibility" | "favorite";
  style?: object;
};

export default function StatusPost({ type, style }: StatusPostProps) {
  const [favoriteIcon, setFavoriteIcon] = useState<"favorite" | "favorite-border">("favorite-border");
  const [visibilityIcon, setVisibilityIcon] = useState<"visibility" | "visibility-off">("visibility-off");

  // Proteção contra tipo inválido (opcional, mas recomendada)
  if (type !== "favorite" && type !== "visibility") return null;

  const isVisibility = type === "visibility";
  const isOff = visibilityIcon === "visibility-off";

  const handlePress = () => {
    if (type === "favorite") {
      setFavoriteIcon(favoriteIcon === "favorite" ? "favorite-border" : "favorite");
    } else {
      setVisibilityIcon(visibilityIcon === "visibility" ? "visibility-off" : "visibility");
    }
  };

  return (
    <View
      style={[
        styles.container,
        style,
        isVisibility && isOff ? { backgroundColor: colors.orange[300] } : null,
      ]}
    >
      <MaterialIcons
        name={isVisibility ? visibilityIcon : favoriteIcon}
        size={24}
        color={isVisibility && isOff ? "#fff" : colors.orange[300]}
        onPress={handlePress}
      />
    </View>
  );
}
