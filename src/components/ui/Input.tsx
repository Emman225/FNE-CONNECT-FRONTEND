import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, icon, className = '', style, ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-1 w-full ${className}`} style={{ marginBottom: '1rem', ...style }}>
            {label && (
                <label style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)',
                    display: 'block'
                }}>
                    {label}
                </label>
            )}
            <div style={{ position: 'relative' }}>
                <input
                    ref={ref}
                    className={`input-field ${error ? 'border-red-500' : ''}`}
                    style={{
                        borderColor: error ? 'var(--danger)' : undefined,
                        paddingLeft: icon ? '2.5rem' : undefined, // Add padding if icon exists
                        width: '100%'
                    }}
                    {...props}
                />
                {icon && (
                    <div style={{
                        position: 'absolute',
                        left: '0.75rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-secondary)',
                        pointerEvents: 'none',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {icon}
                    </div>
                )}
            </div>
            {error && (
                <span style={{ fontSize: '0.75rem', color: 'var(--danger)', marginTop: '0.25rem' }}>
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
