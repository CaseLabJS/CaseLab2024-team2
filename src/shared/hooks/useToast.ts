import type { ToastContextType } from '@/shared/types/toastTypes';

import { useContext } from 'react';

import { ToastContext } from '../utils/ToastContext';

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('App не обернут в ToastProvider');
  }
  return context;
};

export default useToast;

