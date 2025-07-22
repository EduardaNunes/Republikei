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
  type?:
    | "vacancyType"
    | "characteristics"
    | "furniture"
    | "housingType"
    | "completeHouseType"
    | "sharedHouseType"
    | "question"
    | "ranking";
  returnSelected?: (item: string | string[]) => void;
  readOnly?: boolean;
  objects?: {
    id: string;
    name: string;
  }[];
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

export default function SelectableBlock({
  type = "question",
  returnSelected = () => {},
  readOnly = false,
  objects,
}: SelectableBlockProps) {
  const isSingleSelect = singleSelectTypes.includes(type);

  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  const selectedEnum = enumMap[type];
  const data = readOnly && objects ? objects : Object.values(selectedEnum);

  const handleSelect = (itemId: string) => {
    if (isSingleSelect) {
      const singleAux = selectedSingle === itemId ? "" : itemId;

      setSelectedSingle(singleAux);
      returnSelected(singleAux);
    } else {
      let multipleAux: string[];

      if (selectedMultiple.includes(itemId)) {
        multipleAux = selectedMultiple.filter((id) => id !== itemId);
      } else {
        multipleAux = [...selectedMultiple, itemId];
      }

      setSelectedMultiple(multipleAux);
      returnSelected(multipleAux);
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
              isSelected={readOnly ? false : isSelected}
              text={item.name}
              onPress={() => handleSelect(item.id)}
            />
          );
        })}
      </View>
    </>
  );
}
