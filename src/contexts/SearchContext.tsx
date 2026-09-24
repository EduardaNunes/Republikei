import React, { createContext, useCallback, useState } from "react";
import { tipoPadrao } from "@/utils/typesAux";

// Cada tela que usa filtros avançados tem o seu próprio conjunto de filtros,
// assim como os filtros rápidos de categoria.
export type SearchScope = "home" | "favorites";

export interface SearchFilters {
  vacancyType: tipoPadrao | null;
  housingType: tipoPadrao | null;
  characteristics: tipoPadrao[];
  isFurnished: boolean | null;
  ranking: tipoPadrao | null;
}

type FiltersByScope = Record<SearchScope, SearchFilters>;

interface SearchContextData {
  filters: FiltersByScope;
  applyFilters: (scope: SearchScope, newFilters: SearchFilters) => void;
  resetFilters: (scope: SearchScope) => void;
}

export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const INITIAL_SEARCH_STATE: SearchFilters = {
  vacancyType: null,
  housingType: null,
  characteristics: [],
  isFurnished: null,
  ranking: null,
};

const INITIAL_FILTERS_BY_SCOPE: FiltersByScope = {
  home: INITIAL_SEARCH_STATE,
  favorites: INITIAL_SEARCH_STATE,
};

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FiltersByScope>(INITIAL_FILTERS_BY_SCOPE);

  const applyFilters = useCallback((scope: SearchScope, newFilters: SearchFilters) => {
    setFilters((prev) => ({ ...prev, [scope]: newFilters }));
  }, []);

  const resetFilters = useCallback((scope: SearchScope) => {
    setFilters((prev) => ({ ...prev, [scope]: INITIAL_SEARCH_STATE }));
  }, []);

  return (
    <SearchContext.Provider value={{ filters, applyFilters, resetFilters }}>
      {children}
    </SearchContext.Provider>
  );
}
