export interface Avaliacao {
  id: string;
  imovel_id: string;
  autor_id: string;
  nota: number;
  comentario?: string;
  created_at: string;
  autorNome?: string; 
}

export interface AvaliacaoResumo {
  media: number;
  total: number;
}