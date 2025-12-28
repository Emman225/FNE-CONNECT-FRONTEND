import React from 'react';

const GlassCard = ({
    children,
    className = '',
    hover = false,
    padding = '1.5rem',
    style = {}
}) => {
    return (
        <div
            className={`glass-card ${hover ? 'hover-lift' : ''} ${className}`}
            style={{
                padding,
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-card)',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default GlassCard;
