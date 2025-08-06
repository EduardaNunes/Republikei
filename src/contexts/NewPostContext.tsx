import { Localizacao, EspacoFisico, tipoPadrao } from "@/utils/typesAux";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';     

interface NewPostContextData {
  isSubmitting: boolean;
  submissionError: string | null;
  submissionSuccess: boolean;
  clearSubmissionError(): void;
  localizacao: Localizacao;
  espacoFisico: EspacoFisico;
  caracteristicas: tipoPadrao[];
  tipoVaga: tipoPadrao;
  mobiliado: boolean;
  moveisDisponiveis: tipoPadrao[];
  descricao: string;
  oculto: boolean;
  preco: number;
  imagens: string[];
  tipoMoradia: tipoPadrao;
  tipoMoradiaEspecifico: tipoPadrao;
  individual?: number;
  quantPessoasCasa?: number;
  quantQuartos?: number;
  addProperty1(localizacao: Localizacao): void;
  addProperty2(espacoFisico: EspacoFisico, quantPessoasCasa: number): void;
  addProperty3(
    caracteristicas: tipoPadrao[],
    tipoVaga: tipoPadrao,
    tipoMoradia: tipoPadrao,
    mobiliado: boolean
  ): void;
  addProperty4(
    tipoMoradiaEspecifico: tipoPadrao,
    quantPessoasCasa: number,
    quantQuartos: number,
    individual: number,
    moveisDisponiveis?: tipoPadrao[]
  ): void;
  addProperty5(
    descricao: string,
    preco: number,
    images: string[]
  ): void;
}

interface NewPostProviderProps {
  children: React.ReactNode;
}

const NewPostContext = createContext<NewPostContextData>(
  {} as NewPostContextData
);

