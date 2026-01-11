import { Image, View, ScrollView, Alert, ActivityIndicator } from "react-native";

import { styles } from "../../components/styles/pvuLandLord";
import AppText from "@/components/appText";
import SelectableBlock from "@/components/selectableBlock";
import { router, useLocalSearchParams } from "expo-router";
import StatusPost from "@/components/statusPost";
import OwnerData from "@/components/ownerPostData";
import PriceAndContactButton from "@/components/priceAndContactButton";
import BackButton from "@/components/backButton";
import { ImageCarousel } from "@/components/imagesCarrossel";
import HouseInfoList from "@/components/houseInfoList/houseInfoList";
import { useEffect, useState } from "react";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";

import { getPropertyDetails, handleDeleteAction, handleEditAction } from "@/presenter/postPvuPresenter";
import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext } from "react";

export default function PvuLandLord() {

  const { id } = useLocalSearchParams<{ id: string }>(); 
  
  const [property, setProperty] = useState<Imovel | null>(null);
  const { loadPropertyForEdit } = useContext(NewPostContext);

  const [loading, setLoading] = useState(true);

  const [ownerInfo, setOwnerInfo] = useState({
    'type': '',
    'name': '',
    'phone': '',
    'email': '',
    'userIsOwner': false
  })

  // ================================================================================ //
  //                              UPDATE WHEN HAS CHANGE
  // ================================================================================ //

  useEffect(() => {

    if (!id) return;

    const fetchDetails = async () => {
      setLoading(true);
      try {
        const result = await getPropertyDetails(id);
        
        setProperty(result.property);
        setOwnerInfo(result.ownerInfo);

      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do imóvel. | " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();

  }, [id]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const onEdit = () => {
    if (property) handleEditAction(property, loadPropertyForEdit, router);
  };

  const onDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Deseja mesmo excluir?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              await handleDeleteAction(id); // Chama a lógica pura do presenter
              Alert.alert("Sucesso", "Imóvel excluído.");
              router.replace('/myPosts');
            } catch (e) {
              Alert.alert("Erro", "Falha ao excluir.");
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!property) {
    return <AppText>Imóvel não encontrado.</AppText>;
  }

  return (
    <>
    <ScrollView >
        <BackButton onPress={() => router.back()}/>
        <ImageCarousel 
          images={
            property.imagens && property.imagens.length > 0
            ? property.imagens.map(url => ({ uri: url }))
            : [require("../../assets/Imagem.png")]
          }
          style={styles.image}/>

        <View style={styles.container}>

            <View  style={styles.titleContainer}>
                <AppText style={styles.title}>{property.tipoMoradiaEspecifico + " - " + (property.bairro || "Sem Bairro")}</AppText>
                {/*shouldShowStatusPost && <StatusPost type={statusType} isActive={!property.oculto}/>*/}
            </View>

            <AppText>{property.descricao}</AppText>

            <View style={styles.geralContainer}>
              <View  style={styles.inputContainer}>

                <AppText style={styles.subtitle}>TIPO DE MORADOR</AppText>
                <SelectableBlock objects={[{id: "1" , name: property.tipoVaga}]} readOnly/>

                <AppText style={styles.subtitle}>TIPO DE MORADIA</AppText>
                <SelectableBlock objects={[{id: "1" , name: property.tipoMoradia}]} readOnly/>

                <AppText style={styles.subtitle}>CARACTERÍSTICAS</AppText>
                <SelectableBlock readOnly objects={(property.caracteristicas || [] ).map((caracteristica, index) => ({id: index.toString(), name: caracteristica}) )}/>

                <AppText style={styles.subtitle}>MOBÍLIA</AppText>
                <SelectableBlock readOnly objects={(property.moveisDisponiveis || [] ).map((movel, index) => ({id: index.toString(), name: movel}) )}/>

                <AppText style={styles.subtitle}>ENDEREÇO</AppText>
                <AppText>
                  {`${property.rua}, nº ${property.numero}, Bairro ${property.bairro} - ${property.cep} - `}
                  {property.complemento ? `, ${property.complemento}` : ""}
                </AppText>

                <AppText style={styles.subtitle}>MAIS INFORMAÇÕES</AppText>
                <HouseInfoList data={
                  {
                    banheiros: property.num_banheiro,
                    salasEstar: property.num_salaEstar,
                    cozinhas: property.num_cozinha,
                    pessoasPorMoradia: property.num_pessoasCasa,
                    pessoasPorQuarto: property.num_pessoasQuarto,
                    areasServico: property.num_areaServico,
                    vagasGaragem: property.num_garagem,
                    salasJantar: property.num_salaJantar,
                    varandas: property.num_varanda,
                    quartos: property.num_quartos,  
                  }
                }/>

                <AppText style={styles.subtitle}>LOCADOR</AppText>
                <OwnerData name={ownerInfo.name} phone={ownerInfo.phone} email={ownerInfo.email} />

              </View>
            </View>
        </View>

    </ScrollView>
    <PriceAndContactButton price={property.preco} isOwner={ownerInfo.userIsOwner} onDelete={onDelete} onEdit={onEdit}/>
    </>
  );
}
