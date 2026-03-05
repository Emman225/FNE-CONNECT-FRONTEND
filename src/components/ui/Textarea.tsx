import React, { forwardRef, useId } from 'react';
import { AlertCircle, Check } from 'lucide-react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    success?: boolean;
    successMessage?: string;
    showCount?: boolean;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    wrapperClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            helperText,
            error,
            success,
            successMessage,
            showCount = false,
            size = 'md',
            fullWidth = false,
            wrapperClassName = '',
            className = '',
            disabled,
            maxLength,
            value,
            onChange,
            id,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id || generatedId;
        const hasError = !!error;
        const hasSuccess = success && !hasError;
        const currentValue = value !== undefined ? String(value) : '';
        const charCount = currentValue.length;
        const isNearLimit = maxLength && charCount >= maxLength * 0.9;

        const sizeStyles = {
            sm: { fontSize: 'var(--font-size-sm)', gap: 'var(--space-2)' },
            md: { fontSize: 'var(--font-size-base)', gap: 'var(--space-2)' },
            lg: { fontSize: 'var(--font-size-lg)', gap: 'var(--space-3)' },
        };

        const sizes = sizeStyles[size];

        const getBorderColor = () => {
            if (hasError) return 'var(--color-error-500)';
            if (hasSuccess) return 'var(--color-success-500)';
            return 'var(--color-neutral-300)';
        };

        const getFocusBorderColor = () => {
            if (hasError) return 'var(--color-error-500)';
            if (hasSuccess) return 'var(--color-success-500)';
            return 'var(--color-primary-500)';
        };

        return (
            <div
                className={`flex flex-col ${wrapperClassName}`}
                style={{
                    gap: sizes.gap,
                    width: fullWidth ? '100%' : 'auto',
                }}
            >
                {label && (
                    <label
                        htmlFor={inputId}
                        className="font-medium"
                        style={{
                            fontSize: size === 'sm' ? 'var(--font-size-sm)' : 'var(--font-size-base)',
                            color: hasError ? 'var(--color-error-700)' : 'var(--color-text-primary)',
                            fontWeight: 'var(--font-weight-medium)',
                        }}
                    >
                        {label}
                        {props.required && (
                            <span style={{ color: 'var(--color-error-500)' }}> *</span>
                        )}
                    </label>
                )}

                <div className="relative">
                    <textarea
                        ref={ref}
                        id={inputId}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        maxLength={maxLength}
                        className={`w-full rounded-lg transition-all outline-none font-normal ${className}`}
                        style={{
                            padding: '0.75rem 1rem',
                            backgroundColor: disabled ? 'var(--color-neutral-100)' : 'var(--color-background)',
                            color: 'var(--color-text-primary)',
                            border: `1px solid ${getBorderColor()}`,
                            fontSize: sizes.fontSize,
                            opacity: disabled ? 0.6 : 1,
                            cursor: disabled ? 'not-allowed' : 'text',
                            minHeight: '80px',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = getFocusBorderColor();
                            e.target.style.boxShadow = `0 0 0 3px ${hasError
                                    ? 'var(--color-error-100)'
                                    : hasSuccess
                                        ? 'var(--color-success-100)'
                                        : 'var(--color-primary-100)'
                                }`;
                            props.onFocus?.(e);
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = getBorderColor();
                            e.target.style.boxShadow = 'none';
                            props.onBlur?.(e);
                        }}
                        aria-invalid={hasError}
                        aria-describedby={
                            error
                                ? `${inputId}-error`
                                : helperText
                                    ? `${inputId}-helper`
                                    : undefined
                        }
                        {...props}
                    />

                    {hasError && (
                        <div className="absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--color-error-500)' }}>
                            <AlertCircle size={18} />
                        </div>
                    )}

                    {hasSuccess && (
                        <div className="absolute right-3 top-3 pointer-events-none" style={{ color: 'var(--color-success-500)' }}>
                            <Check size={18} />
                        </div>
                    )}

                </div>

                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        {error && (
                            <p
                                id={`${inputId}-error`}
                                className="animate-fade-in"
                                style={{
                                    color: 'var(--color-error-600)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginTop: '0.25rem',
                                }}
                            >
                                {error}
                            </p>
                        )}

                        {!error && successMessage && hasSuccess && (
                            <p
                                className="animate-fade-in"
                                style={{
                                    color: 'var(--color-success-600)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginTop: '0.25rem',
                                }}
                            >
                                {successMessage}
                            </p>
                        )}

                        {!error && !successMessage && helperText && (
                            <p
                                id={`${inputId}-helper`}
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginTop: '0.25rem',
                                }}
                            >
                                {helperText}
                            </p>
                        )}
                    </div>

                    {showCount && maxLength && (
                        <p
                            className="font-medium ml-2 whitespace-nowrap"
                            style={{
                                color: isNearLimit ? 'var(--color-warning-600)' : 'var(--color-text-secondary)',
                                fontSize: 'var(--font-size-sm)',
                                marginTop: '0.25rem',
                            }}
                        >
                            {charCount}/{maxLength}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;
