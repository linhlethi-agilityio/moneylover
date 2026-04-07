import { z } from 'zod';

// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * @param requiredFields [] The required fields on form
 * @param dirtyFields [] The fields, which the users touched and fill data on
 * @param errors {} The errors fields
 * NOTE: If the user touched and fill data for the fields, which defined on array requiredFields and without errors message
 *  ==> The button should enable.
 * When the button enable AND user focusing on the last element
 * the UX: hit `enter` on the last field to submit form should work
 */
export const isEnableSubmitButton = (
  requiredFields: string[],
  dirtyFields: string[],
  errors: Record<string, unknown>,
): boolean => {
  const isMatchAllRequiredFields: boolean = requiredFields.every((field) =>
    dirtyFields.includes(field),
  );

  return isMatchAllRequiredFields && errors && !Object.keys(errors).length;
};

export const signInSchema = z.object({
  email: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Email')).email(ERROR_MESSAGES.EMAIL_INVALID),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.REQUIRED('Password'))
    .min(6, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
});

export const signUpSchema = z
  .object({
    email: z
      .string()
      .nonempty(ERROR_MESSAGES.REQUIRED('Email'))
      .email(ERROR_MESSAGES.EMAIL_INVALID),
    password: z
      .string()
      .nonempty(ERROR_MESSAGES.REQUIRED('Password'))
      .min(6, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Confirm password')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.CONFIRM_PASSWORD_NOT_MATCH,
    path: ['confirmPassword'],
  });

export const categorySchema = z.object({
  name: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Category name')),
  type: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Type')),
  parentId: z.string().optional(),
});

export const walletSchema = z.object({
  name: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Wallet name')),
  currency: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Currency')),
  balance: z.union([z.string(), z.number()]).optional(),
});

export const transactionSchema = z.object({
  type: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Type')),
  categoryId: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Category')),
  amount: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Amount')),
  date: z.string().nonempty(ERROR_MESSAGES.REQUIRED('Date')),
  note: z.string().optional(),
});
