// Utils
import { cn } from '@/utils';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md';
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
};

export const LoadingIndicator = ({ size = 'md', className }: LoadingIndicatorProps) => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/10">
    <div
      className={cn(
        'animate-spin rounded-full border-lime-500 border-t-transparent',
        sizes[size],
        className,
      )}
    />
  </div>
);
