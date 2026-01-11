import { supabase } from "@/lib/supabase";
import { Imovel } from "@/utils/Imovel";

export const postStatusPresenter = {

  getUpdatedVisibilityList: (posts: Imovel[], postId: string, newState: boolean): Imovel[] => {
    return posts.map(item => 
      item.id === postId ? { ...item, oculto: newState } : item
    );
  },

  getUpdatedFavoriteList: (posts: Imovel[], postId: string, newState: boolean): Imovel[] => {
    return posts.map(item => 
      item.id === postId ? { ...item, isFavorited: newState } : item
    );
  },

  updateVisibility: async (postId: string, nextHiddenState: boolean) => {
    const { error } = await supabase
      .from('Imoveis')
      .update({ oculto: nextHiddenState })
      .eq('id', postId);
    return error;
  },

  updateFavorites: async (userId: string, postId: string, isAdding: boolean) => {
    if (isAdding) {
      const { error } = await supabase
        .from('Favoritos')
        .insert([{ user_id: userId, post_id: postId }]);
      return error;
    } else {
      const { error } = await supabase
        .from('Favoritos')
        .delete()
        .eq('user_id', userId)
        .eq('post_id', postId);
      return error;
    }
  },

  handleStatusPress: async (params: {
    isOwner: boolean,
    userId: string,
    post: Imovel,
    currentList: Imovel[],
    setList: (posts: Imovel[]) => void,
    refreshCallback: () => void
  }) => {
    const { isOwner, userId, post, currentList, setList, refreshCallback } = params;

    if (isOwner) {
      const newState = !post.oculto;
      const updatedList = postStatusPresenter.getUpdatedVisibilityList(currentList, post.id, newState);
      
      setList(updatedList);
      
      const error = await postStatusPresenter.updateVisibility(post.id, newState);
      if (error) refreshCallback(); 

    } else {

      const newState = !post.isFavorited;
      const updatedList = postStatusPresenter.getUpdatedFavoriteList(currentList, post.id, newState);
      
      setList(updatedList);
      
      const error = await postStatusPresenter.updateFavorites(userId, post.id, newState);
      if (error) refreshCallback(); 
    }
  }
};