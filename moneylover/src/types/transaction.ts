export enum FinanceType {
  Income = 'income',
  Expense = 'expense',
}

export interface Transaction {
  id: string;
  user_id: string;
  wallet_id: string;
  type: FinanceType;
  category_id: string;
  amount: number;
  note: string;
  date: string;
  created_at: string;
}
