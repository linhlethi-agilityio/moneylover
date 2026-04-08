'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';

// Constants
import { ERROR_MESSAGES, IMAGES, SUCCESS_MESSAGES } from '@/constants';

// Types
import { Category, Transaction } from '@/types';

// Actions
import { deleteTransaction } from '@/actions';

// Hooks
import { useToast } from '@/hooks';

// Services
import { getTransactionDetailById } from '@/services';

// Utils
import { formattedBalance } from '@/utils';

// Components
import {
  TransactionItem,
  CategoryInfo,
  TransactionDetailModal,
  LoadingIndicator,
  ConfirmModal,
  TransactionForm,
  Modal,
} from '@/components';

export interface TransactionWithCategory extends Transaction {
  category: Category;
}

interface TransactionListProps {
  userId?: string;
  walletId?: string;
  inflow: number;
  outflow: number;
  groupedByCategory: Record<string, TransactionWithCategory[]>;
  currency?: string;
  expenseCategories?: Category[];
  incomeCategories?: Category[];
}

export const TransactionList = ({
  userId = '',
  walletId = '',
  inflow,
  outflow,
  groupedByCategory,
  currency,
  expenseCategories = [],
  incomeCategories = [],
}: TransactionListProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionWithCategory | null>(
    null,
  );
  const [isPending, startTransition] = useTransition();
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);
  const { showToast } = useToast();
  const isTransactions = Object.keys(groupedByCategory).length > 0;

  const handleTransactionClick = (id: string) => {
    startTransition(async () => {
      const data = await getTransactionDetailById(id);

      if (data) {
        setSelectedTransaction(data);
      }
    });
  };

  const handleOpenTransactionModal = () => {
    setIsOpenTransactionModal(true);
  };

  const handleEditTransaction = () => {
    if (!selectedTransaction) return;

    startTransition(async () => {
      const data = await getTransactionDetailById(selectedTransaction.id);

      if (data) {
        setSelectedTransaction(data);
      }

      setIsOpenTransactionModal(false);
    });
  };

  const handleDeleteTransaction = () => {
    setIsOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedTransaction) return;

    startTransition(async () => {
      const { id = '' } = selectedTransaction;

      const error = await deleteTransaction(id);

      if (error) {
        return showToast({
          status: 'error',
          title: ERROR_MESSAGES.SOMETHING_WENT_WRONG,
          description: error,
        });
      }

      showToast({ status: 'success', title: SUCCESS_MESSAGES.TRANSACTION_DELETED });
      setIsOpenConfirmModal(false);
      setSelectedTransaction(null);
    });
  };

  const handleCloseTransactionDetailModal = () => {
    setSelectedTransaction(null);
  };

  const handleCloseConfirmModal = () => {
    setIsOpenConfirmModal(false);
  };

  const handleCloseEditTransactionModal = () => {
    setIsOpenTransactionModal(false);
  };

  return (
    <>
      {isPending && <LoadingIndicator />}
      {isTransactions ? (
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="space-y-1 px-4 py-3">
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Inflow</p>
                <p className="text-sm font-medium text-blue-500">
                  {formattedBalance(inflow, currency, false)}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Outflow</p>
                <p className="text-sm font-medium text-red-500">
                  -{formattedBalance(outflow, currency, false)}
                </p>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-1">
                <div />
                <p className="text-sm font-semibold text-gray-900">
                  {formattedBalance(inflow - outflow, currency)}
                </p>
              </div>
            </div>
          </div>

          {Object.entries(groupedByCategory).map(([categoryId, transactions]) => {
            const category = transactions[0]?.category;

            const { name = '', image_url = '' } = category || {};
            const totalAmount = transactions.reduce((sum, t) => sum + (t.amount ?? 0), 0);

            return (
              <div key={categoryId} className="rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3">
                  <CategoryInfo name={name} imageUrl={image_url} />
                  <p className="text-xs text-gray-400">{transactions.length} Transactions</p>
                  <div className="flex-1" />
                  <p className="text-sm font-semibold text-gray-900">
                    {formattedBalance(totalAmount, currency, false)}
                  </p>
                </div>

                {transactions.map((t) => (
                  <TransactionItem
                    key={t.id}
                    date={t.date}
                    note={t.note}
                    amount={t.amount}
                    type={t.type}
                    currency={currency}
                    onClick={() => handleTransactionClick(t.id)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-12">
          <Image src={IMAGES.NO_TRANSACTIONS} alt="No transactions" width={120} height={120} />
          <p className="text-sm text-gray-400">No transactions</p>
        </div>
      )}

      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          currency={currency}
          onEdit={handleOpenTransactionModal}
          onDelete={handleDeleteTransaction}
          onClose={handleCloseTransactionDetailModal}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          isOpen
          title="Delete transaction"
          description="Are you sure you want to delete this transaction?"
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseConfirmModal}
        />
      )}

      {isOpenTransactionModal && (
        <Modal isOpen title="Update Transaction" onClose={handleCloseEditTransactionModal}>
          <TransactionForm
            userId={userId}
            walletId={walletId}
            expenseCategories={expenseCategories}
            previewData={selectedTransaction ?? undefined}
            incomeCategories={incomeCategories}
            onSubmit={handleEditTransaction}
          />
        </Modal>
      )}
    </>
  );
};
