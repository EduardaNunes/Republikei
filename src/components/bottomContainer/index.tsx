import { View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

type BottomContainerProps = {
  children: React.ReactNode;
  backgroundColor?: string;
};

export default function BottomContainer({children, backgroundColor}: BottomContainerProps) {
  return (
    <View style={[
      styles.container, 
      { backgroundColor: backgroundColor || colors.orange[300] }
    ]}>
        {children}
    </View>
  );
}
