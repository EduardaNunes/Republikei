import { colors } from "@/styles/colors";
import { Text as RNText, TextProps } from "react-native";

export function Text(props: TextProps) {
  return <RNText {...props} style={[{ fontFamily: "Montserrat_400Regular" }, {color:colors.gray[100]}, props.style]} />;
}
