import { UseFormClearErrors, FieldErrors, Path, FieldValues } from 'react-hook-form';

/**
 * Clear errors for React hooks form
 */
export const clearErrorOnChange = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  clearErrorFunc: UseFormClearErrors<T>,
): void => {
  errors[fieldName]?.message && clearErrorFunc(fieldName);
};
