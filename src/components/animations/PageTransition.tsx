import React from 'react';
import { motion, Variants } from 'framer-motion';

export interface PageTransitionProps {
  /**
   * Contenu de la page
   */
  children: React.ReactNode;

  /**
   * Type de transition
   * @default 'fade'
   */
  variant?: 'fade' | 'slide' | 'scale' | 'slideUp' | 'slideDown' | 'none';

  /**
   * Durée de la transition (en secondes)
   * @default 0.3
   */
  duration?: number;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

// Variants d'animation
const fadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const slideVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

const slideUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const slideDownVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const scaleVariants: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.05 },
};

const noneVariants: Variants = {
  initial: {},
  animate: {},
  exit: {},
};

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fade',
  duration = 0.3,
  className = '',
}) => {
  // Sélection des variants selon le type
  const getVariants = (): Variants => {
    switch (variant) {
      case 'fade':
        return fadeVariants;
      case 'slide':
        return slideVariants;
      case 'slideUp':
        return slideUpVariants;
      case 'slideDown':
        return slideDownVariants;
      case 'scale':
        return scaleVariants;
      case 'none':
        return noneVariants;
      default:
        return fadeVariants;
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={getVariants()}
      transition={{
        duration,
        ease: 'easeInOut',
      }}
      className={className}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

/**
 * FadeTransition - Transition avec fondu
 */
export const FadeTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
  className?: string;
}> = ({ children, duration = 0.3, className = '' }) => (
  <PageTransition variant="fade" duration={duration} className={className}>
    {children}
  </PageTransition>
);

/**
 * SlideTransition - Transition avec glissement horizontal
 */
export const SlideTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
  className?: string;
}> = ({ children, duration = 0.3, className = '' }) => (
  <PageTransition variant="slide" duration={duration} className={className}>
    {children}
  </PageTransition>
);

/**
 * SlideUpTransition - Transition avec glissement vers le haut
 */
export const SlideUpTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
  className?: string;
}> = ({ children, duration = 0.3, className = '' }) => (
  <PageTransition variant="slideUp" duration={duration} className={className}>
    {children}
  </PageTransition>
);

/**
 * SlideDownTransition - Transition avec glissement vers le bas
 */
export const SlideDownTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
  className?: string;
}> = ({ children, duration = 0.3, className = '' }) => (
  <PageTransition variant="slideDown" duration={duration} className={className}>
    {children}
  </PageTransition>
);

/**
 * ScaleTransition - Transition avec zoom
 */
export const ScaleTransition: React.FC<{
  children: React.ReactNode;
  duration?: number;
  className?: string;
}> = ({ children, duration = 0.3, className = '' }) => (
  <PageTransition variant="scale" duration={duration} className={className}>
    {children}
  </PageTransition>
);

export default PageTransition;
