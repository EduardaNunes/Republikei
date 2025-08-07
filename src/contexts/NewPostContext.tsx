import { Localizacao, EspacoFisico, tipoPadrao } from "@/utils/typesAux";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';     
import { Imovel } from "@/utils/Imovel";
import { housingType, vacancyType, characteristics, furniture, completeHouseType,sharedHouseType } from '@/utils/enums';

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
  propertyIdForEdit: string | null;
  loadPropertyForEdit(property: Imovel): void;
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

  const [propertyIdForEdit, setPropertyIdForEdit] = useState<string | null>(null);    

  const loadPropertyForEdit = useCallback((property: Imovel) => {
    // Preenche os estados com os dados do imóvel a ser editado
    setPropertyIdForEdit(property.id)

    setLocalizacao({
      cep: property.cep,
      rua: property.rua,
      bairro: property.bairro,
      numero: property.numero,
      complemento: property.complemento,
      latitude: property.latitude,
      longitude: property.longitude,
    });

    setEspacoFisico({
      salaEstar: property.num_salaEstar,
      banheiro: property.num_banheiro,
      vagaGaragem: property.num_garagem,
      cozinha: property.num_cozinha,
      salaJantar: property.num_salaJantar,
      areaServico: property.num_areaServico,
      varanda: property.num_varanda,
    });
    
    setMobiliado(property.mobiliado);

    // Procura no array 'housingType' o objeto cujo 'name' corresponde ao que foi salvo no DB
    const tipoMoradiaObj = housingType.find(h => h.name === property.tipoMoradia) || { id: "", name: "" };
    setTipoMoradia(tipoMoradiaObj);

    const tipoVagaObj = vacancyType.find(v => v.name === property.tipoVaga) || { id: "", name: "" };
    setTipoVaga(tipoVagaObj);

    // O tipoMoradiaEspecifico pode vir de duas listas diferentes, então precisamos de uma lógica extra
    const tipoEspecificoObj = 
    [...completeHouseType, ...sharedHouseType].find(t => t.name === property.tipoMoradiaEspecifico) || { id: "", name: "" };
  setTipoMoradiaEspecifico(tipoEspecificoObj);

    const caracteristicasObj = property.caracteristicas
      ?.map(name => characteristics.find(c => c.name === name))
      .filter(Boolean) as tipoPadrao[] || [];
    setCaracteristicas(caracteristicasObj);

    const moveisDisponiveisObj = property.moveisDisponiveis
      ?.map(name => furniture.find(f => f.name === name))
      .filter(Boolean) as tipoPadrao[] || [];
    setMoveisDisponiveis(moveisDisponiveisObj);
  
    
    //setTipoVaga({ id: property.tipoVaga, name: property.tipoVaga });

    setQuantPessoasCasa(property.num_pessoasCasa);
    setQuantQuartos(property.num_quartos); 
    setIndividual(property.num_pessoasQuarto); 

    setDescricao(property.descricao || '');
    setPreco(property.preco);
    setImagens(property.imagens || []); 
    setOculto(property.oculto);

  }, []);

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
    const executeSubmit = async (propertyId?: string) => {

      if (!isReadyToSubmit) return;

      setIsSubmitting(true);
      setSubmissionError(null);
      setSubmissionSuccess(false);

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Usuário não autenticado.");

        // Lógica de upload das imagens
        const uploadedImageUrls = [];
        for (const uri of imagens) {
          // Se a URI já é uma URL pública, apenas a mantenha
          if (uri.startsWith('http')) {
            uploadedImageUrls.push(uri);
          } else {
            // Se for uma URI local (file://), faça o upload
            const fileName = `imovel-${user.id}-${new Date().getTime()}.jpg`;
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
            
            const { error: uploadError } = await supabase.storage
              .from('imoveis-imagens')
              .upload(fileName, decode(base64), { contentType: 'image/jpeg' });
            
            if (uploadError) throw uploadError;
            
            const { data } = supabase.storage.from('imoveis-imagens').getPublicUrl(fileName);
            uploadedImageUrls.push(data.publicUrl);
          }
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

        let error;

        if (propertyIdForEdit) {

          console.log("ATUALIZANDO IMÓVEL EXISTENTE:", propertyIdForEdit);
          const { error: updateError } = await supabase
            .from('Imoveis')
            .update(novoImovel)
            .eq('id', propertyIdForEdit);
          error = updateError;
        } else {
          // MODO CRIAÇÃO: faz um INSERT
          console.log("CRIANDO NOVO IMÓVEL");
          const { error: insertError } = await supabase
            .from('Imoveis')
            .insert([novoImovel]);
          error = insertError;
        }

        if (error) throw error;
        setSubmissionSuccess(true);

      } catch (error: any) {
        setSubmissionError(error.message || "Ocorreu um erro.");
      } finally {
        setIsSubmitting(false);
        setIsReadyToSubmit(false);
      }
    };

      executeSubmit()
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
        propertyIdForEdit,
        loadPropertyForEdit,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}

export { NewPostContext, NewPostProvider };
