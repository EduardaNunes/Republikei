import { FlatList } from "react-native";
import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

// analisar se precisa de um contexto para saber qual vai ser clicado
// analisar se mais de um pode ser clicado ou não
export function Categories() {
  return (
    <>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Category
            name={item.name}
            icon={item.icon}
          />
        )}
        horizontal
        style={styles.container}
        contentContainerStyle={styles.content}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}
