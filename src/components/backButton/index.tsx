import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  variant?: "small" | "medium";
  type?: "back" | "plus";
};

export default function BackButton({
  variant = "medium",
  type = "back",
  ...rest
}: Props) {
  const containerVariants = {
    small: styles.smallContainer,
    medium: styles.mediumContainer,
  };

  return (
    <TouchableOpacity
      style={[
        containerVariants[variant],
        type === "back"
          ? styles.containerBack
          : styles.containerPlus,
      ]}
      {...rest}
    >
      <MaterialIcons
        name={type === "back" ? "arrow-back" : "add"}
        color={colors.gray[100]}
        size={32}
      ></MaterialIcons>
    </TouchableOpacity>
  );
}
