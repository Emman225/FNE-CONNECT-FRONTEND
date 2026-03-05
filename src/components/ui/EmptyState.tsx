import React from 'react';
import { FileX, Search, Inbox, AlertCircle, Package, Users, FileText } from 'lucide-react';
import Button from './Button';

export interface EmptyStateProps {
  /**
   * Titre principal
   */
  title: string;

  /**
   * Description
   */
  description?: string;

  /**
   * Type d'état vide (préconfiguré)
   */
  variant?: 'no-data' | 'no-results' | 'no-access' | 'error' | 'custom';

  /**
   * Icône personnalisée
   */
  icon?: React.ReactNode;

  /**
   * Taille de l'icône
   * @default 'md'
   */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Action principale
   */
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };

  /**
   * Action secondaire
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };

  /**
   * Illustration (chemin vers image)
   */
  illustration?: string;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  variant = 'no-data',
  icon,
  iconSize = 'md',
  action,
  secondaryAction,
  illustration,
  className = '',
}) => {
  // Icons par défaut selon variant
  const defaultIcons = {
    'no-data': Inbox,
    'no-results': Search,
    'no-access': AlertCircle,
    'error': FileX,
    'custom': Package,
  };

  // Tailles d'icône
  const iconSizes = {
    sm: 48,
    md: 64,
    lg: 80,
    xl: 96,
  };

  const IconComponent = icon ? null : defaultIcons[variant];
  const iconSizeValue = iconSizes[iconSize];

  return (
    <div
      className={`flex flex-col items-center justify-center text-center py-12 px-4 ${className}`}
      style={{
        minHeight: '400px',
      }}
    >
      {/* Illustration ou Icône */}
      <div
        className="mb-6"
        style={{
          color: 'var(--color-neutral-400)',
        }}
      >
        {illustration ? (
          <img
            src={illustration}
            alt={title}
            style={{
              width: `${iconSizeValue * 2}px`,
              height: `${iconSizeValue * 2}px`,
              opacity: 0.8,
            }}
          />
        ) : icon ? (
          <div
            style={{
              width: `${iconSizeValue}px`,
              height: `${iconSizeValue}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        ) : IconComponent ? (
          <IconComponent size={iconSizeValue} strokeWidth={1.5} />
        ) : null}
      </div>

      {/* Titre */}
      <h3
        className="font-bold mb-2"
        style={{
          fontSize: 'var(--font-size-xl)',
          color: 'var(--color-text-primary)',
          fontWeight: 'var(--font-weight-bold)',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className="mb-6 max-w-md"
          style={{
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--line-height-relaxed)',
          }}
        >
          {description}
        </p>
      )}

      {/* Actions */}
      {(action || secondaryAction) && (
        <div
          className="flex gap-3"
          style={{
            gap: 'var(--space-3)',
          }}
        >
          {action && (
            <Button
              onClick={action.onClick}
              leftIcon={action.icon}
              size="lg"
              color="primary"
            >
              {action.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              onClick={secondaryAction.onClick}
              variant="outline"
              size="lg"
              color="neutral"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * EmptyState pré-configuré pour "Aucune donnée"
 */
export const EmptyData: React.FC<{
  title?: string;
  description?: string;
  onAction?: () => void;
  actionLabel?: string;
}> = ({
  title = 'Aucune donnée',
  description = 'Il n\'y a aucune donnée à afficher pour le moment.',
  onAction,
  actionLabel = 'Actualiser',
}) => (
  <EmptyState
    variant="no-data"
    title={title}
    description={description}
    action={onAction ? { label: actionLabel, onClick: onAction } : undefined}
  />
);

/**
 * EmptyState pré-configuré pour "Aucun résultat"
 */
export const EmptyResults: React.FC<{
  title?: string;
  description?: string;
  onReset?: () => void;
}> = ({
  title = 'Aucun résultat trouvé',
  description = 'Essayez de modifier vos critères de recherche.',
  onReset,
}) => (
  <EmptyState
    variant="no-results"
    title={title}
    description={description}
    action={onReset ? { label: 'Réinitialiser les filtres', onClick: onReset } : undefined}
  />
);

/**
 * EmptyState pré-configuré pour "Pas d'accès"
 */
export const EmptyAccess: React.FC<{
  title?: string;
  description?: string;
}> = ({
  title = 'Accès refusé',
  description = 'Vous n\'avez pas les permissions nécessaires pour accéder à cette ressource.',
}) => (
  <EmptyState
    variant="no-access"
    title={title}
    description={description}
  />
);

/**
 * EmptyState pré-configuré pour "Erreur"
 */
export const EmptyError: React.FC<{
  title?: string;
  description?: string;
  onRetry?: () => void;
}> = ({
  title = 'Une erreur s\'est produite',
  description = 'Impossible de charger les données. Veuillez réessayer.',
  onRetry,
}) => (
  <EmptyState
    variant="error"
    title={title}
    description={description}
    action={onRetry ? { label: 'Réessayer', onClick: onRetry } : undefined}
  />
);

/**
 * EmptyState pour listes vides avec action de création
 */
export const EmptyList: React.FC<{
  entity: string;
  onCreate: () => void;
  icon?: React.ReactNode;
}> = ({ entity, onCreate, icon }) => (
  <EmptyState
    variant="no-data"
    title={`Aucun ${entity}`}
    description={`Vous n'avez pas encore créé de ${entity}. Commencez par en créer un.`}
    icon={icon}
    action={{
      label: `Créer un ${entity}`,
      onClick: onCreate,
      icon: <span style={{ fontSize: '1.25rem' }}>+</span>,
    }}
  />
);

export default EmptyState;
