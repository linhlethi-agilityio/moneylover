'use server';

import { updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { FinanceType, Wallet } from '@/types';

// Libs
import { editWallet, removeWallet, addTransaction, supabase } from '@/libs';

interface CreateWalletParams {
  userId: string;
  name: string;
  currency: string;
  balance?: number;
}

export const createWallet = async ({
  userId,
  name,
  currency,
  balance = 0,
}: CreateWalletParams): Promise<void | string> => {
  const { data: walletData, error: walletError } = await supabase
    .from('wallets')
    .insert({ user_id: userId, name, currency, balance })
    .select('id')
    .single();

  if (walletError) {
    return walletError.message;
  }

  if (balance > 0) {
    const { data: otherIncomeCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', userId)
      .eq('type', FinanceType.Income)
      .eq('is_default', true)
      .ilike('name', '%other%')
      .single();

    if (otherIncomeCategory) {
      await addTransaction({
        user_id: userId,
        wallet_id: walletData.id,
        category_id: otherIncomeCategory.id,
        type: FinanceType.Income,
        amount: balance,
        date: new Date().toISOString().split('T')[0],
        note: 'Initial balance',
      });
    }
  }

  updateTag(CACHE_TAGS.WALLETS);
  updateTag(CACHE_TAGS.TRANSACTIONS);
};

export const updateWallet = async ({
  id,
  name,
  currency,
  balance,
}: Partial<Wallet>): Promise<void | string> => {
  const { error } = await editWallet({ id, name, currency, balance });

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.WALLETS);
};

export const deleteWallet = async (walletId: string): Promise<void | string> => {
  const { error } = await removeWallet(walletId);

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.WALLETS);
  updateTag(CACHE_TAGS.TRANSACTIONS);
};
