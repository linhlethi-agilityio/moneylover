import { Suspense } from 'react';

// Components
import { OnboardingContent, OnboardingSkeleton } from '@/components';

const OnboardingPage = () => (
  <div className="flex flex-col gap-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">Create your first wallet</h2>
      <p className="mt-1 text-sm text-gray-500">You can add more wallets later.</p>
    </div>

    <Suspense fallback={<OnboardingSkeleton />}>
      <OnboardingContent />
    </Suspense>
  </div>
);

export default OnboardingPage;
