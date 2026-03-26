import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

// Utils
import { cn } from '@/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, id, rightIcon, ...props }, ref) => (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-xs text-gray-400">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border border-gray-400 px-3 py-3 text-sm text-gray-900',
            'placeholder:text-gray-300',
            'focus:border-lime-600 focus:outline-none',
            'disabled:cursor-not-allowed disabled:border-gray-200 disabled:opacity-50',
            rightIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  ),
);

Input.displayName = 'Input';

export default Input;
