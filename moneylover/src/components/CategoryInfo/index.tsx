import Image from 'next/image';

interface CategoryInfoProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md';
}

const sizes = {
  sm: { container: 'h-8 w-8', text: 'text-xs', image: 32 },
  md: { container: 'h-10 w-10', text: 'text-sm', image: 40 },
};

export const CategoryInfo = ({ name, imageUrl, size = 'md' }: CategoryInfoProps) => {
  const { container, text, image } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          width={image}
          height={image}
          className={`${container} shrink-0 rounded-full object-cover`}
        />
      ) : (
        <div
          className={`flex ${container} shrink-0 items-center justify-center rounded-full bg-gray-200 ${text} font-medium text-gray-500`}
        >
          {name.charAt(0)}
        </div>
      )}
      <p className={`${text} font-medium text-gray-900`}>{name}</p>
    </div>
  );
};
