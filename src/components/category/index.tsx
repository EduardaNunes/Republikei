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
  const backgroundColor = isSelected ? colors.orange[300] : colors.gray[800];

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      {...rest}
    >
      <AppText style={[styles.name, { color: colors.gray[100] }]}>
        {name}
      </AppText>
    </Pressable>
  );
}
