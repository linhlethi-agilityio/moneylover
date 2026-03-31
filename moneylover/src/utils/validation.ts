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
  email: z.string().nonempty(ERROR_MESSAGES.EMAIL_REQUIRED).email(ERROR_MESSAGES.EMAIL_INVALID),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(6, ERROR_MESSAGES.PASSWORD_MIN_LENGTH),
});
