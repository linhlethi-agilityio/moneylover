'use client';

import { useMemo, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Constants
import { CURRENCIES, ERROR_MESSAGES, ROUTES } from '@/constants';

// Actions
import { createWallet } from '@/actions';

// Types
import { WalletFormData } from '@/types';

// Hooks
import { useToast } from '@/hooks';

// Utils
import { clearErrorOnChange, isEnableSubmitButton, walletSchema } from '@/utils';

// Components
import { Button, Input } from '@/components';

const REQUIRED_FIELDS = ['name'];

interface WalletFormProps {
  userId: string;
}

export const WalletForm = ({ userId }: WalletFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { showToast } = useToast();

  const {
    control,
    formState: { dirtyFields, errors },
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      name: '',
      currency: 'VND',
    },
  });

  const selectedCurrency = useWatch({ control, name: 'currency' });

  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const handleFormSubmit = (formData: WalletFormData) => {
    startTransition(async () => {
      const error = await createWallet({ userId, ...formData });

      if (error) {
        return showToast({
          status: 'error',
          title: ERROR_MESSAGES.UNKNOWN_ERROR,
          description: error,
        });
      }

      router.push(ROUTES.DASHBOARD);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6">
      <Controller
        name="name"
        control={control}
        render={({ field: { name, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            label="Wallet Name"
            placeholder="e.g. Cash, Bank Account"
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <div>
        <p className="mb-1 text-xs text-gray-400">Currency</p>
        <div className="space-y-2">
          {CURRENCIES.map(({ code, label }) => (
            <div
              key={code}
              onClick={() => setValue('currency', code, { shouldDirty: true })}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                selectedCurrency === code
                  ? 'border-lime-600 bg-lime-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-sm font-medium text-gray-900">{label}</span>
              <span className="ml-auto text-xs text-gray-400">{code}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        isLoading={isPending}
        disabled={!enableSubmit}
        className="w-full"
      >
        Submit
      </Button>
    </form>
  );
};
