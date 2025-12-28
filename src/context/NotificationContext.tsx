import React, { createContext, useContext, ReactNode } from 'react';
import toast, { Toaster, ToastOptions } from 'react-hot-toast';

interface NotificationContextType {
    showSuccess: (message: string, options?: ToastOptions) => void;
    showError: (message: string, options?: ToastOptions) => void;
    showInfo: (message: string, options?: ToastOptions) => void;
    showWarning: (message: string, options?: ToastOptions) => void;
    showLoading: (message: string) => string;
    dismissToast: (toastId?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const showSuccess = (message: string, options: ToastOptions = {}) => {
        toast.success(message, {
            duration: 4000,
            position: 'top-right',
            style: {
                background: '#10b981',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '500'
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
            },
            ...options
        });
    };

    const showError = (message: string, options: ToastOptions = {}) => {
        toast.error(message, {
            duration: 5000,
            position: 'top-right',
            style: {
                background: '#ef4444',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '500'
            },
            iconTheme: {
                primary: '#fff',
                secondary: '#ef4444',
            },
            ...options
        });
    };

    const showInfo = (message: string, options: ToastOptions = {}) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            icon: 'ℹ️',
            style: {
                background: '#0ea5e9',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '500'
            },
            ...options
        });
    };

    const showWarning = (message: string, options: ToastOptions = {}) => {
        toast(message, {
            duration: 4000,
            position: 'top-right',
            icon: '⚠️',
            style: {
                background: '#f59e0b',
                color: '#fff',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '500'
            },
            ...options
        });
    };

    const showLoading = (message: string) => {
        return toast.loading(message, {
            position: 'top-right',
            style: {
                background: '#fff',
                color: '#1e293b',
                padding: '16px',
                borderRadius: '8px',
                fontWeight: '500'
            }
        });
    };

    const dismissToast = (toastId?: string) => {
        toast.dismiss(toastId);
    };

    const value: NotificationContextType = {
        showSuccess,
        showError,
        showInfo,
        showWarning,
        showLoading,
        dismissToast
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            <Toaster />
        </NotificationContext.Provider>
    );
};
