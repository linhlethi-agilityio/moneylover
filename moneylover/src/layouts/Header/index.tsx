'use client';

// Types
import { Wallet } from '@/types';

// Components
import { Button, SearchInput, WalletSelector } from '@/components';

interface HeaderProps {
  email: string;
  totalBalance: number;
  currency: string;
  wallets: Wallet[];
}

const Header = ({ email, totalBalance, currency, wallets }: HeaderProps) => {
  const handleSearchValue = (query: string) => {
    //TODO: Implement search logic
    console.log('Search query:', query);
  };

  return (
    <header className="relative z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 max-w-full gap-4">
      <WalletSelector
        email={email}
        totalBalance={totalBalance}
        currency={currency}
        wallets={wallets}
      />

      <div className="w-full max-w-sm">
        <SearchInput onSearch={handleSearchValue} />
      </div>

      <Button className="shrink-0 uppercase">Add Transaction</Button>
    </header>
  );
};

export default Header;
