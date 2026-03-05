import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (message: string, title?: string, duration?: number) => void;
  error: (message: string, title?: string, duration?: number) => void;
  warning: (message: string, title?: string, duration?: number) => void;
  info: (message: string, title?: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<Toast, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast = { ...toast, id };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        return updated.slice(-maxToasts);
      });

      // Auto-dismiss
      if (toast.duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration || 5000);
      }
    },
    [maxToasts, removeToast]
  );

  const success = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ type: 'success', title, message, duration });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ type: 'error', title, message, duration });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ type: 'warning', title, message, duration });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, title?: string, duration?: number) => {
      addToast({ type: 'info', title, message, duration });
    },
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, warning, info }}
    >
      {children}
      <ToastContainer toasts={toasts} position={position} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  position: ToastPosition;
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, position, onRemove }) => {
  const positionStyles: Record<ToastPosition, React.CSSProperties> = {
    'top-left': { top: 'var(--space-4)', left: 'var(--space-4)' },
    'top-center': { top: 'var(--space-4)', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 'var(--space-4)', right: 'var(--space-4)' },
    'bottom-left': { bottom: 'var(--space-4)', left: 'var(--space-4)' },
    'bottom-center': { bottom: 'var(--space-4)', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 'var(--space-4)', right: 'var(--space-4)' },
  };

  return (
    <div
      className="fixed z-50 flex flex-col gap-3 pointer-events-none"
      style={{
        ...positionStyles[position],
        zIndex: 'var(--z-notification)',
        gap: 'var(--space-3)',
      }}
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: () => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const typeConfig = {
    success: {
      icon: CheckCircle,
      bg: 'var(--color-success-50)',
      border: 'var(--color-success-500)',
      text: 'var(--color-success-700)',
      iconColor: 'var(--color-success-500)',
    },
    error: {
      icon: AlertCircle,
      bg: 'var(--color-error-50)',
      border: 'var(--color-error-500)',
      text: 'var(--color-error-700)',
      iconColor: 'var(--color-error-500)',
    },
    warning: {
      icon: AlertTriangle,
      bg: 'var(--color-warning-50)',
      border: 'var(--color-warning-500)',
      text: 'var(--color-warning-700)',
      iconColor: 'var(--color-warning-500)',
    },
    info: {
      icon: Info,
      bg: 'var(--color-info-50)',
      border: 'var(--color-info-500)',
      text: 'var(--color-info-700)',
      iconColor: 'var(--color-info-500)',
    },
  };

  const config = typeConfig[toast.type];
  const Icon = config.icon;

  return (
    <div
      className="pointer-events-auto animate-slide-in-right"
      style={{
        minWidth: '320px',
        maxWidth: '420px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        gap: 'var(--space-3)',
      }}
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className="flex-shrink-0" style={{ marginTop: '0.125rem' }}>
        <Icon size={20} style={{ color: config.iconColor }} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p
            className="font-semibold mb-1"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: config.text,
            }}
          >
            {toast.title}
          </p>
        )}
        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: config.text,
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {toast.message}
        </p>

        {/* Action button */}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 font-medium hover:underline transition-all"
            style={{
              fontSize: 'var(--font-size-sm)',
              color: config.iconColor,
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={onRemove}
        className="flex-shrink-0 hover:opacity-70 transition-opacity"
        style={{
          width: '20px',
          height: '20px',
          color: config.text,
        }}
        aria-label="Fermer"
      >
        <X size={16} />
      </button>
    </div>
  );
};

/**
 * Hook standalone (si ToastProvider n'est pas utilisé)
 */
export const useToastStandalone = () => {
  // Cette version utilise react-hot-toast comme fallback
  // ou vous pouvez implémenter une version simple avec state local
  const toast = {
    success: (message: string, title?: string) => {
      console.log('Toast Success:', title, message);
      // Implémenter avec react-hot-toast si disponible
    },
    error: (message: string, title?: string) => {
      console.log('Toast Error:', title, message);
    },
    warning: (message: string, title?: string) => {
      console.log('Toast Warning:', title, message);
    },
    info: (message: string, title?: string) => {
      console.log('Toast Info:', title, message);
    },
  };

  return toast;
};

export default ToastProvider;
