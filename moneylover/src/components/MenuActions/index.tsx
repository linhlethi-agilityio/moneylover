'use client';

import { useState } from 'react';

// Icons
import { MoreVerticalIcon } from '@/icons';

// Components
import { Button } from '@/components';

interface MenuActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MenuActions = ({ onEdit, onDelete }: MenuActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleEdit = () => {
    onEdit?.();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={handleToggle} className="h-6 w-6 p-0">
        <MoreVerticalIcon />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-28 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleEdit}
            className="w-full justify-start rounded-none px-3 py-1.5 text-xs text-gray-700"
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="w-full justify-start rounded-none px-3 py-1.5 text-xs text-red-500 hover:text-red-500"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};
