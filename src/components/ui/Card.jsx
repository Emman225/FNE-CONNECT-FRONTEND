import React from 'react';

const Card = ({ children, className = '', glass = false, hover = false, padding = '1.5rem', style = {}, ...props }) => {
    return (
        <div
            className={`card ${glass ? 'glass-card' : ''} ${hover ? 'hover-lift' : ''} ${className}`}
            style={{
                backgroundColor: glass ? '' : 'white',
                borderRadius: 'var(--radius-lg)',
                boxShadow: glass ? '' : 'var(--shadow-card)',
                padding: padding,
                transition: 'all var(--transition-normal)',
                position: 'relative',
                overflow: 'hidden',
                ...style
            }}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;
