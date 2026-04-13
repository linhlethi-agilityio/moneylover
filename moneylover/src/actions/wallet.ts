'use server';

import { updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Types
import { Wallet } from '@/types';

// Libs
import { addWallet, editWallet, removeWallet } from '@/libs';

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
  const { error } = await addWallet({ user_id: userId, name, currency, balance });

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.WALLETS);
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
