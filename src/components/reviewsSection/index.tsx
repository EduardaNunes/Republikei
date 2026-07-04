import { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import AppText from "@/components/appText";
import StarRating from "@/components/starRating";
import ReviewCard from "@/components/reviewCard";
import Input from "@/components/input";
import SquareButton from "@/components/button";
import { avaliacaoPresenter } from "@/presenter/avaliacaoPresenter";
import { Avaliacao } from "@/utils/avaliacao";
import { supabase } from "@/lib/supabase";
import { styles } from "./styles";

type ReviewsSectionProps = {
  imovelId: string;
  isOwner: boolean; // dono do imóvel não pode avaliar o próprio imóvel
};

export default function ReviewsSection({ imovelId, isOwner }: ReviewsSectionProps) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [notaSelecionada, setNotaSelecionada] = useState(0);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);

  const fetchAvaliacoes = useCallback(async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);

      const lista = await avaliacaoPresenter.getAvaliacoesByImovel(imovelId);
      setAvaliacoes(lista);

      if (user) {
        const minha = avaliacaoPresenter.getAvaliacaoDoUsuario(lista, user.id);
        if (minha) {
          setNotaSelecionada(minha.nota);
          setComentario(minha.comentario || "");
        }
      }
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível carregar as avaliações.");
    } finally {
      setLoading(false);
    }
  }, [imovelId]);

  useEffect(() => {
    fetchAvaliacoes();
  }, [fetchAvaliacoes]);

  const minhaAvaliacao = avaliacaoPresenter.getAvaliacaoDoUsuario(avaliacoes, userId);
  const resumo = avaliacaoPresenter.getResumoAvaliacoes(avaliacoes);

  const handleEnviar = async () => {
    if (notaSelecionada === 0) {
      Alert.alert("Nota obrigatória", "Selecione de 1 a 5 estrelas.");
      return;
    }

    setEnviando(true);
    try {
      await avaliacaoPresenter.submitAvaliacao({
        imovelId,
        autorId: userId,
        nota: notaSelecionada,
        comentario,
        avaliacaoExistenteId: minhaAvaliacao?.id,
      });
      await fetchAvaliacoes();
      Alert.alert("Sucesso", "Avaliação enviada!");
    } catch (error: any) {
      Alert.alert("Erro", "Não foi possível enviar sua avaliação.");
    } finally {
      setEnviando(false);
    }
  };

const handleApagar = () => {
  if (!minhaAvaliacao) return;

  Alert.alert(
    "Apagar avaliação",
    "Tem certeza que deseja remover sua avaliação?",
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        style: "destructive",
        onPress: async () => {
          try {
            await avaliacaoPresenter.deleteAvaliacao(minhaAvaliacao.id);
            setNotaSelecionada(0);
            setComentario("");
            await fetchAvaliacoes();
          } catch (error) {
            Alert.alert("Erro", "Não foi possível apagar a avaliação.");
          }
        },
      },
    ]
  );
};

  return (
    <View style={styles.container}>
      <View style={styles.resumoContainer}>
        <StarRating rating={resumo.media} readOnly />

        {resumo.total > 0 ? (
          <View style={styles.resumoLinha}>
            <AppText style={styles.resumoMedia}>{resumo.media.toFixed(1)} de 5</AppText>
            <AppText style={styles.resumoTotal}>
              {resumo.total} {resumo.total === 1 ? "avaliação" : "avaliações"}
            </AppText>
          </View>
        ) : (
          <AppText style={styles.resumoTexto}>Ainda sem avaliações</AppText>
        )}
      </View>

      {!isOwner && userId && (
        <View style={styles.formContainer}>
          <AppText style={styles.formTitulo}>
            {minhaAvaliacao ? "Editar sua avaliação" : "Deixe sua avaliação"}
          </AppText>
          <StarRating rating={notaSelecionada} onChange={setNotaSelecionada} size={30} />
          <Input
            placeholder="Comentário (opcional)"
            value={comentario}
            onChangeText={setComentario}
            multiline
          />
          <View style={{ flexDirection: "row", gap: 10 }}>
            <SquareButton
              name={minhaAvaliacao ? "Atualizar" : "Enviar"}
              variant="greenS"
              disabled={enviando}
              onPress={handleEnviar}
            />
            {minhaAvaliacao && (
              <SquareButton
                name="Apagar"
                variant="darkGrayS"
                onPress={handleApagar}
              />
            )}
          </View>
        </View>
      )}

      <View style={styles.listaContainer}>
        {avaliacoes.map((item) => (
          <ReviewCard key={item.id} avaliacao={item} />
        ))}
      </View>
    </View>
  );
}