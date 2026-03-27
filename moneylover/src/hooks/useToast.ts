// Libs
import { useContext } from 'react';

// Contexts
import { ToastContext, type TToastContext } from '@/contexts/ToastProvider';

export const useToast = (): TToastContext => useContext(ToastContext);
