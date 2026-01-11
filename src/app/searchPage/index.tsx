import { Image, View, ScrollView, Alert } from "react-native";

import { styles } from "../../components/styles/searchPage";
import SquareButton from "@/components/button";
import AppText from "@/components/appText";
import SelectableBlock from "@/components/selectableBlock";
import { router, useRouter } from "expo-router";
import { SearchContext } from "@/contexts/SearchContext";
import { useContext } from "react";
import { tipoPadrao } from "@/utils/typesAux";

export default function SearchPage() {

    const router = useRouter();
    const { filters, updateFilters } = useContext(SearchContext);

  return (
    <>
    <ScrollView style={styles.container}>

        <View  style={styles.titleContainer}>
            <AppText style={styles.title}>PESQUISA</AppText>
        </View>

        <View style={styles.geralContainer}>

            <View  style={styles.inputContainer}>

                {/*<Input title="Localização"></Input>*/}
                
                <AppText style={styles.subtitle}>TIPO DE MORADOR</AppText>
                <SelectableBlock 
                    type="vacancyType" 
                    initialState={filters?.vacancyType || undefined}
                    returnSelected={(val) => updateFilters({ vacancyType: val as tipoPadrao })}
                />

                <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                <SelectableBlock 
                    type="housingType" 
                    initialState={filters?.housingType || undefined}
                    returnSelected={(val) => updateFilters({ housingType: val as tipoPadrao })} 
                />

                <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
                <SelectableBlock 
                    type="characteristics" 
                    initialState={filters?.characteristics}
                    returnSelected={(val) => updateFilters({ characteristics: val as tipoPadrao[] })} 
                />

                <AppText style={styles.subtitle}>MOBILIADO?</AppText>
                <SelectableBlock 
                    type="question" 
                    initialState={filters?.isFurnished === null ? undefined : (filters?.isFurnished ? {id: 'question-sim', name: 'Sim'} : {id: 'question-nao', name: 'Não'})}
                    returnSelected={(val) => {
                        const res = val as tipoPadrao | null;
                        updateFilters({ isFurnished: res?.id === 'question-sim' ? true : (res?.id === 'question-nao' ? false : null) } as any);
                    }} 
                />

                <AppText style={styles.subtitle}>ORDENAR POR</AppText>
                <SelectableBlock 
                    type="ranking" 
                    initialState={filters?.ranking || undefined}
                    returnSelected={(val) => updateFilters({ ranking: val as tipoPadrao })} 
                />
            </View>

            <View style={styles.buttonsContainer} >
                <SquareButton name="Pesquisar" onPress={ ()=> router.push("/searchResult") }></SquareButton>
                <SquareButton name="Voltar" variant="secondary" onPress={ ()=> router.back() }></SquareButton>
            </View>

        </View>
    </ScrollView>
    </>
  );
}
