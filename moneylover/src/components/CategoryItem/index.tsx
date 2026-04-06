'use client';

import { useState } from 'react';

// Icons
import { ChevronRightIcon } from '@/icons';

// Types
import { Category } from '@/types';

// Components
import { CategoryInfo } from '@/components/CategoryInfo';

interface CategoryItemProps {
  category: Category;
  subCategories?: Category[];
}

export const CategoryItem = ({ category, subCategories = [] }: CategoryItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = subCategories.length > 0;

  const handleOpenChildrenCategory = () => {
    if (hasChildren) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div>
      <div
        className="flex cursor-pointer items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50"
        onClick={handleOpenChildrenCategory}
      >
        <CategoryInfo name={category.name} imageUrl={category.image_url} />
        <div className="flex-1" />
        {hasChildren && (
          <ChevronRightIcon className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
        )}
      </div>

      {isExpanded && (
        <div className="border-b border-gray-100 bg-gray-50 pl-8">
          {subCategories.map((sub) => (
            <div
              key={sub.id}
              className="border-b border-gray-100 px-4 py-2.5 last:border-b-0"
            >
              <CategoryInfo name={sub.name} imageUrl={sub.image_url} size="sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
