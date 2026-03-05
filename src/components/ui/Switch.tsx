import React, { forwardRef, useId } from 'react';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    ({ label, size = 'md', className = '', id, ...props }, ref) => {
        const generatedId = useId();
        const switchId = id || generatedId;

        const sizeStyles = {
            sm: {
                switch: 'w-8 h-4',
                thumb: 'h-3 w-3',
                translate: 'translate-x-4',
            },
            md: {
                switch: 'w-11 h-6',
                thumb: 'h-5 w-5',
                translate: 'translate-x-5',
            },
            lg: {
                switch: 'w-14 h-7',
                thumb: 'h-6 w-6',
                translate: 'translate-x-7',
            },
        };

        const currentSize = sizeStyles[size];

        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <div className="relative inline-flex items-center cursor-pointer">
                    <input
                        ref={ref}
                        id={switchId}
                        type="checkbox"
                        className="peer sr-only"
                        {...props}
                    />
                    <div
                        className={`
              ${currentSize.switch}
              bg-gray-200
              peer-focus:outline-none 
              peer-focus:ring-2 
              peer-focus:ring-primary-500
              peer-focus:ring-offset-1
              rounded-full 
              peer 
              peer-checked:after:${currentSize.translate}
              peer-checked:after:border-white 
              after:content-[''] 
              after:absolute 
              after:top-[2px] 
              after:left-[2px] 
              after:bg-white 
              after:border-gray-300 
              after:border 
              after:rounded-full 
              after:${currentSize.thumb}
              after:transition-all 
              peer-checked:bg-primary-600
              transition-colors
            `}
                        style={{
                            backgroundColor: props.checked ? 'var(--color-primary-500)' : 'var(--color-neutral-300)',
                        } as React.CSSProperties}
                    ></div>
                </div>

                {label && (
                    <label
                        htmlFor={switchId}
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

Switch.displayName = 'Switch';

export default Switch;
