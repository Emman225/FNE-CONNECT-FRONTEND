import React from 'react';

const Container = ({ children, className = '', ...props }) => {
    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem',
                width: '100%',
            }}
            className={className}
            {...props}
        >
            {children}
        </div>
    );
};

export default Container;
