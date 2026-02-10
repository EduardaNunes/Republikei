import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "@/styles/colors";
import AppText from "../appText";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  placeholder?: string;
  options: SelectOption[];
  value: string;
  variant?: 'darkGray' | 'white';
  onSelect: (value: string) => void;
};

export default function SelectInput({ variant = 'darkGray', placeholder, options, value, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (itemValue: string) => {
    onSelect(itemValue);
    setModalVisible(false);
  };

    const containerVariants = {
      darkGray: styles.darkGrayContainer,
      white: styles.whiteContainer,
    };
  
    const textVariants = {
      darkGray: styles.darkGrayContainerText,
      white: styles.whiteContainerText,
    }

  return (
    <View style={containerVariants[variant]}>

      <TouchableOpacity 
        style={styles.flexRow}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <MaterialIcons 
          name="arrow-drop-down" 
          color={textVariants[variant].color}
          size={28} 
        />
        <AppText style={textVariants[variant]}>
          {selectedLabel || placeholder || "Selecione..."}
        </AppText>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.optionButton} 
                  onPress={() => handleSelect(item.value)}
                >
                  <AppText style={[
                    styles.optionText,
                    item.value === value && { color: colors.backgroundGreen, fontWeight: 'bold' }
                  ]}>
                    {item.label}
                  </AppText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setModalVisible(false)}
            >
              <AppText style={styles.cancelText}>Cancelar</AppText>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}