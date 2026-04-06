'use server';

import { cacheTag, updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { FinanceType } from '@/types';

// Services
import {
  addCategory,
  getParentCategories,
  getSubCategoriesByParentIds,
  editCategory,
  removeCategory,
} from '@/services';

interface CreateCategoryParams {
  userId: string;
  name: string;
  type: string;
  parentId?: string | null;
}

export const getCategoriesInfo = async (userId: string) => {
  'use cache';
  cacheTag(CACHE_TAGS.CATEGORIES);

  const [expenseCategories, incomeCategories] = await Promise.all([
    getParentCategories(userId, FinanceType.Expense),
    getParentCategories(userId, FinanceType.Income),
  ]);

  const allParentIds = [...expenseCategories, ...incomeCategories].map((c) => c.id);
  const subCategories = await getSubCategoriesByParentIds(allParentIds);

  return { expenseCategories, incomeCategories, subCategories };
};

export const createCategory = async ({
  userId,
  name,
  type,
  parentId = null,
}: CreateCategoryParams): Promise<void | string> => {
  const { error } = await addCategory({
    user_id: userId,
    parent_id: parentId,
    name,
    type: type as FinanceType,
  });

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.CATEGORIES);
};

interface UpdateCategoryParams {
  id: string;
  name: string;
  type: string;
  parentId?: string | null;
}

export const updateCategory = async ({
  id,
  name,
  type,
  parentId = null,
}: UpdateCategoryParams): Promise<void | string> => {
  const { error } = await editCategory({
    id,
    name,
    type: type as FinanceType,
    parent_id: parentId,
  });

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.CATEGORIES);
};

export const deleteCategory = async (categoryId: string): Promise<void | string> => {
  const { error } = await removeCategory(categoryId);

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.CATEGORIES);
};
