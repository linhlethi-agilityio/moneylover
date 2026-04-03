// Types
import { Category, FinanceType } from '@/types';

// Components
import { CategoryItem } from '@/components/CategoryItem';

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList = ({ categories }: CategoryListProps) => {
  const expenseCategories = categories.filter((c) => c.type === FinanceType.Expense);
  const incomeCategories = categories.filter((c) => c.type === FinanceType.Income);

  return categories.length === 0 ? (
    <p className="py-8 text-center text-sm text-gray-400">No categories yet</p>
  ) : (
    <div className="flex flex-col gap-6">
      {expenseCategories.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white">
          <p className="px-4 py-2 text-xs font-medium uppercase text-gray-400">Expense</p>
          {expenseCategories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      )}

      {incomeCategories.length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white">
          <p className="px-4 py-2 text-xs font-medium uppercase text-gray-400">Income</p>
          {incomeCategories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};
