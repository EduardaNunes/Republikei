import { Localizacao, EspacoFisico, tipoPadrao } from "@/utils/typesAux";
import React, { createContext, useState } from "react";
import { ImageSourcePropType } from "react-native";

interface NewPostContextData {
  localizacao: Localizacao;
  espacoFisico: EspacoFisico;
  caracteristicas: tipoPadrao[];
  tipoVaga: tipoPadrao;
  mobiliado: boolean;
  moveisDisponiveis: tipoPadrao[];
  descricao: string;
  oculto: boolean;
  preco: number;
  imagens: ImageSourcePropType[];
  individual?: number;
  quantPessoasCasa?: number;
  quantQuartos?: number;
  addProperty1(localizacao: Localizacao): void;
  addProperty2(espacoFisico: EspacoFisico, quantPessoasCasa: number): void;
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
  const [oculto, setOculto] = useState<boolean>(true);
  const [preco, setPreco] = useState<number>(0);
  const [individual, setIndividual] = useState<number>(0);
  const [quantPessoasCasa, setQuantPessoasCasa] = useState<number>(0);
  const [quantQuartos, setQuantQuartos] = useState<number>(0);
  const [imagens, setImagens] = useState<ImageSourcePropType[]>([]);

  const addProperty1 = (localizacao: Localizacao) => {
    setLocalizacao(localizacao);
  };

  const addProperty2 = (
    espacoFisico: EspacoFisico,
    quantPessoasCasa: number
  ) => {
    setQuantPessoasCasa(quantPessoasCasa);
    setEspacoFisico(espacoFisico);
  };

  return (
    <NewPostContext.Provider
      value={{
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
        quantQuartos,
        addProperty1,
        addProperty2,
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}

export { NewPostContext, NewPostProvider };
