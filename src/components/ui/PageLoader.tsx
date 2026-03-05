import React from 'react';
import LogoLoader from './LogoLoader';

export interface PageLoaderProps {
  /**
   * Message de chargement
   * @default 'Chargement...'
   */
  message?: string;

  /**
   * Afficher le message
   * @default true
   */
  showMessage?: boolean;

  /**
   * Taille du spinner
   * @default 'lg'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Couleur du spinner
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';

  /**
   * Mode plein écran
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  message = 'Chargement...',
  showMessage = true,
  size = 'lg',
  color = 'primary',
  fullScreen = false,
  className = '',
}) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 flex flex-col items-center justify-center bg-white z-50'
    : 'flex flex-col items-center justify-center p-12';

  return (
    <div
      className={`${containerClass} ${className}`}
      style={{
        backgroundColor: fullScreen ? 'var(--color-background)' : 'transparent',
        zIndex: fullScreen ? 'var(--z-modal)' : 'auto',
      }}
    >
      <LogoLoader size={size} />

      {showMessage && (
        <p
          className="mt-4 text-sm font-medium animate-pulse"
          style={{
            color: 'var(--color-text-secondary)',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

/**
 * Composant PageLoaderSkeleton - Alternative avec skeleton
 */
export const PageLoaderSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`p-6 space-y-6 ${className}`}>
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="skeleton h-8 w-64"></div>
        <div className="skeleton h-4 w-96"></div>
      </div>
      <div className="skeleton h-10 w-32"></div>
    </div>

    {/* Content skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
    </div>

    {/* Table skeleton */}
    <div className="bg-white rounded-lg p-6 border border-neutral-200">
      <div className="skeleton h-6 w-48 mb-4"></div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="skeleton-avatar"></div>
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4"></div>
              <div className="skeleton h-3 w-1/2"></div>
            </div>
            <div className="skeleton h-8 w-20"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Hook pour gérer les états de chargement
 */
export const usePageLoader = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const startLoading = React.useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, startLoading, stopLoading };
};

export default PageLoader;
