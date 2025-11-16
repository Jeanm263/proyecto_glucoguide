import { useState } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string, 
    type: 'success' | 'error' | 'warning' | 'info' = 'info',
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const toastSuccess = (message: string) => showToast(message, 'success');
  const toastError = (message: string) => showToast(message, 'error');
  const toastWarning = (message: string) => showToast(message, 'warning');
  const toastInfo = (message: string) => showToast(message, 'info');

  return {
    toasts,
    showToast,
    removeToast,
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo
  };
};