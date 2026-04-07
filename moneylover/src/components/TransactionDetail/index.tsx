// Types
import { FinanceType, Transaction } from '@/types';

// Constants
import { CURRENCIES } from '@/constants';

// Utils
import { cn, formattedBalance, getFullDate } from '@/utils';

// Components
import { Button, CategoryInfo, Modal } from '@/components';

interface TransactionDetailProps {
  transaction: Transaction;
  currency?: string;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const TransactionDetailModal = ({
  transaction,
  currency = CURRENCIES[0].code,
  onEdit,
  onDelete,
  onClose,
}: TransactionDetailProps) => {
  const { category, amount, type, note, date } = transaction;
  const { name = '', image_url = '' } = category || {};

  return (
    <Modal isOpen title="Transaction detail" onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="text-xs font-semibold text-red-500 uppercase hover:text-red-500"
          >
            Delete
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="text-xs font-semibold text-lime-600 uppercase hover:text-lime-600"
          >
            Edit
          </Button>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex flex-col gap-3">
            <CategoryInfo name={name} imageUrl={image_url} />
            {note && <p className="text-sm text-gray-500">{note}</p>}
            <p className="text-xs text-gray-400">{getFullDate(date)}</p>
            <hr className="border-gray-100" />
            <p
              className={cn(
                'text-2xl font-semibold',
                type === FinanceType.Income ? 'text-blue-500' : 'text-red-500',
              )}
            >
              {formattedBalance(amount, currency, true, type !== FinanceType.Income)}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
