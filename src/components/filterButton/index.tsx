import { TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AppText from "@/components/appText";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type FilterButtonProps = {
  activeCount?: number;
  onPress: () => void;
};

export default function FilterButton({ activeCount = 0, onPress }: FilterButtonProps) {
  const isActive = activeCount > 0;

  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.containerActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name="tune" size={20} color={isActive ? colors.white : colors.navy} />
      {isActive && (
        <View style={styles.badge}>
          <AppText style={styles.badgeText}>{activeCount}</AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}
