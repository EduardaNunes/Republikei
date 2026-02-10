import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "../appText";

type Props = TouchableOpacityProps & {
  name: string;
  variant?: "darkGray" | "white" |"primary" | "secondary" | "mediumP" | "mediumS" | "shortP" | "shortS" ;
};

export default function Button({ name, variant = "darkGray", ...rest }: Props) {

  const containerVariants = {
    darkGray: styles.darkGrayButton,
    white: styles.whiteButton,

    primary: styles.primaryContainer,
    secondary: styles.secondaryContainer,
    mediumP: styles.mediumPrimaryContainer,
    mediumS: styles.mediumSecondaryContainer,
    shortP: styles.shortPrimaryContainer,
    shortS: styles.shortSecondaryContainer,
  };

  const titleVariants = {
    darkGray: styles.darkGrayButtonText,
    white: styles.whiteButtonText,

    primary: styles.primaryTitle,
    secondary: styles.secondaryTitle,
    mediumP: styles.mediumPrimaryTitle,
    mediumS: styles.mediumSecondaryTitle,
    shortP: styles.shortPrimaryTitle,
    shortS: styles.shortSecondaryTitle,
  };

  return (
    <TouchableOpacity style={containerVariants[variant]} {...rest}>
      <AppText style={titleVariants[variant]}>{name}</AppText>
    </TouchableOpacity>
  );
}
