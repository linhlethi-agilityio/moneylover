import { Suspense } from 'react';

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
