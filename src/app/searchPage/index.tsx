import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { styles } from "../../components/styles/searchPage";
import AppText from "@/components/appText";
import Logo from "@/components/logo";
import NavigationBar from "@/components/navigationBar";
import SelectableBlock from "@/components/selectableBlock";
import { SearchContext } from "@/contexts/SearchContext";
import { colors } from "@/styles/colors";
import { tipoPadrao } from "@/utils/typesAux";

type IconName = keyof typeof MaterialIcons.glyphMap;

// ================================================================================ //
//                                    FILTER CARD
// ================================================================================ //

function FilterCard({ icon, title, children }: { icon: IconName; title: string; children: React.ReactNode }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <MaterialIcons name={icon} size={18} color={colors.primary} />
        </View>
        <AppText style={styles.cardTitle}>{title}</AppText>
      </View>
      {children}
    </View>
  );
}

// ================================================================================ //
//                                       SCREEN
// ================================================================================ //

export default function SearchPage() {

  const router = useRouter();
  const { filters, updateFilters, resetFilters } = useContext(SearchContext);

  // O SelectableBlock guarda a seleção internamente e só lê o initialState
  // quando ele existe. Mudar essa key força o bloco a recomeçar do zero.
  const [resetKey, setResetKey] = useState(0);

  const activeCount =
    (filters.vacancyType ? 1 : 0) +
    (filters.housingType ? 1 : 0) +
    filters.characteristics.length +
    (filters.isFurnished !== null ? 1 : 0) +
    (filters.ranking ? 1 : 0);

  const furnishedInitialState: tipoPadrao | undefined =
    filters.isFurnished === null
      ? undefined
      : filters.isFurnished
        ? { id: "question-sim", name: "Sim" }
        : { id: "question-nao", name: "Não" };

  // ================================================================================ //
  //                                     HANDLERS
  // ================================================================================ //

  const handleClear = () => {
    resetFilters();
    setResetKey((prev) => prev + 1);
  };

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Logo />
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.push("/chatHub")}>
              <MaterialIcons name="chat-bubble-outline" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
            {/* TODO: apontar para a tela de notificações quando existir */}
            <TouchableOpacity style={styles.iconButton}>
              <MaterialIcons name="notifications-none" size={20} color={colors.navy} />
              <View style={styles.iconDot} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeaderRow}>
          <AppText style={styles.sectionTitle}>Filtros</AppText>
          {activeCount > 0 && (
            <AppText style={styles.sectionCount}>
              {activeCount} {activeCount === 1 ? "selecionado" : "selecionados"}
            </AppText>
          )}
        </View>

        <FilterCard icon="people" title="Tipo de morador">
          <SelectableBlock
            key={`vacancy-${resetKey}`}
            type="vacancyType"
            initialState={filters.vacancyType || undefined}
            returnSelected={(val) => updateFilters({ vacancyType: val as tipoPadrao | null })}
          />
        </FilterCard>

        <FilterCard icon="home" title="Tipo de moradia">
          <SelectableBlock
            key={`housing-${resetKey}`}
            type="housingType"
            initialState={filters.housingType || undefined}
            returnSelected={(val) => updateFilters({ housingType: val as tipoPadrao | null })}
          />
        </FilterCard>

        <FilterCard icon="playlist-add-check" title="Características">
          <SelectableBlock
            key={`characteristics-${resetKey}`}
            type="characteristics"
            initialState={filters.characteristics}
            returnSelected={(val) => updateFilters({ characteristics: val as tipoPadrao[] })}
          />
        </FilterCard>

        <FilterCard icon="weekend" title="Mobiliado?">
          <SelectableBlock
            key={`furnished-${resetKey}`}
            type="question"
            initialState={furnishedInitialState}
            returnSelected={(val) => {
              const res = val as tipoPadrao | null;
              updateFilters({
                isFurnished: res?.id === "question-sim" ? true : res?.id === "question-nao" ? false : null,
              });
            }}
          />
        </FilterCard>

        <FilterCard icon="sort" title="Ordenar por">
          <SelectableBlock
            key={`ranking-${resetKey}`}
            type="ranking"
            initialState={filters.ranking || undefined}
            returnSelected={(val) => updateFilters({ ranking: val as tipoPadrao | null })}
          />
        </FilterCard>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={[styles.outlineButton, activeCount === 0 && styles.outlineButtonDisabled]}
            onPress={handleClear}
            disabled={activeCount === 0}
          >
            <AppText style={styles.outlineButtonText}>Limpar</AppText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/searchResult")}>
            <MaterialIcons name="search" size={20} color={colors.white} />
            <AppText style={styles.primaryButtonText}>Pesquisar</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <NavigationBar />
    </View>
  );
}
