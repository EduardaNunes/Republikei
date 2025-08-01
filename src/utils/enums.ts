import { tipoPadrao } from "./typesAux";

export const characteristics: tipoPadrao[] = [
  { id: "characteristics-animais", name: "Aceita Animais" },
  { id: "characteristics-fumantes", name: "Aceita Fumantes" },
  { id: "characteristics-piscina", name: "Com Piscina" },
  { id: "characteristics-quintal", name: "Com Quintal" },
  { id: "characteristics-luz", name: "Luz Inclusa" },
  { id: "characteristics-iptu", name: "IPTU Incluso" },
  { id: "characteristics-condominio", name: "Condomínio Incluso" },
  { id: "characteristics-agua", name: "Água Inclusa" },
  { id: "characteristics-gas", name: "Gás Incluso" },
  { id: "characteristics-internet", name: "Intenet Inclusa" },
  { id: "characteristics-limpeza", name: "Serviço de Limpeza Incluso" },
];

export const vacancyType: tipoPadrao[] = [
  { id: "vacancyType-masc", name: "Masculina" },
  { id: "vacancyType-fem", name: "Feminina" },
  { id: "vacancyType-mista", name: "Mista" },
];

export const furniture: tipoPadrao[] = [
  { id: "furniture-cama", name: "Cama" },
  { id: "furniture-fogao", name: "Fogão" },
  { id: "furniture-geladeira", name: "Geladeira" },
  { id: "furniture-armario", name: "Armário" },
  { id: "furniture-lavar_roupa", name: "Máquina de Lavar Roupa" },
  { id: "furniture-guarda_roupa", name: "Guarda Roupa" },
  { id: "furniture-microondas", name: "Microondas" },
  { id: "furniture-lavar_louca", name: "Máquina de Lavar Louça" },
  { id: "furniture-varal", name: "Varal" },
  { id: "furniture-mesa_estudos", name: "Mesa de Estudos" },
  { id: "furniture-air_fryer", name: "Air Fryer" },
  { id: "furniture-mesa_jantar", name: "Mesa de Jantar" },
  { id: "furniture-ar_condicionado", name: "Ar Condicionado" },
  { id: "furniture-colchao", name: "Colchão" },
  { id: "furniture-tv", name: "Televisão" },
];

export const housingType: tipoPadrao[] = [
  { id: "housingType-compartilhada", name: "Compartilhada" },
  { id: "housingType-completa", name: "Completa" },
];

export const completeHouseType: tipoPadrao[] = [
  { id: "completeHouseType-ape", name: "Apartamento" },
  { id: "completeHouseType-kitnet", name: "Kitnet" },
  { id: "completeHouseType-casa", name: "Casa" },
];

export const sharedHouseType: tipoPadrao[] = [
  { id: "sharedHouseType-republica", name: "República" },
  { id: "sharedHouseType-quarto", name: "Quarto" },
];

export const question: tipoPadrao[] = [
  { id: "question-sim", name: "Sim" },
  { id: "question-nao", name: "Não" },
];

export const ranking: tipoPadrao[] = [
  { id: "ranking-min", name: "Preço min" },
  { id: "ranking-max", name: "Preço max" },
];
