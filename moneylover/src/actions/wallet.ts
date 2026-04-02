'use server';

// Libs
import { supabase } from '@/libs/supabase';


interface CreateWalletParams {
  userId: string;
  name: string;
  currency: string;
  balance?: number;
}

export const getWallets = async (userId: string) => {
  const { data } = await supabase.from('wallets').select('*').eq('user_id', userId);

  return data ?? [];
};

export const getTotalBalance = async (userId: string): Promise<number> => {
  const { data } = await supabase.rpc('get_total_balance', {
    user_id_input: userId,
  });

  return Number(data) || 0;
};

export const getWalletsInfo = async (userId: string) => {
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
  const { error } = await supabase.from('wallets').insert({
    user_id: userId,
    name,
    currency,
    balance,
  });

  if (error) {
    return error.message;
  }
};
