import { FlatList } from "react-native";
import { styles } from "./styles";
import { categories } from "@/utils/categories";
import { Category } from "@/components/category";
//import { useState } from "react";

type CategoriesProps = {
  selectedCategoryId: string;
  onCategorySelect: (id: string) => void;
}

export default function Categories({ selectedCategoryId, onCategorySelect }: CategoriesProps) {
  //const [selectedCategoryId, setSelectedCategoryId] = useState<string>("0"); 

  const handleSelect = (id: string) => {
    //setSelectedCategoryId(id); 
    onCategorySelect(id);
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
