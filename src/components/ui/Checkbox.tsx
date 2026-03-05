import React, { forwardRef, useId } from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    helperText?: string;
    error?: string;
    className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, helperText, error, className = '', id, ...props }, ref) => {
        const generatedId = useId();
        const checkboxId = id || generatedId;

        return (
            <div className={`flex flex-col ${className}`}>
                <div className="flex items-start gap-3">
                    <div className="relative flex items-center h-5">
                        <input
                            ref={ref}
                            id={checkboxId}
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 transition-all checked:border-primary-500 checked:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            style={{
                                backgroundColor: 'white', // fallback if tailwind classes missing
                                borderColor: 'var(--color-neutral-300)',
                                '--tw-ring-color': 'var(--color-primary-500)',
                                accentColor: 'var(--color-primary-500)',
                            } as React.CSSProperties}
                            {...props}
                        />

                        <svg
                            className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>

                    {(label || helperText || error) && (
                        <div className="flex flex-col">
                            {label && (
                                <label
                                    htmlFor={checkboxId}
                                    className="cursor-pointer text-sm font-medium text-gray-700 select-none"
                                    style={{ color: 'var(--color-text-primary)' }}
                                >
                                    {label}
                                </label>
                            )}

                            {helperText && (
                                <p className="text-xs text-gray-500 mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                                    {helperText}
                                </p>
                            )}

                            {error && (
                                <p className="text-xs text-red-600 mt-1" style={{ color: 'var(--color-error-500)' }}>
                                    {error}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
