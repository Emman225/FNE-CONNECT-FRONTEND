import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

export interface ModalProps {
  /**
   * Contrôle l'affichage du modal
   */
  isOpen: boolean;

  /**
   * Callback à la fermeture
   */
  onClose: () => void;

  /**
   * Titre du modal
   */
  title?: string;

  /**
   * Contenu du modal
   */
  children: React.ReactNode;

  /**
   * Actions du footer (boutons)
   */
  footer?: React.ReactNode;

  /**
   * Taille du modal
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Fermer en cliquant sur le backdrop
   * @default true
   */
  closeOnBackdrop?: boolean;

  /**
   * Fermer avec la touche Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Afficher le bouton de fermeture
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Désactiver le scroll du body
   * @default true
   */
  lockScroll?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;

  /**
   * Classe CSS pour le contenu
   */
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnBackdrop = true,
  closeOnEscape = true,
  showCloseButton = true,
  lockScroll = true,
  className = '',
  contentClassName = '',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Tailles du modal
  const sizeStyles = {
    sm: { maxWidth: '400px' },
    md: { maxWidth: '600px' },
    lg: { maxWidth: '800px' },
    xl: { maxWidth: '1000px' },
    full: { maxWidth: '95vw', height: '95vh' },
  };

  // Focus trap et gestion du scroll
  useEffect(() => {
    if (isOpen) {
      // Sauvegarder l'élément qui avait le focus
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus sur le modal
      if (modalRef.current) {
        const focusableElement = modalRef.current.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusableElement?.focus();
      }

      // Bloquer le scroll
      if (lockScroll) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Restaurer le focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }

      // Restaurer le scroll
      if (lockScroll) {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (lockScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, lockScroll]);

  // Gestion de la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (closeOnEscape && isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Focus trap (cycle de tab)
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 animate-fade-in"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 'var(--z-modal)',
        }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{
          zIndex: 'var(--z-modal)',
          pointerEvents: 'none',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          className={`animate-slide-in-up ${className}`}
          style={{
            ...sizeStyles[size],
            backgroundColor: 'var(--color-background)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-2xl)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            pointerEvents: 'auto',
            maxHeight: size === 'full' ? '95vh' : '90vh',
          }}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className="flex items-center justify-between"
              style={{
                padding: 'var(--space-6)',
                borderBottom: '1px solid var(--color-neutral-200)',
              }}
            >
              {title && (
                <h2
                  id="modal-title"
                  style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}
                >
                  {title}
                </h2>
              )}

              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="hover:opacity-70 transition-opacity"
                  style={{
                    marginLeft: 'auto',
                    padding: 'var(--space-2)',
                    color: 'var(--color-neutral-500)',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label="Fermer le modal"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <X size={24} />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div
            className={`flex-1 overflow-y-auto ${contentClassName}`}
            style={{
              padding: 'var(--space-6)',
            }}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className="flex items-center justify-end gap-3"
              style={{
                padding: 'var(--space-6)',
                borderTop: '1px solid var(--color-neutral-200)',
                gap: 'var(--space-3)',
              }}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * Hook useModal pour gérer l'état du modal
 */
export const useModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = React.useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return { isOpen, openModal, closeModal, toggleModal };
};

/**
 * ConfirmModal - Modal de confirmation
 */
export const ConfirmModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'error' | 'warning';
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmation',
  message = 'Êtes-vous sûr de vouloir continuer ?',
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  variant = 'primary',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <Button variant="outline" color="neutral" onClick={onClose}>
            {cancelText}
          </Button>
          <Button color={variant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </>
      }
    >
      <p style={{ color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>
        {message}
      </p>
    </Modal>
  );
};

export default Modal;
