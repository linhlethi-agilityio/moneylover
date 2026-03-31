'use server';

import { AuthError } from 'next-auth';

// Configs
import { signIn, signOut as signOutAuth } from '@/configs/auth';

// Constants
import { AUTH_METHODS, ERROR_MESSAGES, ERROR_TYPES } from '@/constants';

// Types
import { SignInFormData } from '@/types';

export const authenticate = async (formData: SignInFormData): Promise<void | string> => {
  try {
    await signIn(AUTH_METHODS.CREDENTIALS, {
      ...formData,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      const errorMap: Record<string, string> = {
        [ERROR_TYPES.CREDENTIALS_SIGN_IN]: ERROR_MESSAGES.EMAIL_PASSWORD_INVALID,
      };

      return errorMap[error.type] || ERROR_MESSAGES.UNKNOWN_ERROR;
    }

    throw error;
  }
};

export const signOut = async () => {
  await signOutAuth();
};
