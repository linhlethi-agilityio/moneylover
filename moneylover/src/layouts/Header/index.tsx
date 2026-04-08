'use client';

import { useState } from 'react';

// Types
import { Category, Wallet } from '@/types';

// Components
import { Button, SearchInput, WalletSelector, Modal, TransactionForm } from '@/components';

interface HeaderProps {
  userId: string;
  email: string;
  totalBalance: number;
  currency: string;
  wallets: Wallet[];
  expenseCategories?: Category[];
  incomeCategories?: Category[];
}

const Header = ({
  userId,
  email,
  totalBalance,
  currency,
  wallets,
  expenseCategories = [],
  incomeCategories = [],
}: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchValue = (query: string) => {
    //TODO: Implement search logic
    console.log('Search query:', query);
  };

  const handleOpenAddTransaction = () => {
    setIsOpen(true);
  };

  const handleCloseAddTransaction = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="relative z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 max-w-full gap-4">
        <WalletSelector
          userId={userId}
          email={email}
          totalBalance={totalBalance}
          currency={currency}
          wallets={wallets}
        />

        <div className="w-full max-w-sm">
          <SearchInput onSearch={handleSearchValue} />
        </div>

        <Button className="shrink-0 uppercase" onClick={handleOpenAddTransaction}>
          Add Transaction
        </Button>
      </header>

      {isOpen && (
        <Modal isOpen title="Add Transaction" onClose={handleCloseAddTransaction}>
          <TransactionForm
            userId={userId}
            walletId={wallets[0]?.id}
            expenseCategories={expenseCategories}
            incomeCategories={incomeCategories}
            onSubmit={handleCloseAddTransaction}
          />
        </Modal>
      )}
    </>
  );
};

export default Header;
