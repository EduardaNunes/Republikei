import React, { createContext, useCallback, useState } from "react";
import { Imovel } from "@/utils/Imovel";
import { PropertyFormData, INITIAL_FORM_DATA } from "@/utils/types";
import { savePropertyService } from "@/presenter/postPresenter";
import { tipoPadrao } from "@/utils/typesAux";

import { 
  housingType, 
  vacancyType, 
  characteristics, 
  furniture, 
  completeHouseType,
  sharedHouseType 
} from '@/utils/enums';

interface NewPostContextData {
  formData: PropertyFormData;
  updateFormData(data: Partial<PropertyFormData>): void;
  isSubmitting: boolean;
  submissionError: string | null;
  submissionSuccess: boolean;
  clearSubmissionError(): void;
  saveProperty(): Promise<void>;
  loadPropertyForEdit(property: Imovel): void;
  resetForm(): void;
  propertyIdForEdit: string | null;
}

export const NewPostContext = createContext<NewPostContextData>({} as NewPostContextData);

export function NewPostProvider({ children }: { children: React.ReactNode }) {

  const [formData, setFormData] = useState<PropertyFormData>(INITIAL_FORM_DATA);
  const [propertyIdForEdit, setPropertyIdForEdit] = useState<string | null>(null);

  const [status, setStatus] = useState({
    isSubmitting: false,
    error: null as string | null,
    success: false,
  });

  // ================================================================================ //
  //                                     HANDLERS 
  // ================================================================================ //

  const updateFormData = useCallback((newData: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setPropertyIdForEdit(null);
    setStatus({ isSubmitting: false, error: null, success: false });
  }, []);

  const clearSubmissionError = useCallback(() => {
    setStatus(prev => ({ ...prev, error: null }));
  }, []);

  const loadPropertyForEdit = useCallback((property: Imovel) => {
    setPropertyIdForEdit(property.id);

    const findTipo = (list: tipoPadrao[], name: string) => 
      list.find(item => item.name === name) || { id: "", name: "" }
    ;

    const mapList = (list: tipoPadrao[], names: string[] | undefined) => 
      (names || []).map(name => list.find(item => item.name === name)).filter(Boolean) as tipoPadrao[]
    ;

    const allSpecificTypes = [...completeHouseType, ...sharedHouseType];

    setFormData({
      localizacao: {
        cep: property.cep,
        rua: property.rua,
        bairro: property.bairro,
        numero: property.numero,
        complemento: property.complemento || "",
        latitude: property.latitude,
        longitude: property.longitude,
      },
      espacoFisico: {
        salaEstar: property.num_salaEstar,
        banheiro: property.num_banheiro,
        vagaGaragem: property.num_garagem,
        cozinha: property.num_cozinha,
        salaJantar: property.num_salaJantar,
        areaServico: property.num_areaServico,
        varanda: property.num_varanda,
      },
      tipoMoradia: findTipo(housingType, property.tipoMoradia),
      tipoVaga: findTipo(vacancyType, property.tipoVaga),
      tipoMoradiaEspecifico: findTipo(allSpecificTypes, property.tipoMoradiaEspecifico),
      caracteristicas: mapList(characteristics, property.caracteristicas),
      moveisDisponiveis: mapList(furniture, property.moveisDisponiveis),
      mobiliado: property.mobiliado,
      quantPessoasCasa: property.num_pessoasCasa,
      quantQuartos: property.num_quartos,
      individual: property.num_pessoasQuarto,
      descricao: property.descricao || "",
      preco: property.preco,
      imagens: property.imagens || [],
      oculto: property.oculto
    });
  }, []);

  const saveProperty = useCallback(async () => {
    setStatus({ isSubmitting: true, error: null, success: false });

    try {
      await savePropertyService(formData, propertyIdForEdit || undefined);
      setStatus({ isSubmitting: false, error: null, success: true });
    } catch (error: any) {
      setStatus({ isSubmitting: false, error: error.message || "Erro ao salvar.", success: false });
    }
  }, [formData, propertyIdForEdit]);

  // ================================================================================ //
  //                                     FRONT-END 
  // ================================================================================ //

  return (
    <NewPostContext.Provider
      value={{
        formData,
        updateFormData,
        isSubmitting: status.isSubmitting,
        submissionError: status.error,
        submissionSuccess: status.success,
        clearSubmissionError,
        saveProperty,
        loadPropertyForEdit,
        resetForm,
        propertyIdForEdit
      }}
    >
      {children}
    </NewPostContext.Provider>
  );
}