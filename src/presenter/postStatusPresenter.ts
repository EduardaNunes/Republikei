import { supabase } from "@/lib/supabase";
import { Imovel } from "@/utils/Imovel";

export const postStatusPresenter = {

    getUpdatedList: (postList: Imovel[], postId: string, newState: boolean): Imovel[] => {
        return postList.map(post => 
            post.id === postId ? { ...post, oculto: newState } : post
        );
    },

    updateStatus: async (postId: string, nextHiddenState: boolean) => {
        const { error } = await supabase
        .from('Imoveis')
        .update({ oculto: nextHiddenState })
        .eq('id', postId);

        return error;
    },

    handleToggleStatus: async (postList: Imovel[], postId: string, currentState: boolean) => {
    
        const newState = !currentState;
    
        const updatedList = postStatusPresenter.getUpdatedList(postList, postId, newState);
        
        const error = await postStatusPresenter.updateStatus(postId, newState);

        return { updatedList, error };
    },

    handleStatusPress: async (isOwner: boolean) => {

    } 
}