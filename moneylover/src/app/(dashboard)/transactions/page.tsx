import { Suspense } from 'react';

// Constants
import { Period } from '@/constants';

// Components
import { TransactionSkeleton, TransactionTabs, TransactionsContent } from '@/components';

interface TransactionsPageProps {
  searchParams: Promise<{ period?: string }>;
}

const TransactionsPage = async ({ searchParams }: TransactionsPageProps) => {
  const { period = Period.This } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="flex flex-col gap-4">
        <TransactionTabs period={period} />
        <Suspense key={period} fallback={<TransactionSkeleton />}>
          <TransactionsContent period={period} />
        </Suspense>
      </div>
    </div>
  );
};

export default TransactionsPage;
