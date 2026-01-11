import { Image, View, ScrollView, Alert, ActivityIndicator } from "react-native";

import { styles } from "../../components/styles/pvuLandLord";
import AppText from "@/components/appText";
import SelectableBlock from "@/components/selectableBlock";
import { router, useLocalSearchParams } from "expo-router";
import StatusPost from "@/components/statusPost";
import LandlordName from "@/components/landlordName";
import PriceAndContactButton from "@/components/priceAndContactButton";
import BackButton from "@/components/backButton";
import { ImageCarousel } from "@/components/imagesCarrossel";
import HouseInfoList from "@/components/houseInfoList/houseInfoList";
import { useEffect, useState } from "react";
import { Imovel } from "@/utils/Imovel";
import { supabase } from "@/lib/supabase";

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

    const fetchPropertyDetails = async () => {

      setLoading(true);

      try {

        const { data, error } = await supabase
          .from('Imoveis')
          .select('*')
          .eq('id', id)
          .single()
        ;

        if (error) throw error;
        
        if (data){

          setProperty(data);

          const { data:  owner , error } = await supabase
            .from('Users')
            .select('*')
            .eq('id', data.proprietario)
            .single()
          ;

          console.log(owner)

          const { data: { user } } = await supabase.auth.getUser();

          setOwnerInfo({
            'type': owner?.type|| null,
            'name': owner?.name || '',
            'phone': owner?.email || 'E-mail não encontrado',
            'email': owner?.phone || '(00) 00000-0000',
            'userIsOwner': user?.id === owner?.id
          })

          console.log(user?.id + " || " + owner?.id)
          console.log(ownerInfo.userIsOwner)

        } 
        else throw new Error("Imóvel não encontrado.");

      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do imóvel. | " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const handleEdit = () => {
    if (!property) return;
    loadPropertyForEdit(property);
    router.push({ pathname: '/addProperty_1', params: { propertyId: id } });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);

            try {

              const { error } = await supabase
                .from('Imoveis')
                .delete()
                .eq('id', id);

              if (error) throw error;

              Alert.alert("Sucesso", "Imóvel excluído.");
              router.replace('/myProperties'); 

            } catch (error: any) {
              Alert.alert("Erro", "Não foi possível excluir o imóvel.");
            } finally {
              setLoading(false);
            }
          },
        },
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
                <LandlordName name={ownerInfo.name} phone={ownerInfo.phone} email={ownerInfo.email} />

              </View>
            </View>
        </View>

    </ScrollView>
    <PriceAndContactButton price={property.preco} isOwner={ownerInfo.userIsOwner} onDelete={handleDelete} onEdit={handleEdit}/>
    </>
  );
}
