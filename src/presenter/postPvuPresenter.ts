import { supabase } from "@/lib/supabase";
import { Imovel } from "@/utils/Imovel";

// ================================================================================ //
//                         GET PROPERTY AND OWNER DATA
// ================================================================================ //

export async function getPropertyDetails(propertyId: string) {

  const { data: property, error: propertyError } = await supabase
    .from('Imoveis')
    .select('*')
    .eq('id', propertyId)
    .single();

  if (propertyError) throw propertyError;
  if (!property) throw new Error("Imóvel não encontrado.");

  const { data: owner, error: ownerError } = await supabase
    .from('Users')
    .select('*')
    .eq('id', property.proprietario)
    .single();

  const { data: { user } } = await supabase.auth.getUser();

  return {
    property,
    ownerInfo: {
      type: owner?.type || null,
      name: owner?.name || '',
      phone: owner?.email || 'E-mail não encontrado',
      email: owner?.phone || '(00) 00000-0000',
      userIsOwner: user?.id === owner?.id
    }
  };
}

// ================================================================================ //
//                                  CALL EDIT POST
// ================================================================================ //

export function handleEditAction(
  property: Imovel, 
  loadPropertyForEdit: (p: Imovel) => void, 
  router: any
) {
  if (!property) return;
  loadPropertyForEdit(property);
  router.push({ pathname: '/addProperty_1', params: { propertyId: property.id } });
}

// ================================================================================ //
//                                    DELETE POST
// ================================================================================ //

export async function handleDeleteAction(propertyId: string) {
  const { error } = await supabase
    .from('Imoveis')
    .delete()
    .eq('id', propertyId);

  if (error) throw error;
  return true;
}