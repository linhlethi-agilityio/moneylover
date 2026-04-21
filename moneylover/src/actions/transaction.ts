'use server';

import { updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { TransactionFormData } from '@/types';

// Libs
import { addTransaction, editTransaction, removeTransaction, syncWalletBalance, supabase } from '@/libs';

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

  await syncWalletBalance(walletId);

  updateTag(CACHE_TAGS.TRANSACTIONS);
  updateTag(CACHE_TAGS.WALLETS);
};

export const updateTransaction = async (
  id: string,
  data: TransactionFormData,
): Promise<void | string> => {
  const { walletId, categoryId, type, amount, date, note } = data;

  const { data: oldTx } = await supabase
    .from('transactions')
    .select('wallet_id')
    .eq('id', id)
    .single();

  const { error } = await editTransaction(id, {
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

  // Sync affected wallets
  await syncWalletBalance(walletId);
  if (oldTx && oldTx.wallet_id !== walletId) {
    await syncWalletBalance(oldTx.wallet_id);
  }

  updateTag(CACHE_TAGS.TRANSACTIONS);
  updateTag(`${CACHE_TAGS.TRANSACTION}/${id}`);
  updateTag(CACHE_TAGS.WALLETS);
};

export const deleteTransaction = async (id: string): Promise<void | string> => {
  const { data: tx } = await supabase
    .from('transactions')
    .select('wallet_id')
    .eq('id', id)
    .single();

  const { error } = await removeTransaction(id);

  if (error) {
    return error.message;
  }

  if (tx) {
    await syncWalletBalance(tx.wallet_id);
  }

  updateTag(CACHE_TAGS.TRANSACTIONS);
  updateTag(CACHE_TAGS.WALLETS);
};
