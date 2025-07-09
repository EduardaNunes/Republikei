import { Text } from "react-native";
import { styles } from "./styles";
import BottomContainer from "../bottomContainer";
import { SquareButton } from "../button";
import AppText from "../appText";

type PriceAndContactButtonProps = {
  price: number;
};

export default function PriceAndContactButton({
  price,
}: PriceAndContactButtonProps) {
  return (
    <BottomContainer backgroundColor="#fff" style={styles.container}>
      <AppText style={styles.priceText}>R$ {price}/mês</AppText>
      <SquareButton name="Mapa" variant="shortP" />
    </BottomContainer>
  );
}
