// Libs
import { supabase } from '@/libs/supabase';

// Types
import { Transaction } from '@/types';

export const getTransactions = async (userId: string, startDate: string, endDate: string) => {
  const { data } = await supabase
    .from('transactions')
    .select('*, category:categories(name, image_url, type)')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  return data ?? [];
};

export const getRecentTransactions = async (userId: string, limit: number) => {
  const { data } = await supabase
    .from('transactions')
    .select('*, category:categories(name, image_url, type)')
    .eq('user_id', userId)
    .order('date', { ascending: false })
    .limit(limit);

  return data ?? [];
};

export const getTransactionById = async (id: string) => {
  const { data } = await supabase
    .from('transactions')
    .select('*, category:categories(name, image_url, type)')
    .eq('id', id)
    .single();

  return data;
};

export const removeTransaction = async (id: string) => {
  const { error } = await supabase.from('transactions').delete().eq('id', id);

  return { error };
};

export const getTransactionBalanceByDate = async (
  userId: string,
  startDate: string,
  endDate: string,
) => {
  const { data } = await supabase.rpc('get_transaction_summary', {
    user_id_input: userId,
    start_date: startDate,
    end_date: endDate,
  });

  const result = data?.[0];

  const { inflow = 0, outflow = 0 } = result || {};

  return { inflow, outflow };
};

export const addTransaction = async (params: Partial<Transaction>) => {
  const { error } = await supabase.from('transactions').insert(params);

  return { error };
};

export const editTransaction = async (id: string, params: Partial<Transaction>) => {
  const { error } = await supabase.from('transactions').update(params).eq('id', id);

  return { error };
};