function NewPostProvider({ children }: NewPostProviderProps) {
  const [localizacao, setLocalizacao] = useState<Localizacao>({
    cep: "",
    rua: "",
    bairro: "",
    numero: 0,
    complemento: "",
    latitude: 0,
    longitude: 0,
  });

  const [espacoFisico, setEspacoFisico] = useState<EspacoFisico>({
    salaEstar: 0,
    banheiro: 0,
    vagaGaragem: 0,
    cozinha: 0,
    salaJantar: 0,
    areaServico: 0,
    varanda: 0,
  });

  const [caracteristicas, setCaracteristicas] = useState<tipoPadrao[]>([]);
  const [tipoVaga, setTipoVaga] = useState<tipoPadrao>({ id: "", name: "" });
  const [mobiliado, setMobiliado] = useState<boolean>(false);
  const [moveisDisponiveis, setMoveisDisponiveis] = useState<tipoPadrao[]>([]);
  const [descricao, setDescricao] = useState<string>("");
  const [tipoMoradia, setTipoMoradia] = useState<tipoPadrao>({
    id: "",
    name: "",
  });
  const [tipoMoradiaEspecifico, setTipoMoradiaEspecifico] =
    useState<tipoPadrao>({
      id: "",
      name: "",
    });
  const [oculto, setOculto] = useState<boolean>(false);
  const [preco, setPreco] = useState<number>(0);
  const [individual, setIndividual] = useState<number>(0);
  const [quantPessoasCasa, setQuantPessoasCasa] = useState<number>(0);
  const [quantQuartos, setQuantQuartos] = useState<number>(0);
  const [imagens, setImagens] = useState<string[]>([]);

  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const addProperty1 = useCallback((localizacao: Localizacao) => {
    setLocalizacao(localizacao);
  }, []);

  const addProperty2 = useCallback((
    espacoFisico: EspacoFisico,
    quantPessoasCasa: number
  ) => {
    setQuantPessoasCasa(quantPessoasCasa);
    setEspacoFisico(espacoFisico);
  }, []);

  const addProperty3 = useCallback((
    caracteristicas: tipoPadrao[],
    tipoVaga: tipoPadrao,
    tipoMoradia: tipoPadrao,
    mobiliado: boolean
  ) => {
    setCaracteristicas(caracteristicas);
    setTipoMoradia(tipoMoradia);
    setTipoVaga(tipoVaga);
    setMobiliado(mobiliado);
  },[]);

  const addProperty4 = useCallback((
    tipoMoradiaEspecifico: tipoPadrao,
    quantPessoasCasa: number,
    quantQuartos: number,
    individual: number,
    moveisDisponiveis?: tipoPadrao[]
  ) => {
    setTipoMoradiaEspecifico(tipoMoradiaEspecifico);
    setQuantPessoasCasa(quantPessoasCasa);
    setQuantQuartos(quantQuartos);
    setIndividual(individual);
    moveisDisponiveis ? setMoveisDisponiveis(moveisDisponiveis) : "";
  }, []);

  const addProperty5 = useCallback((descricao: string, preco: number, images: string[]) => {
    setDescricao(descricao);
    setPreco(preco);
    setImagens(images);
    setIsReadyToSubmit(true);
  }, []);

  const clearSubmissionError = useCallback(() => {
    setSubmissionError(null);
  }, []);

  useEffect(() => {
    const executeSubmit = async () => {

      if (!isReadyToSubmit) return;

      setIsSubmitting(true);
      setSubmissionError(null);
      setSubmissionSuccess(false);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado.");

        // Lógica de upload das imagens
        const uploadedImageUrls = [];
        for (const localUri of imagens) {
          
          const fileName = `imovel-${user.id}-${new Date().getTime()}.jpg`;

          const base64 = await FileSystem.readAsStringAsync(localUri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          const { error: uploadError } = await supabase.storage
            .from('imoveis-imagens')
            .upload(fileName, decode(base64), { 
              contentType: 'image/jpeg' 
          });

          if (uploadError) throw uploadError;

          const { data } = supabase.storage.from('imoveis-imagens').getPublicUrl(fileName);
          uploadedImageUrls.push(data.publicUrl);
        }

        const novoImovel = {

          // Dados da Etapa 1
          cep: localizacao.cep,
          rua: localizacao.rua,
          bairro: localizacao.bairro,
          numero: localizacao.numero,
          complemento: localizacao.complemento,
          latitude: localizacao.latitude,
          longitude: localizacao.longitude,
          
          // Dados da Etapa 2
          num_salaEstar: espacoFisico.salaEstar,
          num_banheiro: espacoFisico.banheiro,
          num_garagem: espacoFisico.vagaGaragem,
          num_cozinha: espacoFisico.cozinha,
          num_salaJantar: espacoFisico.salaJantar,
          num_areaServico: espacoFisico.areaServico,
          num_varanda: espacoFisico.varanda,

          // Dados da Etapa 3
          caracteristicas: caracteristicas.map(c => c.name),
          tipoVaga: tipoVaga.name,
          tipoMoradia: tipoMoradia.name,
          mobiliado: mobiliado,

          // Dados da Etapa 4
          tipoMoradiaEspecifico: tipoMoradiaEspecifico.name,
          num_pessoasCasa: quantPessoasCasa,
          num_quartos: quantQuartos,
          num_pessoasQuarto: individual,
          moveisDisponiveis: moveisDisponiveis.map(m => m.name),


          // Dados da Etapa 5
          descricao: descricao,
          preco: preco,
          imagens: uploadedImageUrls,

          oculto: oculto,

          // Chave estrangeira
          proprietario: user.id,
        };

        const { error } = await supabase.from('Imoveis').insert([novoImovel]);
        if (error) throw error;

        setSubmissionSuccess(true);

      } catch(error: any) {
        setSubmissionError(error.message || "Ocorreu um erro desconhecido.");
      } finally {
        setIsSubmitting(false);
        setIsReadyToSubmit(false);
      }
    };

    executeSubmit();
  }, [isReadyToSubmit]);

  return (
    <NewPostContext.Provider
      value={{
        isSubmitting,
        submissionError,
        submissionSuccess,
        localizacao,
        espacoFisico,
        caracteristicas,
        tipoVaga,
        mobiliado,
        moveisDisponiveis,
        descricao,
        oculto,
        preco,
        imagens,
        individual,
        quantPessoasCasa,
        tipoMoradia,
        tipoMoradiaEspecifico,
        quantQuartos,
        addProperty1,
        addProperty2,
        addProperty3,
        addProperty4,
        addProperty5,
        clearSubmissionError,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}

export { NewPostContext, NewPostProvider };
