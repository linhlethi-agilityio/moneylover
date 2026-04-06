'use client';

import { useMemo, useState } from 'react';

// Types
import { Category, FinanceType } from '@/types';

// Utils
import { cn } from '@/utils';

// Constants
import { CATEGORY_TYPES } from '@/constants';

// Components
import { Button, CategoryItem, Modal, CategoryForm } from '@/components';

interface CategoryListProps {
  userId: string;
  expenseCategories: Category[];
  incomeCategories: Category[];
  subCategories: Category[];
}

export const CategoryList = ({
  userId,
  expenseCategories,
  incomeCategories,
  subCategories,
}: CategoryListProps) => {
  const [activeTab, setActiveTab] = useState<FinanceType>(FinanceType.Expense);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categoriesMap = {
    [FinanceType.Expense]: expenseCategories,
    [FinanceType.Income]: incomeCategories,
  };

  const activeCategories = categoriesMap[activeTab];

  const subCategoriesMap = useMemo(
    () => Object.groupBy(subCategories, (sub) => sub.parent_id ?? ''),
    [subCategories],
  );

  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = () => setIsModalOpen(true);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 rounded-lg bg-gray-200 p-1">
        {CATEGORY_TYPES.map(({ key, label }) => (
          <Button
            key={key}
            variant="ghost"
            onClick={() => setActiveTab(key)}
            className={cn(
              'flex-1 rounded-md py-2 text-sm font-medium',
              activeTab === key
                ? 'bg-white text-gray-900 shadow-sm hover:bg-white'
                : 'bg-transparent text-gray-500 hover:bg-transparent hover:text-gray-700',
            )}
          >
            {label}
          </Button>
        ))}
      </div>

      <Button variant="outline" className="w-full" onClick={handleOpenModal}>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-lime-100 text-xs text-lime-600">
          +
        </span>
        New category
      </Button>

      {activeCategories.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">No categories yet</p>
      ) : (
        <div className="rounded-lg border border-gray-200 bg-white">
          {activeCategories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              subCategories={subCategoriesMap[category.id] ?? []}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen title="New Category" onClose={handleCloseModal}>
          <CategoryForm
            userId={userId}
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
            onSubmit={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};
