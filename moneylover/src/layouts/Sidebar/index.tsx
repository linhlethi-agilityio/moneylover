'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Icons
import { HomeIcon, TransactionIcon, CategoryIcon, ChevronRightIcon } from '@/icons';

// Constants
import { ROUTES } from '@/constants/route';

// Utils
import { cn } from '@/utils';

// Components
import { Avatar, Button } from '@/components';

const navItems = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: HomeIcon },
  { label: 'Transactions', href: ROUTES.TRANSACTIONS, icon: TransactionIcon },
  { label: 'Categories', href: ROUTES.CATEGORIES, icon: CategoryIcon },
];

const Sidebar = () => {
  const pathname = usePathname();

  // TODO: Replace with real user data
  const mockData = {
    username: 'Admin',
    email: 'admin@gmail.com',
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      <div className="flex flex-col items-center gap-2 border-b border-gray-200 py-6">
        <Avatar size="lg" />
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800">{mockData.username}</p>
          <p className="text-xs text-gray-400">{mockData.email}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col px-4 pt-4">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 border-b border-gray-200 px-3 py-4 text-sm transition-colors',
                isActive ? 'text-lime-600 font-medium' : 'text-gray-600 hover:bg-gray-50',
              )}
            >
              <Icon color="currentColor" width={20} height={20} />
              <span className="flex-1">{label}</span>
              <ChevronRightIcon />
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-500"
        >
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
