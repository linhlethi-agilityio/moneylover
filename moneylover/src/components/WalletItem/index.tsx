// Constants
import { IMAGES } from '@/constants';

// Utils
import { formattedBalance } from '@/utils';

// Components
import { Avatar, MenuActions } from '@/components';

interface WalletItemProps {
  name: string;
  balance: number;
  currency?: string;
  showMenu?: boolean;
  showBalance?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const WalletItem = ({
  name,
  balance,
  currency = '0',
  showMenu = false,
  showBalance = false,
  onEdit,
  onDelete,
}: WalletItemProps) => (
  <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0">
    <Avatar size="sm" src={IMAGES.TRANSACTION} />
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900">{name}</p>
      {!showBalance && (
        <p className="text-xs text-gray-500">{formattedBalance(balance, currency, false)}</p>
      )}
    </div>

    {showBalance && (
      <p className="text-sm font-semibold text-gray-900">
        {formattedBalance(balance, currency, false)}
      </p>
    )}
    {showMenu && <MenuActions onEdit={onEdit} onDelete={onDelete} />}
  </div>
);
