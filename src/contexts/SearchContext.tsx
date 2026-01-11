import React, { createContext, useCallback, useState } from "react";
import { tipoPadrao } from "@/utils/typesAux";

export interface SearchFilters {
  vacancyType: tipoPadrao | null;
  housingType: tipoPadrao | null;
  characteristics: tipoPadrao[];
  isFurnished: boolean | null;
  ranking: tipoPadrao | null;
}

interface SearchContextData {
  filters: SearchFilters;
  updateFilters: (newData: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

export const SearchContext = createContext<SearchContextData>({} as SearchContextData);

export const INITIAL_SEARCH_STATE: SearchFilters = {
  vacancyType: null,
  housingType: null,
  characteristics: [],
  isFurnished: null,
  ranking: null,
};

export function SearchContextProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>(INITIAL_SEARCH_STATE);

  const updateFilters = useCallback((newData: Partial<SearchFilters>) => {
    setFilters((prev) => ({ ...prev, ...newData }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_SEARCH_STATE);
  }, []);

  return (
    <SearchContext.Provider value={{ filters, updateFilters, resetFilters }}>
      {children}
    </SearchContext.Provider>
  );
}