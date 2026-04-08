'use server';

import { updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { TransactionFormData } from '@/types';

// Libs
import { addTransaction, removeTransaction } from '@/libs';

interface CreateTransactionParams extends TransactionFormData {
  userId: string;
  walletId: string;
}

export const createTransaction = async ({
  userId,
  walletId,
  categoryId,
  type,
  amount,
  date,
  note,
}: CreateTransactionParams): Promise<void | string> => {
  const { error } = await addTransaction({
    user_id: userId,
    wallet_id: walletId,
    category_id: categoryId,
    type,
    amount,
    date,
    note,
  });

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.TRANSACTIONS);
};

export const deleteTransaction = async (id: string): Promise<void | string> => {
  const { error } = await removeTransaction(id);

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.TRANSACTIONS);
};
