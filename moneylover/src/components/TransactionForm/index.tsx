'use client';

import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

// Constants
import { CATEGORY_TYPES } from '@/constants';

// Types
import { Category, FinanceType, TransactionFormData } from '@/types';

// Utils
import {
  clearErrorOnChange,
  cn,
  transactionSchema,
  formatCurrency,
  isEnableSubmitButton,
} from '@/utils';

// Components
import { Button, Input, Dropdown } from '@/components';

const REQUIRED_FIELDS = ['categoryId', 'amount', 'date'];

interface TransactionFormProps {
  expenseCategories?: Category[];
  incomeCategories?: Category[];
  onSubmit?: (data: TransactionFormData) => void;
}

export const TransactionForm = ({
  expenseCategories = [],
  incomeCategories = [],
  onSubmit,
}: TransactionFormProps) => {
  const {
    control,
    formState: { errors, dirtyFields },
    clearErrors,
    handleSubmit,
    setValue,
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      type: FinanceType.Expense,
      categoryId: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      note: '',
    },
  });

  const dirtyItems = Object.keys(dirtyFields);

  const enableSubmit = useMemo(
    () => isEnableSubmitButton(REQUIRED_FIELDS, dirtyItems, errors),
    [dirtyItems, errors],
  );

  const selectedType = useWatch({ control, name: 'type' });

  const categories = selectedType === FinanceType.Income ? incomeCategories : expenseCategories;

  const dropdownCategories = useMemo(
    () =>
      categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        icon: cat.image_url ? (
          <Image src={cat.image_url} alt={cat.name} width={32} height={32} />
        ) : undefined,
      })),
    [categories],
  );

  const handleFormSubmit = (data: TransactionFormData) => {
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      {/* Type */}
      <div>
        <p className="mb-1 text-xs text-gray-400">Type</p>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <div className="flex gap-2">
              {CATEGORY_TYPES.map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    onChange(key);
                    setValue('categoryId', '');
                  }}
                  className={cn(
                    'flex-1 rounded-lg border py-2 text-sm font-medium',
                    value === key
                      ? 'border-lime-600 bg-lime-50 text-lime-700'
                      : 'border-gray-200 text-gray-500',
                  )}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
        />
      </div>

      {/* Category */}
      <Controller
        name="categoryId"
        control={control}
        render={({ field: { value, onChange, name } }) => (
          <Dropdown
            label="Category"
            placeholder="Select category"
            items={dropdownCategories}
            value={value}
            onChange={(item) => {
              onChange(item.id);
              clearErrorOnChange(name, errors, clearErrors);
            }}
          />
        )}
      />

      {/* Amount */}
      <Controller
        name="amount"
        control={control}
        render={({ field: { name, value, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            label="Amount"
            placeholder="0"
            errorMessage={error?.message}
            value={formatCurrency(value)}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      {/* Date */}
      <Controller
        name="date"
        control={control}
        render={({ field: { name, onChange, ...rest }, fieldState: { error } }) => (
          <Input
            type="date"
            label="Date"
            errorMessage={error?.message}
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      {/* Note */}
      <Controller
        name="note"
        control={control}
        render={({ field: { name, onChange, ...rest } }) => (
          <Input
            label="Note (optional)"
            placeholder="Add a note..."
            onChange={(e) => {
              onChange(e.target.value);
              clearErrorOnChange(name, errors, clearErrors);
            }}
            {...rest}
          />
        )}
      />

      <Button type="submit" size="lg" disabled={!enableSubmit} className="w-full">
        Submit
      </Button>
    </form>
  );
};
