import { type Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Overview of your wallets and recent transactions.',
};

// Components
import { HomeSkeleton, HomeContent } from '@/components';

const DashboardPage = () => {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
};

export default DashboardPage;
