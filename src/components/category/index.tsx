import { Pressable, PressableProps } from "react-native";
import { colors } from "@/styles/colors";
import { styles } from "./styles";
import AppText from "../appText";

type Props = PressableProps & {
  name: string;
  id: string;
  isSelected: boolean;
};

export function Category({ name, isSelected, ...rest }: Props) {
  const backgroundColor = isSelected ? colors.backgroundGreen : colors.darkGray;

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      {...rest}
    >
      <AppText style={[styles.name, { color: colors.white }]}>
        {name}
      </AppText>
    </Pressable>
  );
}
