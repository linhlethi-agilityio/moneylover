'use client';

import { useRouter, useSearchParams } from 'next/navigation';

// Constants
import { Period, ROUTES } from '@/constants';

// Utils
import { cn, getMonthLabel, getMonthOffset, getOffsetKey } from '@/utils';

// Components
import { Button } from '../Button';

interface TransactionTabsProps {
  period: string;
}

export const TransactionTabs = ({ period }: TransactionTabsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOffset = getMonthOffset(period);
  const isFuture = period === Period.Future;

  const nextOffset = currentOffset + 1;
  const isNextFuture = nextOffset > 0;

  const tabs = isFuture
    ? [
        { key: getOffsetKey(-1), label: getMonthLabel(-1) },
        { key: Period.This, label: 'THIS MONTH' },
        { key: Period.Future, label: 'FUTURE' },
      ]
    : [
        { key: getOffsetKey(currentOffset - 1), label: getMonthLabel(currentOffset - 1) },
        { key: period, label: getMonthLabel(currentOffset) },
        {
          key: isNextFuture ? Period.Future : getOffsetKey(nextOffset),
          label: isNextFuture ? 'FUTURE' : getMonthLabel(nextOffset),
        },
      ];

  const handleTabChange = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('period', key);
    router.push(`${ROUTES.TRANSACTIONS}?${params.toString()}`);
  };

  return (
    <div className="flex items-center rounded-lg border border-gray-200 bg-white">
      {tabs.map(({ key, label }) => (
        <Button
          key={key}
          variant="ghost"
          onClick={() => handleTabChange(key)}
          className={cn(
            'flex-1 rounded-none py-3 text-xs font-medium',
            key === period
              ? 'border-b-2 border-lime-600 text-lime-600 hover:text-lime-600'
              : 'text-gray-400 hover:text-gray-600',
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
