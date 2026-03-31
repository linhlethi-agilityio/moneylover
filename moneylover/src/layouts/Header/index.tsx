'use client';

// Constants
import { IMAGES } from '@/constants';

// Mocks
import { MOCK_USER } from '@/mocks';

// Utils
import { formattedBalance } from '@/utils';

// Components
import { Avatar, Button, SearchInput } from '@/components';

const Header = () => {
  const handleSearchValue = (query: string) => {
    //TODO: Implement search logic
    console.log('Search query:', query);
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 max-w-full overflow-hidden gap-4">
      <div className="flex items-center gap-3">
        <Avatar size="sm" src={IMAGES.TRANSACTION} />
        <div>
          <p className="text-sm font-medium text-gray-800">{MOCK_USER.username}</p>
          <p className="text-sm font-semibold text-green-600">
            {formattedBalance(MOCK_USER.totalBalance)}
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm">
        <SearchInput onSearch={handleSearchValue} />
      </div>

      <Button className="shrink-0 uppercase">Add Transaction</Button>
    </header>
  );
};

export default Header;
