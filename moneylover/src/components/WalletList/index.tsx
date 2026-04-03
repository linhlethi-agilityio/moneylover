// Types
import { Wallet } from '@/types';

// Components
import { Button, WalletItem } from '@/components';

interface WalletListProps {
  wallets: Wallet[];
  totalBalance: number;
  currency?: string;
  onAddWallet?: () => void;
  onEditWallet?: () => void;
  onDeleteWallet?: () => void;
}

export const WalletList = ({
  wallets,
  totalBalance,
  currency,
  onAddWallet,
  onEditWallet,
  onDeleteWallet,
}: WalletListProps) => {
  return (
    <div className="absolute left-0 top-full z-10 mt-2 min-w-64 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
      <WalletItem name="Total" balance={totalBalance} currency={currency} />
      {wallets.length > 0 && (
        <p className="px-4 py-2 text-xs font-medium uppercase text-gray-400">Included in Total</p>
      )}
      <div className="scrollbar-thin max-h-72 overflow-y-auto">
        {wallets.map((wallet) => {
          const { id = '', name = '', balance = 0, currency = '' } = wallet;

          return (
            <WalletItem
              key={id}
              name={name}
              balance={balance}
              currency={currency}
              showMenu
              onEdit={onEditWallet}
              onDelete={onDeleteWallet}
            />
          );
        })}
      </div>
      <Button
        variant="ghost"
        onClick={onAddWallet}
        className="w-full justify-start gap-2 rounded-none px-4 py-3 text-sm font-medium text-lime-600 hover:text-lime-600"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-lime-100 text-lime-600">
          +
        </span>
        Add Wallet
      </Button>
    </div>
  );
};
