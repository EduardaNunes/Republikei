import { FlatList, Text } from "react-native";
import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";

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
