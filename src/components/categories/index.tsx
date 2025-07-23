import { FlatList } from "react-native";
import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";
import { useState } from "react";

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0"); 

  const handleSelect = (id: string) => {
    setSelectedCategoryId(id); 
  };

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          id={item.id}
          isSelected={item.id === selectedCategoryId}
          onPress={() => handleSelect(item.id)}
        />
      )}
      horizontal
      style={styles.container}
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    />
  );
}
