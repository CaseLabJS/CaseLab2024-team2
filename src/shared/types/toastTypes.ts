export type ToastType = 'success' | 'error' | 'warning';

export interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
}
