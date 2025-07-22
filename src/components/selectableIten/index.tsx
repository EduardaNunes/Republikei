import { Pressable } from "react-native";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";

type SelectableItenProps = {
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

export function SelectableIten({
  text,
  isSelected,
  onPress,
}: SelectableItenProps) {
  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: colors.gray[800] },
        isSelected && { backgroundColor: colors.orange[300] },
      ]}
      onPress={onPress}
    >
      <AppText style={[{ color: colors.gray[100] }]}>{text}</AppText>
    </Pressable>
  );
}
