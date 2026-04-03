// Mocks
import { MOCK_CATEGORIES } from '@/mocks';

// Components
import { CategoryList } from '@/components';

const CategoriesPage = () => (
  <div className="mx-auto max-w-2xl bg-gray-50 p-6">
    <CategoryList categories={MOCK_CATEGORIES} />
  </div>
);

export default CategoriesPage;
