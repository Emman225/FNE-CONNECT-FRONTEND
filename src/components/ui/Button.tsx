import React from 'react';
import Spinner from './Spinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Contenu du bouton
   */
  children: React.ReactNode;

  /**
   * Variante du bouton
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost' | 'link';

  /**
   * Couleur du bouton
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';

  /**
   * Taille du bouton
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * État de chargement
   * @default false
   */
  loading?: boolean;

  /**
   * Icône à gauche
   */
  leftIcon?: React.ReactNode;

  /**
   * Icône à droite
   */
  rightIcon?: React.ReactNode;

  /**
   * Pleine largeur
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Arrondi complet (pill)
   * @default false
   */
  rounded?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = false,
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Tailles
    const sizes = {
      xs: {
        padding: 'var(--space-1-5) var(--space-3)',
        fontSize: 'var(--font-size-xs)',
        height: 'var(--size-xs)',
        gap: 'var(--space-1)',
        iconSize: 14,
      },
      sm: {
        padding: 'var(--space-2) var(--space-4)',
        fontSize: 'var(--font-size-sm)',
        height: 'var(--size-sm)',
        gap: 'var(--space-1-5)',
        iconSize: 16,
      },
      md: {
        padding: 'var(--space-2-5) var(--space-5)',
        fontSize: 'var(--font-size-base)',
        height: 'var(--size-md)',
        gap: 'var(--space-2)',
        iconSize: 18,
      },
      lg: {
        padding: 'var(--space-3) var(--space-6)',
        fontSize: 'var(--font-size-lg)',
        height: 'var(--size-lg)',
        gap: 'var(--space-2)',
        iconSize: 20,
      },
      xl: {
        padding: 'var(--space-4) var(--space-8)',
        fontSize: 'var(--font-size-xl)',
        height: 'var(--size-xl)',
        gap: 'var(--space-3)',
        iconSize: 24,
      },
    };

    // Styles par variante et couleur
    const getVariantStyles = () => {
      const colorMap = {
        primary: {
          solid: {
            bg: 'var(--color-primary-500)',
            bgHover: 'var(--color-primary-600)',
            text: 'white',
            border: 'transparent',
            shadow: 'var(--shadow-primary)',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-primary-50)',
            text: 'var(--color-primary-600)',
            textHover: 'var(--color-primary-700)',
            border: 'var(--color-primary-500)',
            borderHover: 'var(--color-primary-600)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-primary-50)',
            text: 'var(--color-primary-600)',
            textHover: 'var(--color-primary-700)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-primary-600)',
            textHover: 'var(--color-primary-700)',
            border: 'transparent',
          },
        },
        secondary: {
          solid: {
            bg: 'var(--color-secondary-500)',
            bgHover: 'var(--color-secondary-600)',
            text: 'white',
            border: 'transparent',
            shadow: 'var(--shadow-secondary)',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-secondary-50)',
            text: 'var(--color-secondary-600)',
            textHover: 'var(--color-secondary-700)',
            border: 'var(--color-secondary-500)',
            borderHover: 'var(--color-secondary-600)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-secondary-50)',
            text: 'var(--color-secondary-600)',
            textHover: 'var(--color-secondary-700)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-secondary-600)',
            textHover: 'var(--color-secondary-700)',
            border: 'transparent',
          },
        },
        success: {
          solid: {
            bg: 'var(--color-success-500)',
            bgHover: 'var(--color-success-600)',
            text: 'white',
            border: 'transparent',
            shadow: 'var(--shadow-success)',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-success-50)',
            text: 'var(--color-success-600)',
            textHover: 'var(--color-success-700)',
            border: 'var(--color-success-500)',
            borderHover: 'var(--color-success-600)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-success-50)',
            text: 'var(--color-success-600)',
            textHover: 'var(--color-success-700)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-success-600)',
            textHover: 'var(--color-success-700)',
            border: 'transparent',
          },
        },
        warning: {
          solid: {
            bg: 'var(--color-warning-500)',
            bgHover: 'var(--color-warning-600)',
            text: 'white',
            border: 'transparent',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-warning-50)',
            text: 'var(--color-warning-600)',
            textHover: 'var(--color-warning-700)',
            border: 'var(--color-warning-500)',
            borderHover: 'var(--color-warning-600)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-warning-50)',
            text: 'var(--color-warning-600)',
            textHover: 'var(--color-warning-700)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-warning-600)',
            textHover: 'var(--color-warning-700)',
            border: 'transparent',
          },
        },
        error: {
          solid: {
            bg: 'var(--color-error-500)',
            bgHover: 'var(--color-error-600)',
            text: 'white',
            border: 'transparent',
            shadow: 'var(--shadow-error)',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-error-50)',
            text: 'var(--color-error-600)',
            textHover: 'var(--color-error-700)',
            border: 'var(--color-error-500)',
            borderHover: 'var(--color-error-600)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-error-50)',
            text: 'var(--color-error-600)',
            textHover: 'var(--color-error-700)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-error-600)',
            textHover: 'var(--color-error-700)',
            border: 'transparent',
          },
        },
        neutral: {
          solid: {
            bg: 'var(--color-neutral-700)',
            bgHover: 'var(--color-neutral-800)',
            text: 'white',
            border: 'transparent',
          },
          outline: {
            bg: 'transparent',
            bgHover: 'var(--color-neutral-50)',
            text: 'var(--color-neutral-700)',
            textHover: 'var(--color-neutral-900)',
            border: 'var(--color-neutral-300)',
            borderHover: 'var(--color-neutral-400)',
          },
          ghost: {
            bg: 'transparent',
            bgHover: 'var(--color-neutral-100)',
            text: 'var(--color-neutral-700)',
            textHover: 'var(--color-neutral-900)',
            border: 'transparent',
          },
          link: {
            bg: 'transparent',
            bgHover: 'transparent',
            text: 'var(--color-neutral-700)',
            textHover: 'var(--color-neutral-900)',
            border: 'transparent',
          },
        },
      };

      return colorMap[color][variant];
    };

    const variantStyles = getVariantStyles();
    const sizeStyles = sizes[size];
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          btn
          btn-${variant}
          btn-${color}
          btn-${size}
          inline-flex
          items-center
          justify-center
          font-medium
          transition-all
          duration-200
          active-press
          focus-visible
          ${fullWidth ? 'w-full' : ''}
          ${isDisabled ? 'disabled' : 'hover-lift'}
          ${className}
        `}
        style={{
          padding: sizeStyles.padding,
          fontSize: sizeStyles.fontSize,
          height: sizeStyles.height,
          gap: sizeStyles.gap,
          borderRadius: rounded ? 'var(--radius-full)' : 'var(--radius-lg)',
          backgroundColor: variantStyles.bg,
          color: variantStyles.text,
          border: `1px solid ${variantStyles.border}`,
          boxShadow: variant === 'solid' && variantStyles.shadow ? variantStyles.shadow : 'none',
          cursor: isDisabled ? 'not-allowed' : 'pointer',
          opacity: isDisabled ? 0.6 : 1,
        }}
        {...props}
      >
        {loading && (
          <Spinner
            size={size === 'xs' || size === 'sm' ? 'xs' : 'sm'}
            color={variant === 'solid' ? 'white' : color}
          />
        )}

        {!loading && leftIcon && (
          <span
            className="flex-shrink-0"
            style={{
              width: `${sizeStyles.iconSize}px`,
              height: `${sizeStyles.iconSize}px`,
            }}
          >
            {leftIcon}
          </span>
        )}

        <span>{children}</span>

        {!loading && rightIcon && (
          <span
            className="flex-shrink-0"
            style={{
              width: `${sizeStyles.iconSize}px`,
              height: `${sizeStyles.iconSize}px`,
            }}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
