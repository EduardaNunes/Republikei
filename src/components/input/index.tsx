import { TextInput, TextInputProps, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import AppText from "../appText";

type Props = TextInputProps & {
  title?: string;
  variant?: "darkGray" | "primary" | "secondary";
  containerStyle?: object;
  icon?: ComponentProps<typeof MaterialIcons>["name"]
};

export default function Input({ title, variant = "darkGray",containerStyle = {}, icon, ...rest }: Props) {
  
  const containerVariants = {

    // Republikei
    darkGray: styles.darkGrayContainer,
    white: styles.whiteContainer,

    // Old
    primary: styles.primaryContainer,
    secondary: styles.secondaryContainer,
  };

  const textVariants = {
    // Republikei
    darkGray: styles.darkGrayContainerText,
    white: styles.whiteContainerText,

    // Old
    primary: styles.text,
    secondary: styles.text,
  }
  
  return (
    <View style={containerVariants[variant]}>
      { icon &&
        <MaterialIcons
          name={icon}
          color={textVariants[variant].color}
          size={28}
        />
      }
      <TextInput
        style={textVariants[variant]}
        placeholderTextColor={textVariants[variant].color}
        {...rest}
      />
    </View>
  );
}
