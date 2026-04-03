import { Category, FinanceType } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: '1', user_id: '', name: 'Food & Beverage', image_url: '', type: FinanceType.Expense },
  { id: '2', user_id: '', name: 'Transportation', image_url: '', type: FinanceType.Expense },
  { id: '3', user_id: '', name: 'Rentals', image_url: '', type: FinanceType.Expense },
  { id: '10', user_id: '', name: 'Other Utility Bills', image_url: '', type: FinanceType.Expense },
  { id: '11', user_id: '', name: 'Home Maintenance', image_url: '', type: FinanceType.Expense },
  { id: '12', user_id: '', name: 'Vehicle Maintenance', image_url: '', type: FinanceType.Expense },
  { id: '13', user_id: '', name: 'Salary', image_url: '', type: FinanceType.Income },
  { id: '14', user_id: '', name: 'Bonus', image_url: '', type: FinanceType.Income },
  { id: '15', user_id: '', name: 'Investment', image_url: '', type: FinanceType.Income },
];
