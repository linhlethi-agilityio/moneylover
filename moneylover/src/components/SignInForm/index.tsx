'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Icons
import { ShowEyeIcon, HideEyeIcon } from '@/icons';

// Types
import { SignInFormData } from '@/types';

// Utils
import { clearErrorOnChange, isEnableSubmitButton, signInSchema } from '@/utils';

// Components
import { Button, Input } from '@/components';

const REQUIRED_FIELDS = ['email', 'password'];

const SignInForm = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = (formData: SignInFormData) => {
    // TODO: Handle sign in logic here
    console.log('Sign In form data:', formData);
  };

  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const handleToggleVisiblePassword = () => setIsShowPassword((prev) => !prev);

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="w-full space-y-4">
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Sign In</h1>
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

      <p className="text-right text-sm text-gray-500">
        Don&apos;t have an account?&nbsp;
        <Link href="/sign-up" className="text-green-600 hover:underline">
          Sign Up
        </Link>
      </p>

      <Button type="submit" size="lg" disabled={!enableSubmit} className="w-full uppercase">
        Submit
      </Button>
    </form>
  );
};

export default SignInForm;
