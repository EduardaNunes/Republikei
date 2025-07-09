import React, { useState } from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type StatusPostProps = {
  type: "visibility" | "favorite";
  style: object;
};

export default function StatusPost({ type, style }: StatusPostProps) {
  const [favoriteIcon, setfavoriteIcon] = useState<
    "favorite" | "favorite-border"
  >("favorite-border");
  const [visibilityIcon, setVisibilityIcon] = useState<
    "visibility" | "visibility-off"
  >("visibility-off");

  return (
    <View
      style={[
        styles.container,
        style,
        type === "visibility" && visibilityIcon === "visibility-off"
          ? { backgroundColor: colors.orange[300] }
          : null,
      ]}
    >
      <MaterialIcons
        name={type === "favorite" ? favoriteIcon : visibilityIcon}
        size={34}
        color={
          type === "visibility" && visibilityIcon === "visibility-off"
            ? "#fff"
            : colors.orange[300]
        }
        onPress={() => {
          type === "favorite"
            ? setfavoriteIcon(
                favoriteIcon === "favorite" ? "favorite-border" : "favorite"
              )
            : setVisibilityIcon(
                visibilityIcon === "visibility"
                  ? "visibility-off"
                  : "visibility"
              );
        }}
      />
    </View>
  );
}
