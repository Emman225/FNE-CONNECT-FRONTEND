import React, { useState, useRef, useEffect } from 'react';

export interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = 'top',
    delay = 200,
    className = '',
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const positionStyles = {
        top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-8px)' },
        bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(8px)' },
        left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-8px)' },
        right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(8px)' },
    };

    const arrowStyles = {
        top: { top: '100%', left: '50%', transform: 'translateX(-50%)', borderTopColor: 'var(--color-neutral-800)', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'transparent' },
        bottom: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', borderBottomColor: 'var(--color-neutral-800)', borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: 'transparent' },
        left: { left: '100%', top: '50%', transform: 'translateY(-50%)', borderLeftColor: 'var(--color-neutral-800)', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: 'transparent' },
        right: { right: '100%', top: '50%', transform: 'translateY(-50%)', borderRightColor: 'var(--color-neutral-800)', borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: 'transparent' },
    };

    return (
        <div
            className={`relative inline-block ${className}`}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}

            {isVisible && (
                <div
                    className="absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm whitespace-nowrap transition-opacity duration-200"
                    style={{
                        ...positionStyles[position],
                        backgroundColor: 'var(--color-neutral-800)',
                    }}
                    role="tooltip"
                >
                    {content}
                    <div
                        className="absolute w-0 h-0 border-4 border-solid"
                        style={{
                            ...arrowStyles[position],
                            position: 'absolute',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
