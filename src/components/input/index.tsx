import { TextInput, TextInputProps, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import AppText from "../appText";

type Props = TextInputProps & {
  title?: string;
};

export function Input({ title, ...rest }: Props) {
  return (
    <>
      <AppText style={styles.text}> {title}</AppText>
      <TextInput
        style={styles.container}
        placeholderTextColor={colors.orange[800]}
        {...rest}
      />
    </>
  );
}
