import { supabase } from "@/lib/supabase";
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { PropertyFormData } from "@/utils/types";


// ================================================================================ //
//                                  HANDLE IMAGES
// ================================================================================ //

async function uploadImages(userId: string, images: string[]): Promise<string[]> {
  const uploadedUrls: string[] = [];

  for (const uri of images) {
    if (uri.startsWith('http')) {
      uploadedUrls.push(uri);
      continue;
    }

    const fileName = `imovel-${userId}-${new Date().getTime()}-${Math.random()}.jpg`;
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
    
    const { error } = await supabase.storage
      .from('imoveis-imagens')
      .upload(fileName, decode(base64), { contentType: 'image/jpeg' });

    if (error) throw error;

    const { data } = supabase.storage.from('imoveis-imagens').getPublicUrl(fileName);
    uploadedUrls.push(data.publicUrl);
  }
  return uploadedUrls;
}

// ================================================================================ //
//                           CREATE OR UPDATE ON SUPABASE
// ================================================================================ //

export async function savePropertyService(formData: PropertyFormData, propertyId?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Usuário não autenticado.");

  const finalImageUrls = await uploadImages(user.id, formData.imagens);

  const payload = {
    ...formData.localizacao,
    
    num_salaEstar: formData.espacoFisico.salaEstar,
    num_banheiro: formData.espacoFisico.banheiro,
    num_garagem: formData.espacoFisico.vagaGaragem,
    num_cozinha: formData.espacoFisico.cozinha,
    num_salaJantar: formData.espacoFisico.salaJantar,
    num_areaServico: formData.espacoFisico.areaServico,
    num_varanda: formData.espacoFisico.varanda,

    caracteristicas: formData.caracteristicas.map(c => c.name),
    tipoVaga: formData.tipoVaga.name,
    tipoMoradia: formData.tipoMoradia.name,
    mobiliado: formData.mobiliado,
    tipoMoradiaEspecifico: formData.tipoMoradiaEspecifico.name,
    
    num_pessoasCasa: formData.quantPessoasCasa,
    num_quartos: formData.quantQuartos,
    num_pessoasQuarto: formData.individual,
    moveisDisponiveis: formData.moveisDisponiveis.map(m => m.name),

    descricao: formData.descricao,
    preco: formData.preco,
    imagens: finalImageUrls,
    oculto: formData.oculto,
    proprietario: user.id,
  };

  if (propertyId) {
    const { error } = await supabase.from('Imoveis').update(payload).eq('id', propertyId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('Imoveis').insert([payload]);
    if (error) throw error;
  }
}