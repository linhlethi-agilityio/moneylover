// Libs
import { supabase } from '@/libs/supabase';

// Types
import { Category, FinanceType } from '@/types';

export const getParentCategories = async (userId: string, type: FinanceType) => {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .eq('type', type)
    .is('parent_id', null);

  return data ?? [];
};

export const getSubCategoriesByParentIds = async (parentIds: string[]) => {
  if (!parentIds.length) return [];

  const { data } = await supabase.from('categories').select('*').in('parent_id', parentIds);

  return data ?? [];
};

export const addCategory = async ({ user_id, parent_id, name, type }: Partial<Category>) => {
  const { error } = await supabase.from('categories').insert({
    user_id,
    parent_id,
    name,
    type,
  });

  return { error };
};
