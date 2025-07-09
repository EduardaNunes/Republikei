import { Text } from "react-native";
import { styles } from "./styles";
import BottomContainer from "../bottomContainer";
import { SquareButton } from "../button";

type PriceAndContactButtonProps = {
  price: number;
};

export default function PriceAndContactButton({
  price,
}: PriceAndContactButtonProps) {
  return (
    <BottomContainer backgroundColor="#fff" style={styles.container}>
      <Text style={styles.priceText}>R$ {price}/mês</Text>
      <SquareButton name="Mapa" variant="shortP" />
    </BottomContainer>
  );
}
