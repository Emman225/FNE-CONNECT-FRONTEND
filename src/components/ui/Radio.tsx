import React, { forwardRef, useId } from 'react';

export interface RadioGroupProps {
    label?: string;
    error?: string;
    children: React.ReactNode;
    className?: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, error, children, className = '' }) => {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-sm font-medium text-gray-700" style={{ color: 'var(--color-text-primary)' }}>
                    {label}
                </label>
            )}
            <div className="flex flex-col gap-2">{children}</div>
            {error && (
                <p className="text-xs text-red-600" style={{ color: 'var(--color-error-500)' }}>
                    {error}
                </p>
            )}
        </div>
    );
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className = '', id, ...props }, ref) => {
        const generatedId = useId();
        const radioId = id || generatedId;

        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <div className="relative flex items-center justify-center">
                    <input
                        ref={ref}
                        id={radioId}
                        type="radio"
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-300 transition-all checked:border-primary-500 checked:border-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        style={{
                            borderColor: 'var(--color-neutral-300)',
                            backgroundColor: 'white',
                        } as React.CSSProperties}
                        {...props}
                    />
                    {/* The checked state of radio is handled by 'checked:border-4' and color, usually we don't need inner dot if border becomes thick enough or we can use pseudo element.
                Let's use a simple style override for checked state if tailwind isn't fully set up.
             */}
                    <style>{`
                input[type="radio"]:checked {
                    border-color: var(--color-primary-500);
                    border-width: 6px;
                }
             `}</style>
                </div>

                {label && (
                    <label
                        htmlFor={radioId}
                        className="cursor-pointer text-sm font-medium text-gray-700 select-none"
                        style={{ color: 'var(--color-text-primary)' }}
                    >
                        {label}
                    </label>
                )}
            </div>
        );
    }
);

Radio.displayName = 'Radio';

export default Radio;
