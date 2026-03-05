import React from 'react';
import Skeleton from './Skeleton';

export interface CardProps {
  /**
   * Contenu de la carte
   */
  children: React.ReactNode;

  /**
   * Variante de la carte
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined' | 'filled';

  /**
   * Padding de la carte
   * @default 'md'
   */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Effet hover
   * @default false
   */
  hover?: boolean;

  /**
   * Carte cliquable
   * @default false
   */
  clickable?: boolean;

  /**
   * Callback au clic (rend la carte cliquable)
   */
  onClick?: () => void;

  /**
   * État de chargement avec skeleton
   * @default false
   */
  loading?: boolean;

  /**
   * Nombre de lignes skeleton si loading
   * @default 3
   */
  skeletonLines?: number;

  /**
   * Classe CSS personnalisée
   */
  className?: string;

  /**
   * Styles inline
   */
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick,
  loading = false,
  skeletonLines = 3,
  className = '',
  style = {},
}) => {
  const isClickable = clickable || !!onClick;

  // Styles par variante
  const variantStyles = {
    elevated: {
      backgroundColor: 'var(--color-background)',
      boxShadow: 'var(--shadow-md)',
      border: 'none',
    },
    outlined: {
      backgroundColor: 'var(--color-background)',
      boxShadow: 'none',
      border: '1px solid var(--color-neutral-200)',
    },
    filled: {
      backgroundColor: 'var(--color-neutral-50)',
      boxShadow: 'none',
      border: 'none',
    },
  };

  // Padding styles
  const paddingStyles = {
    none: '0',
    sm: 'var(--space-3)',
    md: 'var(--space-6)',
    lg: 'var(--space-8)',
    xl: 'var(--space-10)',
  };

  const cardStyles: React.CSSProperties = {
    ...variantStyles[variant],
    padding: paddingStyles[padding],
    borderRadius: 'var(--radius-lg)',
    transition: 'all var(--transition-normal)',
    position: 'relative',
    overflow: 'hidden',
    minWidth: 0,
    cursor: isClickable ? 'pointer' : 'default',
    ...style,
  };

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (isClickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // État de chargement
  if (loading) {
    return (
      <div
        className={`card ${className}`}
        style={cardStyles}
      >
        <div className="space-y-3">
          <Skeleton variant="text" height="1.5rem" width="60%" />
          <Skeleton variant="text" lines={skeletonLines} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        card
        ${hover ? 'hover-lift' : ''}
        ${className}
      `}
      style={cardStyles}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-label={isClickable ? 'Carte cliquable' : undefined}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none';
        }
      }}
    >
      {children}
    </div>
  );
};

/**
 * CardHeader - En-tête de carte
 */
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <div
    className={`card-header ${className}`}
    style={{
      marginBottom: 'var(--space-4)',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * CardTitle - Titre de carte
 */
export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <h3
    className={`card-title ${className}`}
    style={{
      fontSize: 'var(--font-size-xl)',
      fontWeight: 'var(--font-weight-bold)',
      color: 'var(--color-text-primary)',
      margin: 0,
      ...style,
    }}
  >
    {children}
  </h3>
);

/**
 * CardDescription - Description de carte
 */
export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <p
    className={`card-description ${className}`}
    style={{
      fontSize: 'var(--font-size-sm)',
      color: 'var(--color-text-secondary)',
      marginTop: 'var(--space-1)',
      marginBottom: 0,
      lineHeight: 'var(--line-height-relaxed)',
      ...style,
    }}
  >
    {children}
  </p>
);

/**
 * CardBody - Corps de carte
 */
export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <div className={`card-body ${className}`} style={style}>
    {children}
  </div>
);

/**
 * CardFooter - Pied de carte
 */
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className = '', style = {} }) => (
  <div
    className={`card-footer ${className}`}
    style={{
      marginTop: 'var(--space-4)',
      paddingTop: 'var(--space-4)',
      borderTop: '1px solid var(--color-neutral-200)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;
