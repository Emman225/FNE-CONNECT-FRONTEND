import React from 'react';

export interface ProgressProps {
  /**
   * Valeur de progression (0-100)
   */
  value: number;

  /**
   * Valeur maximale
   * @default 100
   */
  max?: number;

  /**
   * Afficher le label avec le pourcentage
   * @default false
   */
  showLabel?: boolean;

  /**
   * Label personnalisé
   */
  label?: string;

  /**
   * Taille de la barre
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Couleur de la progression
   * @default 'primary'
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

  /**
   * Animation de la barre
   * @default false
   */
  animated?: boolean;

  /**
   * Afficher la barre avec un effet de pulsation
   * @default false
   */
  pulse?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  showLabel = false,
  label,
  size = 'md',
  color = 'primary',
  animated = false,
  pulse = false,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // Tailles
  const sizeStyles = {
    sm: '4px',
    md: '8px',
    lg: '12px',
  };

  // Couleurs
  const colorStyles = {
    primary: 'var(--color-primary-500)',
    secondary: 'var(--color-secondary-500)',
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    error: 'var(--color-error-500)',
    info: 'var(--color-info-500)',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label */}
      {(showLabel || label) && (
        <div
          className="flex items-center justify-between mb-2"
          style={{
            marginBottom: 'var(--space-2)',
          }}
        >
          {label && (
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-text-primary)',
              }}
            >
              {label}
            </span>
          )}

          {showLabel && (
            <span
              style={{
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div
        className="relative w-full overflow-hidden rounded-full"
        style={{
          height: sizeStyles[size],
          backgroundColor: 'var(--color-neutral-200)',
        }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progression: ${Math.round(percentage)}%`}
      >
        <div
          className={`h-full rounded-full transition-all ${pulse ? 'animate-pulse' : ''}`}
          style={{
            width: `${percentage}%`,
            backgroundColor: colorStyles[color],
            transition: 'width var(--transition-normal)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {animated && (
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                animation: 'shimmer 2s infinite',
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * CircularProgress - Barre de progression circulaire
 */
export const CircularProgress: React.FC<{
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  color?: ProgressProps['color'];
  className?: string;
}> = ({
  value,
  max = 100,
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  color = 'primary',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorStyles = {
    primary: 'var(--color-primary-500)',
    secondary: 'var(--color-secondary-500)',
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    error: 'var(--color-error-500)',
    info: 'var(--color-info-500)',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        style={{
          transform: 'rotate(-90deg)',
        }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-neutral-200)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colorStyles[color]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset var(--transition-normal)',
          }}
        />
      </svg>

      {/* Label */}
      {showLabel && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            fontSize: size > 80 ? 'var(--font-size-2xl)' : 'var(--font-size-lg)',
            fontWeight: 'var(--font-weight-bold)',
            color: 'var(--color-text-primary)',
          }}
        >
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

/**
 * ProgressSteps - Barre de progression par étapes
 */
export const ProgressSteps: React.FC<{
  steps: string[];
  currentStep: number;
  color?: ProgressProps['color'];
  className?: string;
}> = ({ steps, currentStep, color = 'primary', className = '' }) => {
  const colorStyles = {
    primary: 'var(--color-primary-500)',
    secondary: 'var(--color-secondary-500)',
    success: 'var(--color-success-500)',
    warning: 'var(--color-warning-500)',
    error: 'var(--color-error-500)',
    info: 'var(--color-info-500)',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={index}>
              {/* Step Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className="relative flex items-center justify-center rounded-full transition-all"
                  style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: isCompleted || isCurrent ? colorStyles[color] : 'var(--color-neutral-200)',
                    border: isCurrent ? `3px solid ${colorStyles[color]}` : 'none',
                    color: isCompleted || isCurrent ? 'var(--color-background)' : 'var(--color-text-secondary)',
                    fontWeight: 'var(--font-weight-bold)',
                  }}
                >
                  {isCompleted ? '✓' : index + 1}
                </div>

                {/* Step Label */}
                <span
                  className="mt-2 text-center text-sm"
                  style={{
                    color: isCompleted || isCurrent ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    fontWeight: isCurrent ? 'var(--font-weight-semibold)' : 'var(--font-weight-normal)',
                  }}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-1 mx-2 transition-all"
                  style={{
                    backgroundColor: isCompleted ? colorStyles[color] : 'var(--color-neutral-200)',
                    marginTop: '-30px',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Progress;
