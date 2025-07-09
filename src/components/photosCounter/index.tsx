import { Text, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";

type PhotosCounterProps = {
    total: number,
}

export default function PhotosCounter({total} : PhotosCounterProps) {
    const [count, setCount] = useState(1);
    // precisa adicionar a lógica de ir pra próxima foto e afins, deve precisar de um context

  return (
    <View style={styles.container}>
        <Text style={styles.text}>{count}/{total}</Text>
    </View>
  );
}
