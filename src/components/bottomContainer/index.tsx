import { View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

type BottomContainerProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  style?: object;
};

export default function BottomContainer({children, backgroundColor, style}: BottomContainerProps) {
  return (
    <View style={[
      styles.container,
      style,
      { backgroundColor: backgroundColor || colors.orange[300] }
    ]}>
        {children}
    </View>
  );
}
