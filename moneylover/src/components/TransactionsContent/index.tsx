// Services
import { getCategoriesInfo, getTransactionsByDate, getWalletsInfo } from '@/services';

// Configs
import { auth } from '@/configs/auth';

// Utils
import { getMonthRange } from '@/utils';

// Components
import { TransactionList } from '@/components/TransactionList';

interface TransactionsContentProps {
  period: string;
  query?: string;
}

export const TransactionsContent = async ({ period, query = '' }: TransactionsContentProps) => {
  const session = await auth();
  const userId = session?.user?.id || '';

  const { startDate, endDate } = getMonthRange(period);
  const { inflow, outflow, groupedByCategory } = await getTransactionsByDate(
    userId,
    startDate,
    endDate,
    query,
  );

  const { expenseCategories, incomeCategories } = await getCategoriesInfo(userId);
  const { wallets } = await getWalletsInfo(userId);

  return (
    <TransactionList
      userId={userId}
      wallets={wallets}
      inflow={inflow}
      outflow={outflow}
      groupedByCategory={groupedByCategory}
      expenseCategories={expenseCategories}
      incomeCategories={incomeCategories}
    />
  );
};
