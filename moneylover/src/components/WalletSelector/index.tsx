'use client';

import { useEffect, useRef, useState } from 'react';

// Icons
import { ChevronRightIcon } from '@/icons';

// Constants
import { IMAGES } from '@/constants';

// Utils
import { formattedBalance } from '@/utils';

// Types
import { Wallet } from '@/types';

// Components
import { Avatar, WalletList } from '@/components';

interface WalletSelectorProps {
  email: string;
  totalBalance: number;
  currency: string;
  wallets: Wallet[];
}

export const WalletSelector = ({ email, totalBalance, currency, wallets }: WalletSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative flex cursor-pointer items-center gap-3">
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

      {isOpen && <WalletList wallets={wallets} totalBalance={totalBalance} currency={currency} />}
    </div>
  );
};
