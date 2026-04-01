export const ERROR_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  EMAIL_INVALID: 'Please enter a valid email',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  CONFIRM_PASSWORD_NOT_MATCH: 'Passwords do not match',

  SIGN_UP_FAILED: 'Sign up failed. Please try again.',
  EMAIL_PASSWORD_INVALID: 'Email or password is invalid',
  UNKNOWN_ERROR: 'Something went wrong. Please try again later',
};

export const AUTH_METHODS = {
  CREDENTIALS: 'credentials',
} as const;

export const ERROR_TYPES = {
  CREDENTIALS_SIGN_IN: 'CredentialsSignin',
} as const;
