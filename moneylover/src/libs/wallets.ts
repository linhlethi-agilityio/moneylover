// Libs
import { supabase } from '@/libs/supabase';

// Types
import { Wallet } from '@/types';

type InsertWalletParams = Omit<Wallet, 'id' | 'created_at'>;

export const getWallets = async (userId: string) => {
  const { data } = await supabase.from('wallets').select('*').eq('user_id', userId);

  return data ?? [];
};

export const addWallet = async ({ user_id, name, currency, balance = 0 }: InsertWalletParams) => {
  const { error } = await supabase.from('wallets').insert({ user_id, name, currency, balance });

  return { error };
};

export const editWallet = async ({ id, name, currency, balance }: Partial<Wallet>) => {
  const updates: Partial<Omit<Wallet, 'id' | 'user_id' | 'created_at'>> = { name, currency };
  if (balance !== undefined) updates.balance = balance;

  const { error } = await supabase.from('wallets').update(updates).eq('id', id);

  return { error };
};

export const removeWallet = async (walletId: string) => {
  const { error } = await supabase.from('wallets').delete().eq('id', walletId);

  return { error };
};

// Recalculate wallet balance from all its transactions and persist it
export const syncWalletBalance = async (walletId: string) => {
  const { data: transactions } = await supabase
    .from('transactions')
    .select('type, amount')
    .eq('wallet_id', walletId);

  const balance = (transactions ?? []).reduce((sum, t) => {
    return sum + (t.type === 'income' ? t.amount : -t.amount);
  }, 0);

  const { error } = await supabase
    .from('wallets')
    .update({ balance })
    .eq('id', walletId);

  return { error };
};
