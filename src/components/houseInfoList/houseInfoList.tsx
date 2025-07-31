import { View } from "react-native";
import AppText from "@/components/appText";

type HouseInfo = {
  banheiros?: number;
  salasEstar?: number;
  areasServico?: number;
  vagasGaragem?: number;
  cozinhas?: number;
  salasJantar?: number;
  varandas?: number;
  quartos?: number;
  pessoasPorQuarto?: number;
  pessoasPorMoradia?: number;
};

type Props = {
  data: HouseInfo;
};

export default function HouseInfoList({ data }: Props) {
  const infoMap: { key: keyof HouseInfo; label: string }[] = [
    { key: "banheiros", label: "Nº Banheiros" },
    { key: "salasEstar", label: "Nº Salas de Estar" },
    { key: "areasServico", label: "Nº Áreas de Serviço" },
    { key: "vagasGaragem", label: "Nº Vagas de Garagem" },
    { key: "cozinhas", label: "Nº Cozinhas" },
    { key: "salasJantar", label: "Nº Salas de Jantar" },
    { key: "varandas", label: "Nº Varandas" },
    { key: "quartos", label: "Nº Quartos" },
    { key: "pessoasPorQuarto", label: "Nº Pessoas/Quarto" },
    { key: "pessoasPorMoradia", label: "Nº Pessoas/Moradia" },
  ];

  return (
    <View>
      {infoMap.map(({ key, label }) => {
        const value = data[key];
        if (value && value > 0) {
          return <AppText key={key}>{`${label}: ${value}`}</AppText>;
        }
        return null;
      })}
    </View>
  );
}
