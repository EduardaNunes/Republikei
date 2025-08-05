interface Localizacao {
  cep: string;
  rua: string;
  bairro: string;
  numero: number;
  complemento?: string;
  latitude: number,
  longitude: number,
}

interface EspacoFisico {
  salaEstar: number;
  banheiro: number;
  vagaGaragem: number;
  cozinha: number;
  salaJantar: number;
  areaServico: number;
  varanda: number;
}

type tipoPadrao = {
  id: string;
  name: string;
};

export {EspacoFisico, Localizacao, tipoPadrao}