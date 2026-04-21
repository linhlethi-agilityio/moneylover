'use cache';

import { cacheTag } from 'next/cache';

// Constants
import { CACHE_TAGS, RECENT_TRANSACTION_LIMIT } from '@/constants';

// Libs
import {
  getTransactions,
  getTransactionById,
  getRecentTransactions,
} from '@/libs';

// Types
import { TransactionWithCategory } from '@/types';

export const getRecentTransactionsList = async (
  userId: string,
  limit = RECENT_TRANSACTION_LIMIT,
) => {
  cacheTag(CACHE_TAGS.TRANSACTIONS);
  return getRecentTransactions(userId, limit);
};

export const getTransactionDetailById = async (id: string) => {
  cacheTag(`${CACHE_TAGS.TRANSACTION}/${id}`);
  return getTransactionById(id);
};

export const getTransactionsByDate = async (
  userId: string,
  startDate: string,
  endDate: string,
  query?: string,
  walletId?: string,
) => {
  cacheTag(CACHE_TAGS.TRANSACTIONS);

  const transactions = (await getTransactions(
    userId,
    startDate,
    endDate,
    query,
    walletId,
  )) as unknown as TransactionWithCategory[];

  const { inflow, outflow } = transactions.reduce(
    (acc, t) => {
      if (t.type === 'income') acc.inflow += t.amount;
      else acc.outflow += t.amount;
      return acc;
    },
    { inflow: 0, outflow: 0 },
  );

  const groupedByCategory = transactions.reduce<Record<string, typeof transactions>>((acc, t) => {
    const key = t.category_id;
    (acc[key] ??= []).push(t);
    return acc;
  }, {});

  return { transactions, inflow, outflow, groupedByCategory };
};
