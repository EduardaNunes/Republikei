import { Pressable, PressableProps } from "react-native";
import { styles } from "./styles";
import AppText from "../appText";

type Props = PressableProps & {
  name: string;
  id: string;
  isSelected: boolean;
};

export function Category({ name, isSelected, ...rest }: Props) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.containerActive]}
      {...rest}
    >
      <AppText style={[styles.name, isSelected ? styles.nameActive : styles.nameInactive]}>
        {name}
      </AppText>
    </Pressable>
  );
}
