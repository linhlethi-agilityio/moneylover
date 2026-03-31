'use client';

// Utils
import { cn } from '@/utils';

// Components
import { Button } from '@/components';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

const ConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  className,
}: ConfirmModalProps) => {
  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className={cn('w-full max-w-md rounded-xl bg-white p-6 shadow-lg', className)}>
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button onClick={onConfirm}>{confirmLabel}</Button>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmModal;
