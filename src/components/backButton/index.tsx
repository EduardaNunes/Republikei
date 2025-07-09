import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  variant?: "small" | "medium";
};

export function BackButton({ icon, variant = "medium", ...rest }: Props) {
  const containerVariants = {
    small: styles.smallContainer,
    medium: styles.mediumContainer,
  };

  return (
    <TouchableOpacity style={containerVariants[variant]} {...rest}>
      <MaterialIcons
        name={icon}
        color={colors.gray[100]}
        size={24}
      ></MaterialIcons>
    </TouchableOpacity>
  );
}
