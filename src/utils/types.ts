import { Localizacao, EspacoFisico, tipoPadrao } from "./typesAux";

// O estado único do seu formulário
export interface PropertyFormData {
  localizacao: Localizacao;
  espacoFisico: EspacoFisico;
  caracteristicas: tipoPadrao[];
  tipoVaga: tipoPadrao;
  tipoMoradia: tipoPadrao;
  tipoMoradiaEspecifico: tipoPadrao;
  mobiliado: boolean;
  moveisDisponiveis: tipoPadrao[];
  quantPessoasCasa: number;
  quantQuartos: number;
  individual: number;
  descricao: string;
  preco: number;
  imagens: string[]; // Aqui guardamos URIs locais ou URLs remotas
  oculto: boolean;
}

// Estado inicial para limpar o formulário
export const INITIAL_FORM_DATA: PropertyFormData = {
  localizacao: { cep: "", rua: "", bairro: "", numero: 0, complemento: "", latitude: 0, longitude: 0 },
  espacoFisico: { salaEstar: 0, banheiro: 0, vagaGaragem: 0, cozinha: 0, salaJantar: 0, areaServico: 0, varanda: 0 },
  caracteristicas: [],
  tipoVaga: { id: "", name: "" },
  tipoMoradia: { id: "", name: "" },
  tipoMoradiaEspecifico: { id: "", name: "" },
  mobiliado: false,
  moveisDisponiveis: [],
  quantPessoasCasa: 0,
  quantQuartos: 0,
  individual: 0,
  descricao: "",
  preco: 0,
  imagens: [],
  oculto: false,
};