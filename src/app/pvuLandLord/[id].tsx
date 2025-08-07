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
import { characteristics } from "@/utils/enums";

import { NewPostContext } from "@/contexts/NewPostContext";
import { useContext } from "react";

export default function PvuLandLord() {

  const { id } = useLocalSearchParams<{ id: string }>(); 
  
  const [property, setProperty] = useState<Imovel | null>(null);
  const { loadPropertyForEdit } = useContext(NewPostContext);

  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');

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

  useEffect(() => {

    if (!id) return;

    const fetchPropertyDetails = async () => {

      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserType(user.user_metadata.userType || null);
        setUserName(user.user_metadata.displayName || '');
        setUserEmail(user.email || 'E-mail não encontrado');
        setUserPhone(user.phone || "");
      }

      setLoading(true);

      try {

        const { data, error } = await supabase
          .from('Imoveis')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        if (data) setProperty(data); 
        else throw new Error("Imóvel não encontrado.");

      } catch (error: any) {
        Alert.alert("Erro", "Não foi possível carregar os detalhes do imóvel.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  if (!property) {
    return <AppText>Imóvel não encontrado.</AppText>;
  }

  const statusType = userType === "owner" ? "visibility" : "favorite";
  //const shouldShowStatusPost = !(userType === "owner" && statusType === "favorite");

  const handleEdit = () => {
    if (!property) return;
    // 1. Carrega os dados do imóvel para o contexto
    loadPropertyForEdit(property);
    // 2. Navega para o início do formulário, passando o ID
    router.push({ pathname: '/addProperty_1', params: { propertyId: id } });
  };

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
                <LandlordName name={userName || 'Sem Nome'} phone={userPhone || '(00) 00000-0000'} mail={userEmail || "???@gmail.com"} />

              </View>
            </View>
        </View>

    </ScrollView>
    <PriceAndContactButton price={property.preco} isOwner={userType === "owner"} onDelete={handleDelete} onEdit={handleEdit}/>
    </>
  );
}
