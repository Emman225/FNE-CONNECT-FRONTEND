import React from 'react';

export interface SkeletonProps {
  /**
   * Variante du skeleton
   * @default 'rectangle'
   */
  variant?: 'text' | 'circle' | 'rectangle';

  /**
   * Largeur du skeleton
   */
  width?: string | number;

  /**
   * Hauteur du skeleton
   */
  height?: string | number;

  /**
   * Nombre de lignes (pour variant text)
   * @default 1
   */
  lines?: number;

  /**
   * Animation
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | 'none';

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangle',
  width,
  height,
  lines = 1,
  animation = 'pulse',
  className = '',
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      backgroundColor: 'var(--color-neutral-200)',
      width: width || '100%',
      height: height || (variant === 'text' ? '1rem' : variant === 'circle' ? '3rem' : '10rem'),
    };

    if (variant === 'circle') {
      baseStyles.borderRadius = 'var(--radius-full)';
      if (!width) baseStyles.width = '3rem';
    } else if (variant === 'text') {
      baseStyles.borderRadius = 'var(--radius-sm)';
    } else {
      baseStyles.borderRadius = 'var(--radius-md)';
    }

    return baseStyles;
  };

  const getAnimationClass = () => {
    if (animation === 'pulse') return 'animate-pulse';
    if (animation === 'wave') return 'skeleton';
    return '';
  };

  // Pour variant text avec plusieurs lignes
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={getAnimationClass()}
            style={{
              ...getVariantStyles(),
              width: index === lines - 1 ? '80%' : '100%',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${getAnimationClass()} ${className}`}
      style={getVariantStyles()}
      role="status"
      aria-label="Chargement..."
    >
      <span className="sr-only">Chargement...</span>
    </div>
  );
};

/**
 * Composant SkeletonCard pour les cartes
 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 bg-white rounded-lg border border-neutral-200 ${className}`}>
    <div className="flex items-center gap-4 mb-4">
      <Skeleton variant="circle" width="48px" height="48px" />
      <div className="flex-1">
        <Skeleton variant="text" width="60%" height="1rem" className="mb-2" />
        <Skeleton variant="text" width="40%" height="0.875rem" />
      </div>
    </div>
    <Skeleton variant="rectangle" height="120px" className="mb-4" />
    <div className="flex gap-2">
      <Skeleton variant="rectangle" width="80px" height="36px" />
      <Skeleton variant="rectangle" width="80px" height="36px" />
    </div>
  </div>
);

/**
 * Composant SkeletonTable pour les tableaux
 */
export const SkeletonTable: React.FC<{ rows?: number; className?: string }> = ({
  rows = 5,
  className = '',
}) => (
  <div className={`space-y-3 ${className}`}>
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="flex items-center gap-4">
        <Skeleton variant="circle" width="40px" height="40px" />
        <Skeleton variant="text" width="20%" height="1rem" />
        <Skeleton variant="text" width="30%" height="1rem" />
        <Skeleton variant="text" width="15%" height="1rem" />
        <Skeleton variant="text" width="15%" height="1rem" className="ml-auto" />
      </div>
    ))}
  </div>
);

/**
 * Composant SkeletonText pour du texte
 */
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        width={index === lines - 1 ? '80%' : '100%'}
        height="0.875rem"
      />
    ))}
  </div>
);

export default Skeleton;
