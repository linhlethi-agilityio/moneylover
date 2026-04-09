import { Suspense } from 'react';

// Constants
import { Period } from '@/constants';

// Types
import { SearchParams } from '@/types';

// Components
import { TransactionSkeleton, TransactionTabs, TransactionsContent } from '@/components';

interface TransactionsPageProps {
  searchParams: SearchParams;
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const { period = Period.This, query = '' } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="flex flex-col gap-4">
        <TransactionTabs period={period} />
        <Suspense key={`${period}-${query}`} fallback={<TransactionSkeleton />}>
          <TransactionsContent period={period} query={query} />
        </Suspense>
      </div>
    </div>
  );
};

export default TransactionsPage;
