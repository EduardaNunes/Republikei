import { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { SelectableIten } from "../selectableIten";
import {
  vacancyType,
  characteristics,
  completeHouseType,
  furniture,
  housingType,
  question,
  sharedHouseType,
  ranking,
} from "@/utils/enums";

type SelectableBlockProps = {
  type:
    | "vacancyType"
    | "characteristics"
    | "furniture"
    | "housingType"
    | "completeHouseType"
    | "sharedHouseType"
    | "question"
    | "ranking";
};

const enumMap = {
  vacancyType,
  characteristics,
  furniture,
  housingType,
  completeHouseType,
  sharedHouseType,
  question,
  ranking,
};

const singleSelectTypes = [
  "question",
  "ranking",
  "housingType",
  "completeHouseType",
  "sharedHouseType",
  "vacancyType",
];

export default function SelectableBlock({ type }: SelectableBlockProps) {
  const isSingleSelect = singleSelectTypes.includes(type);

  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  const selectedEnum = enumMap[type];
  const data = Object.values(selectedEnum);

  const handleSelect = (itemId: string) => {
    if (isSingleSelect) {
      setSelectedSingle((current) => (current === itemId ? null : itemId));
    } else {
      setSelectedMultiple((current) => {
        if (current.includes(itemId)) {
          return current.filter((id) => id !== itemId);
        } else {
          return [...current, itemId];
        }
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        {data.map((item) => {
          const isSelected = isSingleSelect
            ? selectedSingle === item.id
            : selectedMultiple.includes(item.id);
          return (
            <SelectableIten
              key={item.id}
              isSelected={isSelected}
              text={item.name}
              onPress={() => handleSelect(item.id)}
            />
          );
        })}
      </View>
    </>
  );
}
