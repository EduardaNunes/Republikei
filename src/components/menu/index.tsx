import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import BottomContainer from "../bottomContainer";

// precisa adicionar as rotas do menu depois
export default function Menu() {
  return (
    <BottomContainer style={styles.container}>
      <MaterialIcons name="search" size={32} color={"#fff"} />
      <MaterialIcons name="favorite" size={32} color={"#fff"} />
      <MaterialIcons name="map" size={32} color={"#fff"} />
      <MaterialIcons name="person" size={32} color={"#fff"} />
    </BottomContainer>
  );
}
