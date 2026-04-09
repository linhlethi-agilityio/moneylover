import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

// Services
import { getWalletsInfo, getCategoriesInfo } from '@/services';

// Configs
import { auth } from '@/configs/auth';

// Constants
import { ROUTES } from '@/constants';

// Layouts
import { Header } from '@/layouts';

export const DashboardContent = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  const { user } = session || {};
  const userId = user?.id || '';

  const { wallets, totalBalance, currency } = await getWalletsInfo(userId);
  const { expenseCategories, incomeCategories } = await getCategoriesInfo(userId);

  if (!wallets.length) {
    redirect(ROUTES.ONBOARDING);
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header
        userId={userId}
        totalBalance={totalBalance}
        currency={currency}
        wallets={wallets}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
      />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
};
