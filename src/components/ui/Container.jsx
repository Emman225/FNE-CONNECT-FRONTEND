import React from 'react';

const Container = ({ children, className = '', style = {} }) => {
    return (
        <div
            className={`container ${className}`}
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 1rem',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Container;
