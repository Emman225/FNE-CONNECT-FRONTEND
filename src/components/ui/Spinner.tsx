import React from 'react';

export interface SpinnerProps {
  /**
   * Taille du spinner
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Couleur du spinner
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'white';

  /**
   * Afficher en mode overlay (plein écran)
   * @default false
   */
  overlay?: boolean;

  /**
   * Label pour accessibilité
   * @default 'Chargement...'
   */
  label?: string;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  overlay = false,
  label = 'Chargement...',
  className = '',
}) => {
  // Tailles du spinner
  const sizeClasses = {
    xs: 'w-3 h-3 border-2',
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  // Couleurs du spinner
  const colorClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    success: 'border-success-500',
    warning: 'border-warning-500',
    error: 'border-error-500',
    white: 'border-white',
  };

  const spinnerElement = (
    <div
      className={`
        inline-block
        ${sizeClasses[size]}
        ${colorClasses[color]}
        border-t-transparent
        rounded-full
        animate-spin
        ${className}
      `}
      role="status"
      aria-label={label}
      style={{
        borderTopColor: 'transparent',
        borderRightColor: `var(--color-${color === 'white' ? 'white' : color + '-500'})`,
        borderBottomColor: `var(--color-${color === 'white' ? 'white' : color + '-500'})`,
        borderLeftColor: `var(--color-${color === 'white' ? 'white' : color + '-500'})`,
      }}
    >
      <span className="sr-only">{label}</span>
    </div>
  );

  if (overlay) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        style={{
          backgroundColor: 'var(--color-overlay)',
          zIndex: 'var(--z-modal)',
        }}
      >
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

export default Spinner;
