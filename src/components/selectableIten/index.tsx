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
        isSelected && { backgroundColor: colors.backgroundGreen },
      ]}
      onPress={onPress}
    >
      <AppText style={[styles.text , isSelected && {color: colors.white}]}>{text}</AppText>
    </Pressable>
  );
}
