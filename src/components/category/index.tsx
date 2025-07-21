import { Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";
import { useState } from "react";

type Props = PressableProps & {
  name: string;
};

export function Category({ name, ...rest }: Props) {
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
      <AppText style={[styles.name, { color: colors.gray[100] }]}>
        {name}
      </AppText>
    </Pressable>
  );
}
