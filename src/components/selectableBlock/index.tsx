import { useState, useEffect } from "react";
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
import { tipoPadrao } from "@/utils/typesAux";

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
  returnSelected?: (item: tipoPadrao | tipoPadrao[] | null) => void;
  readOnly?: boolean;
  objects?: tipoPadrao[];
  initialState?: tipoPadrao | tipoPadrao[];
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
  initialState
}: SelectableBlockProps) {
  const isSingleSelect = singleSelectTypes.includes(type);

  const [selectedSingle, setSelectedSingle] = useState<tipoPadrao | null>(
    () => {
      if (isSingleSelect && initialState) {
        return initialState as tipoPadrao;
      }
      return null;
    }
  );

  const [selectedMultiple, setSelectedMultiple] = useState<tipoPadrao[]>(
    () => {
      if (!isSingleSelect && initialState) {
        return initialState as tipoPadrao[];
      }
      return [];
    }
  );

  useEffect(() => {
    // Se um estado inicial for fornecido (modo edição)...
    if (initialState) {
      if (isSingleSelect && initialState.constructor !== Array) {
        // ...e for seleção única, defina o selectedSingle
        setSelectedSingle(initialState as tipoPadrao);
      } else if (!isSingleSelect && Array.isArray(initialState)) {
        // ...e for seleção múltipla, defina o selectedMultiple
        setSelectedMultiple(initialState as tipoPadrao[]);
      }
    }
  }, [initialState, isSingleSelect]);

  const selectedEnum = enumMap[type];
  const data = readOnly && objects ? objects : Object.values(selectedEnum);


  const handleSelect = (item: tipoPadrao) => {
    if (isSingleSelect) {
      const singleAux = selectedSingle?.id === item.id ? null : item;

      setSelectedSingle(singleAux);
      returnSelected(singleAux);
    } else {
      let multipleAux: tipoPadrao[];

      const isAlreadySelected = selectedMultiple.some(
        (selectedItem) => selectedItem.id === item.id
      );

      if (isAlreadySelected) {
        multipleAux = selectedMultiple.filter(
          (selectedItem) => selectedItem.id !== item.id
        );
      } else {
        multipleAux = [...selectedMultiple, item];
      }

      setSelectedMultiple(multipleAux);
      returnSelected(multipleAux);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item) => {
        // A lógica para determinar se um item está selecionado está aqui.
        const isSelected = isSingleSelect
          ? selectedSingle?.id === item.id
          : selectedMultiple.some(
              (selectedItem) => selectedItem.id === item.id
            );

        return (
          <SelectableIten
            key={item.id}
            isSelected={isSelected} // Usa a variável 'isSelected' calculada
            text={item.name}
            // Desabilita o clique se estiver no modo readOnly
            onPress={() => (readOnly ? {} : handleSelect(item))}
          />
        );
      })}
    </View>
  );
}
