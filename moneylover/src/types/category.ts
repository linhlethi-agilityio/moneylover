import { FinanceType } from './transaction';

export interface Category {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  type: FinanceType;
}
