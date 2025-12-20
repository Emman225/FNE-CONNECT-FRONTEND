import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer border";

    const variants = {
        primary: "bg-[var(--color-primary)] text-white border-transparent hover:bg-[var(--color-primary-dark)]",
        secondary: "bg-[var(--color-secondary)] text-white border-transparent hover:bg-[var(--color-secondary-dark)]",
        outline: "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-background)]",
        ghost: "bg-transparent text-[var(--color-text-main)] border-transparent hover:bg-[var(--color-background)]",
    };

    // Tailwind classes don't work directly with CSS variables without config, 
    // so we'll use inline styles or standard CSS classes if tailwind isn't fully set up for vars.
    // Since I set up generic CSS variables, I will use a style object approach for sure-fire styling 
    // or simple class names if I had defined them in theme.css.
    // To keep it simple and clean without relying on a full utility CSS framework if not present:

    const getStyle = () => {
        switch (variant) {
            case 'primary': return { backgroundColor: 'var(--color-primary)', color: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)' };
            case 'secondary': return { backgroundColor: 'var(--color-secondary)', color: 'white', border: 'none' };
            case 'outline': return { backgroundColor: 'white', color: 'var(--color-primary)', border: '1px solid var(--color-primary)' };
            case 'ghost': return { backgroundColor: 'transparent', color: 'var(--color-text-main)', border: 'none' };
            default: return { backgroundColor: 'var(--color-primary)', color: 'white' };
        }
    };

    return (
        <button
            className={`btn btn-${variant} ${className}`}
            style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '500',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                ...getStyle(),
                ...props.style
            }}
            {...props}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    className: PropTypes.string,
};

export default Button;
