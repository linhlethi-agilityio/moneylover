'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { ROUTES } from '@/constants';

// Icons
import { ShowEyeIcon, HideEyeIcon } from '@/icons';

// Types
import { SignUpFormData } from '@/types';

// Utils
import { clearErrorOnChange, isEnableSubmitButton, signUpSchema } from '@/utils';

// Components
import { Button, Input } from '@/components';

const REQUIRED_FIELDS = ['email', 'password', 'confirmPassword'];

export const SignUpForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignUp = (formData: SignUpFormData) => {
    // TODO: Handle sign up logic here
    console.log('Sign Up form data:', formData);
  };

  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const handleToggleVisiblePassword = () => setIsShowPassword((prev) => !prev);
  const handleToggleVisibleConfirmPassword = () => setIsShowConfirmPassword((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="w-full space-y-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign Up</h1>
      <Controller
        name="email"
        control={control}
        render={({ field: { name, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            placeholder="Email"
            type="email"
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field: { name, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            placeholder="Password"
            type={isShowPassword ? 'text' : 'password'}
            rightIcon={
              isShowPassword ? (
                <HideEyeIcon className="cursor-pointer" onClick={handleToggleVisiblePassword} />
              ) : (
                <ShowEyeIcon className="cursor-pointer" onClick={handleToggleVisiblePassword} />
              )
            }
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field: { name, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            placeholder="Confirm Password"
            type={isShowConfirmPassword ? 'text' : 'password'}
            rightIcon={
              isShowConfirmPassword ? (
                <HideEyeIcon
                  className="cursor-pointer"
                  onClick={handleToggleVisibleConfirmPassword}
                />
              ) : (
                <ShowEyeIcon
                  className="cursor-pointer"
                  onClick={handleToggleVisibleConfirmPassword}
                />
              )
            }
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <p className="text-right text-sm text-gray-500">
        Already have an account?&nbsp;
        <Link href={ROUTES.SIGN_IN} className="text-green-600 hover:underline">
          Sign In
        </Link>
      </p>

      <Button type="submit" size="lg" disabled={!enableSubmit} className="w-full uppercase">
        Submit
      </Button>
    </form>
  );
};
