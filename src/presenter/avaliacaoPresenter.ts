import { supabase } from "@/lib/supabase";
import { Avaliacao, AvaliacaoResumo } from "@/utils/avaliacao";

export const avaliacaoPresenter = {

  // ============================================================ //
  //                        BUSCAR AVALIAÇÕES
  // ============================================================ //

    getAvaliacoesByImovel: async (imovelId: string): Promise<Avaliacao[]> => {
        const { data: avaliacoes, error: avaliacoesError } = await supabase
            .from("Avaliacoes")
            .select("id, imovel_id, autor_id, nota, comentario, created_at")
            .eq("imovel_id", imovelId)
            .order("created_at", { ascending: false });

        if (avaliacoesError) throw avaliacoesError;
        if (!avaliacoes || avaliacoes.length === 0) return [];

        const autorIds = [...new Set(avaliacoes.map((item) => item.autor_id))];

        const { data: usuarios, error: usuariosError } = await supabase
            .from("Users")
            .select("id, name")
            .in("id", autorIds);

        if (usuariosError) throw usuariosError;

        const nomesPorId = new Map(
            (usuarios || []).map((usuario) => [usuario.id, usuario.name])
        );

        return avaliacoes.map((item) => ({
            ...item,
            autorNome: nomesPorId.get(item.autor_id) || "Usuário",
        }));
    },

    getResumoAvaliacoes: (avaliacoes: Avaliacao[]): AvaliacaoResumo => {
        const total = avaliacoes.length;
        if (total === 0) return { media: 0, total: 0 };

        const soma = avaliacoes.reduce((acc, item) => acc + item.nota, 0);
        return { media: soma / total, total };
    },

    getMediaAvaliacoesPorImoveis: async (
        imovelIds: string[]
        ): Promise<Map<string, AvaliacaoResumo>> => {
        if (imovelIds.length === 0) return new Map();

        const { data, error } = await supabase
            .from("Avaliacoes")
            .select("imovel_id, nota")
            .in("imovel_id", imovelIds);

        if (error) throw error;

        const notasPorImovel = new Map<string, number[]>();
        (data || []).forEach((item) => {
            const notas = notasPorImovel.get(item.imovel_id) || [];
            notas.push(item.nota);
            notasPorImovel.set(item.imovel_id, notas);
        });

        const resultado = new Map<string, AvaliacaoResumo>();
        notasPorImovel.forEach((notas, imovelId) => {
            const soma = notas.reduce((acc, nota) => acc + nota, 0);
            resultado.set(imovelId, { media: soma / notas.length, total: notas.length });
        });

        return resultado;
    },

  // ============================================================ //
  //                    VERIFICAR SE JÁ AVALIOU
  // ============================================================ //

  getAvaliacaoDoUsuario: (
    avaliacoes: Avaliacao[],
    userId: string
  ): Avaliacao | undefined => {
    return avaliacoes.find((item) => item.autor_id === userId);
  },

  // ============================================================ //
  //                       CRIAR / EDITAR / APAGAR
  // ============================================================ //

  submitAvaliacao: async (params: {
    imovelId: string;
    autorId: string;
    nota: number;
    comentario?: string;
    avaliacaoExistenteId?: string;
  }) => {
    const { imovelId, autorId, nota, comentario, avaliacaoExistenteId } = params;

    if (avaliacaoExistenteId) {
      const { error } = await supabase
        .from("Avaliacoes")
        .update({ nota, comentario })
        .eq("id", avaliacaoExistenteId);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("Avaliacoes")
        .insert([{ imovel_id: imovelId, autor_id: autorId, nota, comentario }]);
      if (error) throw error;
    }
  },

  deleteAvaliacao: async (avaliacaoId: string) => {
    const { error } = await supabase
      .from("Avaliacoes")
      .delete()
      .eq("id", avaliacaoId);
    if (error) throw error;
  },
};