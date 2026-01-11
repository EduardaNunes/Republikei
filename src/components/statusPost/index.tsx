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

  const isOwner = type === "visibility";
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
        isOwner && isOff ? { backgroundColor: colors.orange[300] } : null,
      ]}
    >
      <MaterialIcons
        name={isOwner ? visibilityIconName : favoriteIconName}
        size={24}
        color={
          isOwner && isOff
            ? "#fff" 
            : colors.orange[300]
        }
      />
    </TouchableOpacity>
  );
}
