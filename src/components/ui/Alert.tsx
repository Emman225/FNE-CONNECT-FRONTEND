import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, X } from 'lucide-react';

export interface AlertProps {
    /**
     * The variant of the alert.
     * @default 'info'
     */
    variant?: 'success' | 'warning' | 'error' | 'info';

    /**
     * The title of the alert.
     */
    title?: string;

    /**
     * The content of the alert.
     */
    children?: React.ReactNode;

    /**
     * Whether the alert is removable.
     * @default false
     */
    removable?: boolean;

    /**
     * Callback when the alert is removed.
     */
    onRemove?: () => void;

    /**
     * Additional class names.
     */
    className?: string;
}

const Alert: React.FC<AlertProps> = ({
    variant = 'info',
    title,
    children,
    removable = false,
    onRemove,
    className = '',
}) => {
    const variantStyles = {
        success: {
            bg: 'var(--color-success-50)',
            text: 'var(--color-success-700)',
            border: 'var(--color-success-200)',
            iconColor: 'var(--color-success-500)',
            Icon: CheckCircle,
        },
        warning: {
            bg: 'var(--color-warning-50)',
            text: 'var(--color-warning-700)',
            border: 'var(--color-warning-200)',
            iconColor: 'var(--color-warning-500)',
            Icon: AlertTriangle,
        },
        error: {
            bg: 'var(--color-error-50)',
            text: 'var(--color-error-700)',
            border: 'var(--color-error-200)',
            iconColor: 'var(--color-error-500)',
            Icon: XCircle,
        },
        info: {
            bg: 'var(--color-info-50)',
            text: 'var(--color-info-700)',
            border: 'var(--color-info-200)',
            iconColor: 'var(--color-info-500)',
            Icon: Info,
        },
    };

    const style = variantStyles[variant];
    const Icon = style.Icon;

    return (
        <div
            className={`
        flex items-start p-4 rounded-md border
        ${className}
      `}
            style={{
                backgroundColor: style.bg,
                borderColor: style.border,
            }}
            role="alert"
        >
            <div className="flex-shrink-0">
                <Icon size={20} style={{ color: style.iconColor }} />
            </div>
            <div className="ml-3 flex-1">
                {title && (
                    <h3
                        className="text-sm font-medium mb-1"
                        style={{ color: style.text }}
                    >
                        {title}
                    </h3>
                )}
                <div
                    className="text-sm"
                    style={{ color: style.text, opacity: 0.9 }}
                >
                    {children}
                </div>
            </div>
            {removable && (
                <div className="ml-auto pl-3">
                    <div className="-mx-1.5 -my-1.5">
                        <button
                            type="button"
                            onClick={onRemove}
                            className="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2"
                            style={{
                                color: style.text,
                                backgroundColor: style.bg, // Matches background to look seamless
                            }}
                        >
                            <span className="sr-only">Dismiss</span>
                            <X size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Alert;
