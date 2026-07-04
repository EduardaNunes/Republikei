import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { styles } from "./styles";

type StarRatingProps = {
  rating: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: number;
};

export default function StarRating({
  rating,
  onChange = () => {},
  readOnly = false,
  size = 24,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <View style={styles.container}>
      {stars.map((value) => {
        const filled = value <= Math.round(rating);

        return (
          <TouchableOpacity
            key={value}
            disabled={readOnly}
            onPress={() => onChange(value)}
          >
            <MaterialIcons
              name={filled ? "star" : "star-border"}
              size={size}
              color={colors.backgroundGreen}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}