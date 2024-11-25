import type { ToastType } from '@/shared/types/toastTypes';
import type { AlertProps } from '@mui/material/Alert';
import type { ReactElement, ReactNode } from 'react';

import { ToastContext } from '@/shared/utils/ToastContext';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import React, { useState } from 'react';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ToastProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<ToastType>('success');

  const showToast = (type: ToastType, msg: string): void => {
    setSeverity(type);
    setMessage(msg);
    setIsOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  const value = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

