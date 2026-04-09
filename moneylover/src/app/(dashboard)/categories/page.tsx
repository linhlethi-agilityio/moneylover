import { Suspense } from 'react';

// Types
import { SearchParams } from '@/types';

// Components
import { CategorySkeleton, CategoriesContent } from '@/components';

interface CategoriesPageProps {
  searchParams: SearchParams;
}

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const { query = '' } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Suspense key={query} fallback={<CategorySkeleton />}>
        <CategoriesContent query={query} />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;
