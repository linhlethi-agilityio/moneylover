import { type ChangeEvent, type InputHTMLAttributes } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// Components
import { Input } from '@/components';

// Icons
import { SearchIcon } from '@/icons';

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (query: string) => void;
}

const SearchInput = ({
  defaultValue = '',
  placeholder = 'Search...',
  onSearch,
  ...props
}: SearchInputProps) => {
  const handleSearch = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
    // TODO: Implement search logic
    console.log('Search query:', e.target.value);
    onSearch?.(e.target.value);
  }, 500);

  return (
    <Input
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={handleSearch}
      rightIcon={<SearchIcon width={20} height={20} />}
      {...props}
    />
  );
};

export default SearchInput;
