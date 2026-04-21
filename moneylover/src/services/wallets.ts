'use cache';

import { cacheTag } from 'next/cache';

// Constants
import { CACHE_TAGS, USD_TO_VND_RATE } from '@/constants';

// Libs
import { getWallets } from '@/libs';

export const getWalletsInfo = async (userId: string) => {
  cacheTag(CACHE_TAGS.WALLETS);

  const wallets = await getWallets(userId);

  const currencies = new Set(wallets.map((w) => w.currency));
  const isApproximate = currencies.size > 1;

  const totalBalance = wallets.reduce((sum, wallet) => {
    const balance = wallet.balance ?? 0;
    const toVnd = wallet.currency === 'USD' ? balance * USD_TO_VND_RATE : balance;
    return sum + toVnd;
  }, 0);

  const currency = wallets[0]?.currency;

  return { wallets, totalBalance, currency, isApproximate };
};
