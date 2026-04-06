export interface SignInFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CategoryFormData {
  name: string;
  type: string;
  parentId?: string;
}

export interface WalletFormData {
  name: string;
  currency: string;
  balance?: string | number;
}
