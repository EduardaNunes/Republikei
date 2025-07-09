import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type Props = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function Category({ name, icon, isSelected, ...rest }: Props) {
  const color = isSelected ? colors.orange[300] : colors.gray[800];
  return (
    <Pressable style={[styles.container, { backgroundColor: color }]} {...rest}>
      <Text style={[styles.name, { color: colors.gray[100] }]}>{name}</Text>
    </Pressable>
  );
}
