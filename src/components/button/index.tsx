import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@/components/text";

type Props = TouchableOpacityProps & {
  name: string;
  variant?: "primary" | "secondary" | "shortP" | "shortS";
};

export function SquareButton({ name, variant = "primary", ...rest }: Props) {
  const containerVariants = {
    primary: styles.primaryContainer,
    secondary: styles.secondaryContainer,
    shortP: styles.shortPrimaryContainer,
    shortS: styles.shortSecondaryContainer,
  };

  const titleVariants = {
    primary: styles.primaryTitle,
    secondary: styles.secondaryTitle,
    shortP: styles.shortPrimaryTitle,
    shortS: styles.shortSecondaryTitle,
  };

  return (
    <TouchableOpacity style={containerVariants[variant]} {...rest}>
      <Text style={titleVariants[variant]}>{name}</Text>
    </TouchableOpacity>
  );
}
