import React from 'react';
import { X } from 'lucide-react';

export interface BadgeProps {
  /**
   * Contenu du badge
   */
  children: React.ReactNode;

  /**
   * Variante du badge
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Taille du badge
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Afficher un point indicateur
   * @default false
   */
  dot?: boolean;

  /**
   * Icône à gauche
   */
  icon?: React.ReactNode;

  /**
   * Badge supprimable
   * @default false
   */
  removable?: boolean;

  /**
   * Callback lors de la suppression
   */
  onRemove?: () => void;

  /**
   * Badge arrondi (pill)
   * @default false
   */
  rounded?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  removable = false,
  onRemove,
  rounded = false,
  className = '',
}) => {
  // Styles par variante
  const variantStyles = {
    default: {
      bg: 'var(--color-neutral-100)',
      text: 'var(--color-neutral-700)',
      border: 'var(--color-neutral-300)',
      dot: 'var(--color-neutral-500)',
    },
    primary: {
      bg: 'var(--color-primary-50)',
      text: 'var(--color-primary-700)',
      border: 'var(--color-primary-200)',
      dot: 'var(--color-primary-500)',
    },
    secondary: {
      bg: 'var(--color-secondary-50)',
      text: 'var(--color-secondary-700)',
      border: 'var(--color-secondary-200)',
      dot: 'var(--color-secondary-500)',
    },
    success: {
      bg: 'var(--color-success-50)',
      text: 'var(--color-success-700)',
      border: 'var(--color-success-200)',
      dot: 'var(--color-success-500)',
    },
    warning: {
      bg: 'var(--color-warning-50)',
      text: 'var(--color-warning-700)',
      border: 'var(--color-warning-200)',
      dot: 'var(--color-warning-500)',
    },
    error: {
      bg: 'var(--color-error-50)',
      text: 'var(--color-error-700)',
      border: 'var(--color-error-200)',
      dot: 'var(--color-error-500)',
    },
    info: {
      bg: 'var(--color-info-50)',
      text: 'var(--color-info-700)',
      border: 'var(--color-info-200)',
      dot: 'var(--color-info-500)',
    },
  };

  // Tailles
  const sizeStyles = {
    sm: {
      padding: 'var(--space-1) var(--space-2)',
      fontSize: 'var(--font-size-xs)',
      gap: 'var(--space-1)',
      iconSize: 'var(--icon-xs)',
      dotSize: '6px',
    },
    md: {
      padding: 'var(--space-1-5) var(--space-3)',
      fontSize: 'var(--font-size-sm)',
      gap: 'var(--space-1-5)',
      iconSize: 'var(--icon-sm)',
      dotSize: '8px',
    },
    lg: {
      padding: 'var(--space-2) var(--space-4)',
      fontSize: 'var(--font-size-base)',
      gap: 'var(--space-2)',
      iconSize: 'var(--icon-md)',
      dotSize: '10px',
    },
  };

  const styles = variantStyles[variant];
  const sizes = sizeStyles[size];

  return (
    <span
      className={`
        inline-flex
        items-center
        font-medium
        transition-colors
        ${rounded ? 'rounded-full' : 'rounded-md'}
        ${className}
      `}
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
        padding: sizes.padding,
        fontSize: sizes.fontSize,
        gap: sizes.gap,
      }}
    >
      {/* Dot indicator */}
      {dot && (
        <span
          className="rounded-full animate-pulse"
          style={{
            width: sizes.dotSize,
            height: sizes.dotSize,
            backgroundColor: styles.dot,
          }}
          aria-hidden="true"
        />
      )}

      {/* Icon */}
      {icon && (
        <span
          className="flex-shrink-0"
          style={{
            width: sizes.iconSize,
            height: sizes.iconSize,
          }}
        >
          {icon}
        </span>
      )}

      {/* Content */}
      <span>{children}</span>

      {/* Remove button */}
      {removable && (
        <button
          onClick={onRemove}
          className="flex-shrink-0 ml-1 hover:opacity-70 transition-opacity"
          style={{
            width: sizes.iconSize,
            height: sizes.iconSize,
            color: styles.text,
          }}
          aria-label="Supprimer"
          type="button"
        >
          <X size={size === 'sm' ? 12 : size === 'lg' ? 18 : 14} />
        </button>
      )}
    </span>
  );
};

/**
 * Badge avec compteur
 */
export const BadgeCount: React.FC<{
  count: number;
  max?: number;
  variant?: BadgeProps['variant'];
  className?: string;
}> = ({ count, max = 99, variant = 'primary', className = '' }) => {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <Badge variant={variant} size="sm" rounded className={className}>
      {displayCount}
    </Badge>
  );
};

/**
 * Badge en mode notification (dot uniquement)
 */
export const BadgeDot: React.FC<{
  variant?: BadgeProps['variant'];
  pulse?: boolean;
  className?: string;
}> = ({ variant = 'error', pulse = true, className = '' }) => {
  const variantColors = {
    default: 'var(--color-neutral-500)',
    primary: 'var(--color-primary-500)',
    secondary: 'var(--color-secondary-500)',
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    error: 'var(--color-error-500)',
    info: 'var(--color-info-500)',
  };

  return (
    <span
      className={`
        inline-block
        w-2
        h-2
        rounded-full
        ${pulse ? 'animate-pulse' : ''}
        ${className}
      `}
      style={{
        backgroundColor: variantColors[variant],
      }}
      aria-hidden="true"
    />
  );
};

export default Badge;
