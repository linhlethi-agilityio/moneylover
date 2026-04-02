import { type ReactNode } from 'react';
import { redirect } from 'next/navigation';

// Actions
import { getWalletsInfo } from '@/actions';

// Configs
import { auth } from '@/configs/auth';

// Constants
import { ROUTES } from '@/constants';

// Layouts
import { Header, Sidebar } from '@/layouts';

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const session = await auth();

  const { user } = session || {};
  const userId = user?.id || '';
  const email = user?.email || '';

  const { wallets, totalBalance, currency } = await getWalletsInfo(userId);

  if (!wallets.length) {
    redirect(ROUTES.ONBOARDING);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header
          email={email}
          totalBalance={totalBalance}
          currency={currency}
          wallets={wallets}
        />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
