import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../appText";

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
      <AppText style={titleVariants[variant]}>{name}</AppText>
    </TouchableOpacity>
  );
}
