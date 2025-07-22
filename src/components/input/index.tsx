import { TextInput, TextInputProps, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import AppText from "../appText";

type Props = TextInputProps & {
  title?: string;
  variant?: "primary" | "secondary";
  containerStyle?: object;
};

export default function Input({ title, variant = "primary",containerStyle = {}, ...rest }: Props) {
  
  const containerVariants = {
      primary: styles.primaryContainer,
      secondary: styles.secondaryContainer,
  };
  
  return (
    <View style={containerStyle}>
      <AppText style={styles.text}> {title}</AppText>
      <TextInput
        style={containerVariants[variant]}
        placeholderTextColor={colors.orange[800]}
        {...rest}
      />
    </View>
  );
}
