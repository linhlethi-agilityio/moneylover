import Image from 'next/image';

// Types
import { Category } from '@/types';

interface CategoryItemProps {
  category: Category;
}

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const { name, image_url } = category;

  return (
    <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0">
      {image_url ? (
        <Image
          src={image_url}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
          {name.charAt(0)}
        </div>
      )}
      <p className="text-sm font-medium text-gray-900">{name}</p>
    </div>
  );
};
