import { TextInput, TextInputProps, Text, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import AppText from "../appText";

type Props = TextInputProps & {
  title?: string;
  titleVariant?: "darkGray" | "white" | "green"
  variant?: "darkGray" | "primary" | "secondary";
  size?: "big" | "medium" | "small"
  containerStyle?: object;
  icon?: ComponentProps<typeof MaterialIcons>["name"]
};

export default function Input({ title, titleVariant = "darkGray", variant = "darkGray",size = "big", containerStyle = {}, icon, ...rest }: Props) {
  
  const containerVariants = {

    // Republikei
    darkGray: styles.darkGrayContainer,
    white: styles.whiteContainer,

    // Old
    primary: styles.primaryContainer,
    secondary: styles.secondaryContainer,
  };

  const containerSizeVariants = {
    big: styles.bigContainer,
    medium: styles.mediumContainer,
    small: styles.smallContainer
  }

  const textVariants = {
    // Republikei
    darkGray: styles.darkGrayContainerText,
    white: styles.whiteContainerText,

    darkGrayM: styles.darkGrayContainerText,

    // Old
    primary: styles.text,
    secondary: styles.text,
  }

  const placeholderTextVariants = {
    // Republikei
    darkGray: styles.darkGrayContainerPlaceholder,
    white: styles.whiteContainerPlaceholder,

    darkGrayM: styles.darkGrayContainerPlaceholder,

    // Old
    primary: styles.text,
    secondary: styles.text,
  }

  const titleVariants = {
    darkGray: styles.darkGrayTitleText,
    white: styles.whiteTitleText,
    green: styles.greenTitleText,
  }
  
  return (
    <View style={containerSizeVariants[size]}>
      {title && <AppText style={titleVariants[titleVariant]}>{title}</AppText>}
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
          placeholderTextColor={placeholderTextVariants[variant].color}
          {...rest}
        />
      </View>
    </View>
  );
}
