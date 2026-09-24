import { Imovel } from "@/utils/Imovel";
import { SearchFilters } from "@/contexts/SearchContext";

// Quantidade de filtros avançados selecionados (cada característica conta 1).
export function countActiveFilters(filters: SearchFilters): number {
  return (
    (filters.vacancyType ? 1 : 0) +
    (filters.housingType ? 1 : 0) +
    filters.characteristics.length +
    (filters.isFurnished !== null ? 1 : 0) +
    (filters.ranking ? 1 : 0)
  );
}

// Aplica os filtros avançados em uma lista de imóveis já carregada.
// As regras são as mesmas que a antiga tela de resultados usava na consulta.
export function applySearchFilters<T extends Imovel>(posts: T[], filters: SearchFilters): T[] {
  let result = posts.filter((post) => {
    if (filters.vacancyType && post.tipoVaga !== filters.vacancyType.name) return false;
    if (filters.housingType && post.tipoMoradia !== filters.housingType.name) return false;
    if (filters.isFurnished !== null && post.mobiliado !== filters.isFurnished) return false;

    if (filters.characteristics.length > 0) {
      const postCharacteristics = post.caracteristicas ?? [];
      const hasAll = filters.characteristics.every((c) => postCharacteristics.includes(c.name));
      if (!hasAll) return false;
    }

    return true;
  });

  if (filters.ranking?.id === "ranking-min") {
    result = [...result].sort((a, b) => a.preco - b.preco);
  } else if (filters.ranking?.id === "ranking-max") {
    result = [...result].sort((a, b) => b.preco - a.preco);
  }

  return result;
}