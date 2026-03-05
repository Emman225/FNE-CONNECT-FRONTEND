import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownItem {
  /**
   * Label de l'item
   */
  label: string;

  /**
   * Valeur de l'item
   */
  value: string;

  /**
   * Icône de l'item
   */
  icon?: React.ReactNode;

  /**
   * Item désactivé
   */
  disabled?: boolean;

  /**
   * Divider après l'item
   */
  divider?: boolean;

  /**
   * Callback au clic
   */
  onClick?: () => void;
}

export interface DropdownProps {
  /**
   * Items du dropdown
   */
  items: DropdownItem[];

  /**
   * Valeur sélectionnée
   */
  value?: string;

  /**
   * Callback au changement de valeur
   */
  onChange?: (value: string) => void;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Label du dropdown
   */
  label?: string;

  /**
   * Taille du dropdown
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Dropdown désactivé
   */
  disabled?: boolean;

  /**
   * Erreur
   */
  error?: string;

  /**
   * Pleine largeur
   */
  fullWidth?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Sélectionner...',
  label,
  size = 'md',
  disabled = false,
  error,
  fullWidth = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedItem = items.find((item) => item.value === value);

  // Tailles
  const sizeStyles = {
    sm: {
      button: 'h-8 px-3 text-sm',
      menu: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      button: 'h-10 px-4 text-base',
      menu: 'text-base',
      gap: 'gap-2',
    },
    lg: {
      button: 'h-12 px-4 text-lg',
      menu: 'text-lg',
      gap: 'gap-3',
    },
  };

  const sizes = sizeStyles[size];

  // Fermer le dropdown en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fermer avec Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;

    if (item.onClick) {
      item.onClick();
    }

    if (onChange) {
      onChange(item.value);
    }

    setIsOpen(false);
  };

  const getBorderColor = () => {
    if (error) return 'var(--color-error-500)';
    if (isOpen) return 'var(--color-primary-500)';
    return 'var(--color-neutral-300)';
  };

  return (
    <div
      className={`flex flex-col ${sizes.gap} ${fullWidth ? 'w-full' : ''} ${className}`}
      ref={dropdownRef}
    >
      {label && (
        <label
          className="font-medium"
          style={{
            fontSize: size === 'sm' ? 'var(--font-size-sm)' : 'var(--font-size-base)',
            color: error ? 'var(--color-error-700)' : 'var(--color-text-primary)',
            fontWeight: 'var(--font-weight-medium)',
          }}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`flex items-center justify-between w-full rounded-lg transition-all outline-none ${sizes.button}`}
          style={{
            backgroundColor: disabled ? 'var(--color-neutral-100)' : 'var(--color-background)',
            color: selectedItem ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            border: `1px solid ${getBorderColor()}`,
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.5 : 1,
            boxShadow: isOpen ? `0 0 0 3px ${error ? 'var(--color-error-100)' : 'var(--color-primary-100)'}` : 'none',
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            {selectedItem?.icon && selectedItem.icon}
            {selectedItem ? selectedItem.label : placeholder}
          </span>

          <ChevronDown
            size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18}
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform var(--transition-fast)',
            }}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute w-full mt-1 animate-fade-in ${sizes.menu}`}
            style={{
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--color-neutral-200)',
              zIndex: 'var(--z-dropdown)',
              maxHeight: '300px',
              overflowY: 'auto',
            }}
            role="listbox"
          >
            {items.map((item, index) => (
              <React.Fragment key={item.value}>
                <button
                  type="button"
                  onClick={() => handleItemClick(item)}
                  disabled={item.disabled}
                  className="flex items-center justify-between w-full px-4 py-2 transition-colors text-left"
                  style={{
                    color: item.disabled
                      ? 'var(--color-neutral-400)'
                      : 'var(--color-text-primary)',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    opacity: item.disabled ? 0.5 : 1,
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                  onMouseEnter={(e) => {
                    if (!item.disabled) {
                      e.currentTarget.style.backgroundColor = 'var(--color-neutral-50)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  role="option"
                  aria-selected={item.value === value}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && item.icon}
                    {item.label}
                  </span>

                  {item.value === value && (
                    <Check size={size === 'sm' ? 16 : size === 'lg' ? 20 : 18} style={{ color: 'var(--color-primary-500)' }} />
                  )}
                </button>

                {item.divider && index < items.length - 1 && (
                  <div
                    style={{
                      height: '1px',
                      backgroundColor: 'var(--color-neutral-200)',
                      margin: 'var(--space-2) 0',
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p
          className="animate-fade-in"
          style={{
            color: 'var(--color-error-600)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Hook useDropdown pour gérer l'état
 */
export const useDropdown = (initialValue?: string) => {
  const [value, setValue] = useState<string | undefined>(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const reset = () => {
    setValue(undefined);
  };

  return { value, onChange: handleChange, reset };
};

export default Dropdown;
