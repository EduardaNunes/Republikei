import { MaterialIcons } from "@expo/vector-icons";

type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: "1", name: "República"  },
  { id: "2", name: "Apartamento"},
  { id: "3", name: "Kitnet" },
  { id: "4", name: "Quarto" },
  { id: "5", name: "Casa" },
];
