import { Suspense } from 'react';

// Components
import { CategorySkeleton, CategoriesContent } from '@/components';

const CategoriesPage = () => (
  <div className="mx-auto max-w-2xl p-6">
    <Suspense fallback={<CategorySkeleton />}>
      <CategoriesContent />
    </Suspense>
  </div>
);

export default CategoriesPage;
