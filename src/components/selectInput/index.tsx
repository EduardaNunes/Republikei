import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "@/styles/colors";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  title: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onSelect: (value: string) => void;
};

export default function SelectInput({ title, placeholder, options, value, onSelect }: Props) {
  const [modalVisible, setModalVisible] = useState(false);

  // Encontra o label correspondente ao valor selecionado para exibir
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelect = (itemValue: string) => {
    onSelect(itemValue);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <TouchableOpacity 
        style={styles.inputContainer} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={selectedLabel ? styles.inputText : styles.placeholderText}>
          {selectedLabel || placeholder || "Selecione..."}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={colors.gray[800]} />
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
                  <Text style={[
                    styles.optionText,
                    item.value === value && { color: colors.orange[300], fontWeight: 'bold' }
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}