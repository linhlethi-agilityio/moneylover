// Configs
import { auth } from '@/configs/auth';

// Services
import { getWalletsInfo, getRecentTransactionsList } from '@/services';

// Components
import { RecentTransactions } from '@/components/RecentTransactions';

export const HomeContent = async () => {
  const session = await auth();
  const userId = session?.user?.id || '';

  const { wallets, currency } = await getWalletsInfo(userId);
  const transactions = await getRecentTransactionsList(userId);

  return (
    <div className="mx-auto max-w-2xl flex flex-col gap-6 p-6">
      <RecentTransactions wallets={wallets} transactions={transactions} currency={currency} />
    </div>
  );
};
