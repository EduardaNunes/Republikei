import { View, Text } from "react-native";
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
} from "@/utils/enums";

type SelectableBlockProps = {
  type:
    | "vacancyType"
    | "characteristics"
    | "furniture"
    | "housingType"
    | "completeHouseType"
    | "sharedHouseType"
    | "question";
};

const enumMap = {
  vacancyType,
  characteristics,
  furniture,
  housingType,
  completeHouseType,
  sharedHouseType,
  question,
};

export default function SelectableBlock({ type }: SelectableBlockProps) {
  const selectedEnum = enumMap[type];
  const data = Object.values(selectedEnum);

  return (
    <>
      <View style={styles.container}>
        {data.map((item) => (
            <SelectableIten key={item.id} text={item.name}/>
        ))}
      </View>
    </>
  );
}
