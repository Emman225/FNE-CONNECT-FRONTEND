import React, { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle, Check } from 'lucide-react';

export interface SelectOption {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    helperText?: string;
    error?: string;
    success?: boolean;
    successMessage?: string;
    options: SelectOption[];
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    wrapperClassName?: string;
    prefixIcon?: React.ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            helperText,
            error,
            success,
            successMessage,
            options,
            placeholder = 'Select an option',
            size = 'md',
            fullWidth = false,
            wrapperClassName = '',
            className = '',
            disabled,
            prefixIcon,
            id,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const selectId = id || generatedId;
        const hasError = !!error;
        const hasSuccess = success && !hasError;

        const sizeStyles = {
            sm: { input: 'h-8', padding: 'pl-3 pr-8 py-1', fontSize: 'var(--font-size-sm)', icon: 16, gap: 'var(--space-2)' },
            md: { input: 'h-10', padding: 'pl-4 pr-10 py-2', fontSize: 'var(--font-size-base)', icon: 18, gap: 'var(--space-2)' },
            lg: { input: 'h-12', padding: 'pl-4 pr-10 py-3', fontSize: 'var(--font-size-lg)', icon: 20, gap: 'var(--space-3)' },
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
                        htmlFor={selectId}
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
                    {prefixIcon && (
                        <div
                            className="absolute left-3 top-1/2 flex items-center pointer-events-none"
                            style={{
                                transform: 'translateY(-50%)',
                                color: disabled ? 'var(--color-neutral-400)' : 'var(--color-neutral-500)',
                                zIndex: 10,
                            }}
                        >
                            {prefixIcon}
                        </div>
                    )}

                    <select
                        ref={ref}
                        id={selectId}
                        disabled={disabled}
                        className={`w-full rounded-lg transition-all outline-none appearance-none font-normal ${sizes.input} ${className}`}
                        style={{
                            // Tailwind padding utility already applied in className, but inline style might be needed if exact px matters. 
                            // React input used inline padding, let's strictly follow class if possible but Input used inline.
                            // Let's use the sizes.padding which is tailwind class string. I can't put that in style.
                            // So I will just use className and override style padding only if needed.
                            // Input.tsx used style padding. Let's do same.
                            paddingTop: size === 'sm' ? '0.25rem' : size === 'lg' ? '0.75rem' : '0.5rem',
                            paddingBottom: size === 'sm' ? '0.25rem' : size === 'lg' ? '0.75rem' : '0.5rem',
                            paddingLeft: prefixIcon ? '2.5rem' : (size === 'sm' ? '0.75rem' : '1rem'),
                            paddingRight: '2.5rem', // Space for chevron
                            backgroundColor: disabled ? 'var(--color-neutral-100)' : 'var(--color-background)',
                            color: 'var(--color-text-primary)',
                            border: `1px solid ${getBorderColor()}`,
                            fontSize: sizes.fontSize,
                            opacity: disabled ? 0.6 : 1,
                            cursor: disabled ? 'not-allowed' : 'pointer',
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
                                ? `${selectId}-error`
                                : helperText
                                    ? `${selectId}-helper`
                                    : undefined
                        }
                        {...props}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <div
                        className="absolute right-3 top-1/2 flex items-center pointer-events-none"
                        style={{
                            transform: 'translateY(-50%)',
                            color: disabled ? 'var(--color-neutral-400)' : 'var(--color-neutral-500)',
                        }}
                    >
                        <ChevronDown size={sizes.icon} />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {error && (
                            <p
                                id={`${selectId}-error`}
                                className="animate-fade-in flex items-center gap-1"
                                style={{
                                    color: 'var(--color-error-600)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginTop: '0.25rem',
                                }}
                            >
                                <AlertCircle size={14} />
                                {error}
                            </p>
                        )}

                        {!error && successMessage && hasSuccess && (
                            <p
                                className="animate-fade-in flex items-center gap-1"
                                style={{
                                    color: 'var(--color-success-600)',
                                    fontSize: 'var(--font-size-sm)',
                                    marginTop: '0.25rem',
                                }}
                            >
                                <Check size={14} />
                                {successMessage}
                            </p>
                        )}

                        {!error && !successMessage && helperText && (
                            <p
                                id={`${selectId}-helper`}
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
                </div>
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select;
