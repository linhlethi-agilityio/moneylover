'use cache';

import { cacheTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { FinanceType } from '@/types';

// Libs
import { getParentCategories, getSubCategoriesByParentIds } from '@/libs';

export const getCategoriesInfo = async (userId: string) => {
  cacheTag(CACHE_TAGS.CATEGORIES);

  const [expenseCategories, incomeCategories] = await Promise.all([
    getParentCategories(userId, FinanceType.Expense),
    getParentCategories(userId, FinanceType.Income),
  ]);

  const allParentIds = [...expenseCategories, ...incomeCategories].map((c) => c.id);
  const subCategories = await getSubCategoriesByParentIds(allParentIds);

  return { expenseCategories, incomeCategories, subCategories };
};
