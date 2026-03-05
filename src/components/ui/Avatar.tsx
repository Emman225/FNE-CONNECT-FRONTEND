import React from 'react';

export interface AvatarProps {
  /**
   * URL de l'image
   */
  src?: string;

  /**
   * Texte alternatif
   */
  alt?: string;

  /**
   * Nom pour générer les initiales
   */
  name?: string;

  /**
   * Taille de l'avatar
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  /**
   * Forme de l'avatar
   * @default 'circle'
   */
  shape?: 'circle' | 'square';

  /**
   * Indicateur de statut
   */
  status?: 'online' | 'offline' | 'busy' | 'away';

  /**
   * Position du statut
   * @default 'bottom-right'
   */
  statusPosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

  /**
   * Couleur de fond (pour les initiales)
   */
  bgColor?: string;

  /**
   * Couleur du texte (pour les initiales)
   */
  textColor?: string;

  /**
   * Callback quand l'image ne charge pas
   */
  onError?: () => void;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  bgColor,
  textColor,
  onError,
  className = '',
}) => {
  const [imageError, setImageError] = React.useState(false);

  // Tailles
  const sizes = {
    xs: { size: '1.5rem', text: 'var(--font-size-xs)' },
    sm: { size: '2rem', text: 'var(--font-size-sm)' },
    md: { size: '2.5rem', text: 'var(--font-size-base)' },
    lg: { size: '3rem', text: 'var(--font-size-lg)' },
    xl: { size: '4rem', text: 'var(--font-size-2xl)' },
    '2xl': { size: '5rem', text: 'var(--font-size-3xl)' },
  };

  // Taille du status dot
  const statusSizes = {
    xs: '0.375rem',
    sm: '0.5rem',
    md: '0.625rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.25rem',
  };

  // Couleurs de statut
  const statusColors = {
    online: 'var(--color-success-500)',
    offline: 'var(--color-neutral-400)',
    busy: 'var(--color-error-500)',
    away: 'var(--color-warning-500)',
  };

  // Position du statut
  const statusPositions = {
    'top-right': { top: '0', right: '0' },
    'top-left': { top: '0', left: '0' },
    'bottom-right': { bottom: '0', right: '0' },
    'bottom-left': { bottom: '0', left: '0' },
  };

  // Générer les initiales depuis le nom
  const getInitials = (name: string): string => {
    if (!name) return '?';

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase();
    }

    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Générer une couleur depuis le nom
  const getColorFromName = (name: string): string => {
    if (!name) return 'var(--color-primary-500)';

    const colors = [
      'var(--color-primary-500)',
      'var(--color-secondary-500)',
      'var(--color-success-500)',
      'var(--color-warning-500)',
      'var(--color-info-500)',
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F97316', // Orange
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    return colors[Math.abs(hash) % colors.length];
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  const showImage = src && !imageError;
  const showInitials = !showImage && name;
  const finalBgColor = bgColor || getColorFromName(name || '');
  const finalTextColor = textColor || 'white';

  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{
        width: sizes[size].size,
        height: sizes[size].size,
      }}
    >
      {/* Avatar container */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden transition-transform hover-scale"
        style={{
          borderRadius: shape === 'circle' ? 'var(--radius-full)' : 'var(--radius-lg)',
          backgroundColor: showImage ? 'var(--color-neutral-200)' : finalBgColor,
          color: finalTextColor,
        }}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            onError={handleImageError}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : showInitials ? (
          <span
            className="font-semibold select-none"
            style={{
              fontSize: sizes[size].text,
            }}
          >
            {getInitials(name)}
          </span>
        ) : (
          <svg
            className="w-3/5 h-3/5"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ color: 'var(--color-neutral-400)' }}
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Status indicator */}
      {status && (
        <span
          className="absolute rounded-full border-2 border-white"
          style={{
            width: statusSizes[size],
            height: statusSizes[size],
            backgroundColor: statusColors[status],
            ...statusPositions[statusPosition],
          }}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
};

/**
 * Groupe d'avatars empilés
 */
export const AvatarGroup: React.FC<{
  children: React.ReactNode;
  max?: number;
  size?: AvatarProps['size'];
  className?: string;
}> = ({ children, max = 4, size = 'md', className = '' }) => {
  const childArray = React.Children.toArray(children);
  const displayChildren = max ? childArray.slice(0, max) : childArray;
  const remainingCount = childArray.length - displayChildren.length;

  const overlapSizes = {
    xs: '-0.375rem',
    sm: '-0.5rem',
    md: '-0.625rem',
    lg: '-0.75rem',
    xl: '-1rem',
    '2xl': '-1.25rem',
  };

  return (
    <div className={`flex items-center ${className}`}>
      {displayChildren.map((child, index) => (
        <div
          key={index}
          className="relative"
          style={{
            marginLeft: index > 0 ? overlapSizes[size] : '0',
            zIndex: displayChildren.length - index,
          }}
        >
          {child}
        </div>
      ))}

      {remainingCount > 0 && (
        <div
          className="relative"
          style={{
            marginLeft: overlapSizes[size],
            zIndex: 0,
          }}
        >
          <Avatar
            name={`+${remainingCount}`}
            size={size}
            bgColor="var(--color-neutral-300)"
            textColor="var(--color-neutral-700)"
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
