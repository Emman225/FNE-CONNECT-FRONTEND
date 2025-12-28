import React from 'react';

const Input = React.forwardRef(({ label, error, className = '', ...props }, ref) => {
    return (
        <div className={`flex flex-col gap-1 w-full ${className}`} style={{ marginBottom: '1rem' }}>
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
            <input
                ref={ref}
                className={`input-field ${error ? 'border-red-500' : ''}`}
                style={{
                    borderColor: error ? 'var(--danger)' : undefined
                }}
                {...props}
            />
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
