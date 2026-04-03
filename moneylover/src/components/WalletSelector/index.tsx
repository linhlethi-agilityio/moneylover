'use client';

import { useEffect, useRef, useState, useTransition } from 'react';

// Icons
import { ChevronRightIcon } from '@/icons';

// Constants
import { ERROR_MESSAGES, IMAGES, SUCCESS_MESSAGES } from '@/constants';

// Utils
import { formattedBalance } from '@/utils';

// Types
import { Wallet } from '@/types';

// Actions
import { deleteWallet } from '@/actions';

// Hooks
import { useToast } from '@/hooks';

// Components
import {
  Avatar,
  WalletList,
  Modal,
  WalletForm,
  ConfirmModal,
  WalletSelectorSkeleton,
} from '@/components';

interface WalletSelectorProps {
  userId: string;
  email: string;
  totalBalance: number;
  currency: string;
  wallets: Wallet[];
}

export const WalletSelector = ({
  userId,
  email,
  totalBalance,
  currency,
  wallets,
}: WalletSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddWalletModal, setIsOpenAddWalletModal] = useState(false);
  const [idWalletEdit, setIdWalletEdit] = useState<string | null>(null);
  const [idWalletDelete, setIdWalletDelete] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleAddWallet = () => {
    setIsOpen(false);
    setIsOpenAddWalletModal(true);
  };

  const handleEditWallet = (id: string) => {
    setIsOpen(false);
    setIdWalletEdit(id);
  };

  const handleCloseEditModal = () => setIdWalletEdit(null);

  const handleDeleteWallet = (id: string) => {
    setIsOpen(false);
    setIdWalletDelete(id);
  };

  const handleConfirmDelete = () => {
    if (!idWalletDelete) return;

    startTransition(async () => {
      const error = await deleteWallet(idWalletDelete);

      setIdWalletDelete(null);

      if (error) {
        return showToast({
          status: 'error',
          title: ERROR_MESSAGES.UNKNOWN_ERROR,
          description: error,
        });
      }

      showToast({
        status: 'success',
        title: SUCCESS_MESSAGES.WALLET_DELETED,
      });
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCloseAddWalletModal = () => setIsOpenAddWalletModal(false);

  const walletDelete = wallets.find((w) => w.id === idWalletDelete);
  const walletEdit = wallets.find((w) => w.id === idWalletEdit);

  const handleCloseDeleteModal = () => setIdWalletDelete(null);

  return (
    <>
      <div ref={ref} className="relative flex cursor-pointer items-center gap-3">
        {pending ? (
          <WalletSelectorSkeleton />
        ) : (
          <div className="flex items-center gap-3" onClick={handleToggle}>
            <Avatar size="sm" src={IMAGES.TRANSACTION} />
            <div>
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-gray-800">{email}</p>
                <ChevronRightIcon className="rotate-90" />
              </div>
              <p className="text-sm font-semibold text-green-600">
                {formattedBalance(totalBalance, currency)}
              </p>
            </div>
          </div>
        )}

        {isOpen && (
          <WalletList
            wallets={wallets}
            totalBalance={totalBalance}
            currency={currency}
            onAddWallet={handleAddWallet}
            onEditWallet={handleEditWallet}
            onDeleteWallet={handleDeleteWallet}
          />
        )}
      </div>

      {isOpenAddWalletModal && (
        <Modal isOpen title="Add Wallet" onClose={handleCloseAddWalletModal}>
          <WalletForm userId={userId} showBalance onSubmit={handleCloseAddWalletModal} />
        </Modal>
      )}

      {idWalletEdit && (
        <Modal isOpen title="Edit Wallet" onClose={handleCloseEditModal}>
          <WalletForm
            userId={userId}
            showBalance
            previewData={walletEdit}
            onSubmit={handleCloseEditModal}
          />
        </Modal>
      )}

      {idWalletDelete && (
        <ConfirmModal
          isOpen
          title="Delete Wallet"
          description={`Are you sure you want to delete "${walletDelete?.name}"? This action cannot be undone.`}
          confirmLabel="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteModal}
        />
      )}
    </>
  );
};
