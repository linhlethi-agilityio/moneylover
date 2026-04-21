'use server';

import { updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { FinanceType, Wallet } from '@/types';

// Libs
import { editWallet, removeWallet, addTransaction, syncWalletBalance, supabase } from '@/libs';

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
}: CreateWalletParams): Promise<{ id: string } | string> => {
  const { data: walletData, error: walletError } = await supabase
    .from('wallets')
    .insert({ user_id: userId, name, currency, balance: 0 })
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

    await syncWalletBalance(walletData.id);
  }

  updateTag(CACHE_TAGS.WALLETS);
  updateTag(CACHE_TAGS.TRANSACTIONS);

  return { id: walletData.id };
};

export const updateWallet = async ({
  id,
  name,
  currency,
  balance,
  user_id,
}: Partial<Wallet>): Promise<void | string> => {
  const { data: currentWallet } = await supabase
    .from('wallets')
    .select('balance, user_id')
    .eq('id', id)
    .single();

  const { error } = await editWallet({ id, name, currency });

  if (error) {
    return error.message;
  }

  const resolvedUserId = user_id ?? currentWallet?.user_id;
  const currentBalance = currentWallet?.balance ?? 0;
  const newBalance = balance ?? 0;
  const diff = newBalance - currentBalance;

  if (diff !== 0 && resolvedUserId) {
    const type = diff > 0 ? FinanceType.Income : FinanceType.Expense;

    const { data: defaultCategory } = await supabase
      .from('categories')
      .select('id')
      .eq('user_id', resolvedUserId)
      .eq('type', type)
      .eq('is_default', true)
      .ilike('name', '%other%')
      .single();

    if (defaultCategory) {
      await addTransaction({
        user_id: resolvedUserId,
        wallet_id: id,
        category_id: defaultCategory.id,
        type,
        amount: Math.abs(diff),
        date: new Date().toISOString().split('T')[0],
        note: 'Balance adjustment',
      });
    }

    await syncWalletBalance(id!);

    updateTag(CACHE_TAGS.TRANSACTIONS);
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
