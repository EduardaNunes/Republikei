import { View, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { styles } from "../../components/styles/searchPage";
import AppText from "@/components/appText";
import SelectableBlock from "@/components/selectableBlock";
import {
  INITIAL_SEARCH_STATE,
  SearchContext,
  SearchFilters,
  SearchScope,
} from "@/contexts/SearchContext";
import { colors } from "@/styles/colors";
import { tipoPadrao } from "@/utils/typesAux";
import { countActiveFilters } from "@/utils/searchFilters";

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

// Página de filtros avançados. Não é mais uma aba: é aberta pelo ícone de filtro
// da home e dos favoritos, e o parâmetro "scope" diz de qual delas veio.
export default function SearchPage() {

  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { scope: scopeParam } = useLocalSearchParams<{ scope?: string }>();
  const scope: SearchScope = scopeParam === "favorites" ? "favorites" : "home";

  const { filters, applyFilters } = useContext(SearchContext);

  // Rascunho: só vira filtro de verdade ao tocar em "Aplicar".
  // Voltar sem aplicar descarta as mudanças.
  const [draft, setDraft] = useState<SearchFilters>(filters[scope]);

  // O SelectableBlock guarda a seleção internamente e só lê o initialState
  // quando ele existe. Mudar essa key força o bloco a recomeçar do zero.
  const [resetKey, setResetKey] = useState(0);

  const activeCount = countActiveFilters(draft);

  const furnishedInitialState: tipoPadrao | undefined =
    draft.isFurnished === null
      ? undefined
      : draft.isFurnished
        ? { id: "question-sim", name: "Sim" }
        : { id: "question-nao", name: "Não" };

  // ================================================================================ //
  //                                     HANDLERS
  // ================================================================================ //

  const updateDraft = (data: Partial<SearchFilters>) => {
    setDraft((prev) => ({ ...prev, ...data }));
  };

  const handleClear = () => {
    setDraft(INITIAL_SEARCH_STATE);
    setResetKey((prev) => prev + 1);
  };

  const handleApply = () => {
    applyFilters(scope, draft);
    router.back();
  };

  // ================================================================================ //
  //                                     FRONT-END
  // ================================================================================ //

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.roundButton} onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={24} color={colors.navy} />
          </TouchableOpacity>

          <View>
            <AppText style={styles.title}>Filtros</AppText>
            {activeCount > 0 && (
              <AppText style={styles.subtitle}>
                {activeCount} {activeCount === 1 ? "selecionado" : "selecionados"}
              </AppText>
            )}
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <FilterCard icon="people" title="Tipo de morador">
          <SelectableBlock
            key={`vacancy-${resetKey}`}
            type="vacancyType"
            initialState={draft.vacancyType || undefined}
            returnSelected={(val) => updateDraft({ vacancyType: val as tipoPadrao | null })}
          />
        </FilterCard>

        <FilterCard icon="home" title="Tipo de moradia">
          <SelectableBlock
            key={`housing-${resetKey}`}
            type="housingType"
            initialState={draft.housingType || undefined}
            returnSelected={(val) => updateDraft({ housingType: val as tipoPadrao | null })}
          />
        </FilterCard>

        <FilterCard icon="playlist-add-check" title="Características">
          <SelectableBlock
            key={`characteristics-${resetKey}`}
            type="characteristics"
            initialState={draft.characteristics}
            returnSelected={(val) => updateDraft({ characteristics: val as tipoPadrao[] })}
          />
        </FilterCard>

        <FilterCard icon="weekend" title="Mobiliado?">
          <SelectableBlock
            key={`furnished-${resetKey}`}
            type="question"
            initialState={furnishedInitialState}
            returnSelected={(val) => {
              const res = val as tipoPadrao | null;
              updateDraft({
                isFurnished: res?.id === "question-sim" ? true : res?.id === "question-nao" ? false : null,
              });
            }}
          />
        </FilterCard>

        <FilterCard icon="sort" title="Ordenar por">
          <SelectableBlock
            key={`ranking-${resetKey}`}
            type="ranking"
            initialState={draft.ranking || undefined}
            returnSelected={(val) => updateDraft({ ranking: val as tipoPadrao | null })}
          />
        </FilterCard>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={[styles.outlineButton, activeCount === 0 && styles.outlineButtonDisabled]}
          onPress={handleClear}
          disabled={activeCount === 0}
        >
          <AppText style={styles.outlineButtonText}>Limpar</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleApply}>
          <AppText style={styles.primaryButtonText}>Aplicar filtros</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
