import { Text, Pressable, PressableProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";

type Props = PressableProps & {
  name: string;
  isSelected: boolean;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export function Category({ name, icon, isSelected, ...rest }: Props) {
  const color = isSelected ? colors.orange[300] : colors.gray[800];
  return (
    <Pressable style={[styles.container, { backgroundColor: color }]} {...rest}>
      <AppText style={[styles.name, { color: colors.gray[100] }]}>{name}</AppText>
    </Pressable>
  );
}
