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

const LoadingIndicator = ({ size = 'md', className }: LoadingIndicatorProps) => (
  <div
    className={cn(
      'animate-spin rounded-full border-gray-300 border-t-lime-600',
      sizes[size],
      className,
    )}
  />
);

export default LoadingIndicator;
