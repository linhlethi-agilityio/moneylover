'use cache';

import { cacheTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Libs
import { getTransactions, getTransactionBalanceByDate, getTransactionById } from '@/libs';

export const getTransactionDetailById = async (id: string) => {
  cacheTag(`${CACHE_TAGS.TRANSACTION}/${id}`);
  return getTransactionById(id);
};

export const getTransactionsByDate = async (userId: string, startDate: string, endDate: string) => {
  cacheTag(CACHE_TAGS.TRANSACTIONS);

  const transactions = await getTransactions(userId, startDate, endDate);
  const { inflow, outflow } = await getTransactionBalanceByDate(userId, startDate, endDate);

  const groupedByCategory = transactions.reduce<Record<string, typeof transactions>>((acc, t) => {
    const key = t.category_id;
    (acc[key] ??= []).push(t);
    return acc;
  }, {});

  return { transactions, inflow, outflow, groupedByCategory };
};
