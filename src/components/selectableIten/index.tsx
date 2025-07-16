import { Pressable } from "react-native";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";
import { useState } from "react";

type SelectableItenProps = {
  text: string;
};

export function SelectableIten({ text, ...rest }: SelectableItenProps) {
  const [color, setColor] = useState(colors.gray[800]);

  const handlePress = () => {
    const aux =
      color === colors.orange[300] ? colors.gray[800] : colors.orange[300];
    setColor(aux);
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: color }]}
      {...rest}
      onPress={handlePress}
    >
      <AppText style={[{ color: colors.gray[100] }]}>{text}</AppText>
    </Pressable>
  );
}
