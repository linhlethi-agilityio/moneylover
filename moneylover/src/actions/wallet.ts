'use server';

import { cacheTag, updateTag } from 'next/cache';

// Constants
import { CACHE_TAGS } from '@/constants';

// Services
import { addWallet, getWallets, removeWallet } from '@/services';

interface CreateWalletParams {
  userId: string;
  name: string;
  currency: string;
  balance?: number;
}

export const getWalletsInfo = async (userId: string) => {
  'use cache';
  cacheTag(CACHE_TAGS.WALLETS);

  const wallets = await getWallets(userId);
  const totalBalance = wallets.reduce((sum, wallet) => sum + (wallet.balance ?? 0), 0);
  const currency = wallets[0]?.currency;

  return { wallets, totalBalance, currency };
};

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

export const deleteWallet = async (walletId: string): Promise<void | string> => {
  const { error } = await removeWallet(walletId);

  if (error) {
    return error.message;
  }

  updateTag(CACHE_TAGS.WALLETS);
};
