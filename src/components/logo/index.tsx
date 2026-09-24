import { View, Image } from "react-native";
import AppText from "@/components/appText";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

type LogoProps = {
  white?: boolean;
  size?: number;
};

export default function Logo({ white = false, size = 36 }: LogoProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mark,
          {
            width: size,
            height: size,
            borderRadius: size * 0.25,
            backgroundColor: white ? "rgba(255,255,255,0.22)" : colors.primary,
          },
        ]}
      >
        <Image source={require("@/assets/logo_icon.png")} style={styles.logo} />
      </View>
      <AppText style={[styles.name, white && styles.nameWhite]}>Republikei</AppText>
    </View>
  );
}