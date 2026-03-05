import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Theme } from '../../contexts/ThemeContext';

export interface ThemeToggleProps {
  /**
   * Variante du toggle
   * @default 'icon'
   */
  variant?: 'icon' | 'button' | 'dropdown';

  /**
   * Taille
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Afficher le label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  size = 'md',
  showLabel = false,
  className = '',
}) => {
  const { theme, resolvedTheme, setTheme } = useTheme();

  // Tailles
  const sizeStyles = {
    sm: {
      button: 'h-8 w-8',
      icon: 16,
      padding: 'p-1',
    },
    md: {
      button: 'h-10 w-10',
      icon: 20,
      padding: 'p-2',
    },
    lg: {
      button: 'h-12 w-12',
      icon: 24,
      padding: 'p-3',
    },
  };

  const sizes = sizeStyles[size];

  // Icône selon le thème
  const getIcon = () => {
    if (theme === 'auto') {
      return <Monitor size={sizes.icon} />;
    }
    return resolvedTheme === 'dark' ? <Moon size={sizes.icon} /> : <Sun size={sizes.icon} />;
  };

  // Variant icône simple (toggle light/dark)
  if (variant === 'icon') {
    return (
      <motion.button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        className={`flex items-center justify-center rounded-lg transition-colors ${sizes.button} ${className}`}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {getIcon()}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  // Variant bouton avec label
  if (variant === 'button') {
    return (
      <motion.button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        className={`flex items-center gap-2 rounded-lg transition-colors ${sizes.padding} ${className}`}
        style={{
          backgroundColor: 'transparent',
          color: 'var(--color-text-primary)',
          border: '1px solid var(--color-neutral-300)',
          cursor: 'pointer',
          padding: showLabel ? 'var(--space-2) var(--space-4)' : sizes.padding,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={resolvedTheme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {getIcon()}
          </motion.div>
        </AnimatePresence>

        {showLabel && (
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
            {resolvedTheme === 'dark' ? 'Mode sombre' : 'Mode clair'}
          </span>
        )}
      </motion.button>
    );
  }

  // Variant dropdown (3 options: light, dark, auto)
  if (variant === 'dropdown') {
    const [isOpen, setIsOpen] = React.useState(false);

    const options: Array<{ value: Theme; label: string; icon: React.ReactNode }> = [
      { value: 'light', label: 'Clair', icon: <Sun size={sizes.icon} /> },
      { value: 'dark', label: 'Sombre', icon: <Moon size={sizes.icon} /> },
      { value: 'auto', label: 'Auto', icon: <Monitor size={sizes.icon} /> },
    ];

    return (
      <div className={`relative ${className}`}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 rounded-lg transition-colors ${sizes.padding}`}
          style={{
            backgroundColor: 'transparent',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-neutral-300)',
            cursor: 'pointer',
            padding: 'var(--space-2) var(--space-4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-neutral-100)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Select theme"
        >
          {getIcon()}
          {showLabel && (
            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
              {options.find((o) => o.value === theme)?.label || 'Thème'}
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0"
                onClick={() => setIsOpen(false)}
                style={{ zIndex: 10 }}
              />

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2"
                style={{
                  backgroundColor: 'var(--color-background)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  border: '1px solid var(--color-neutral-200)',
                  minWidth: '150px',
                  zIndex: 20,
                  overflow: 'hidden',
                }}
              >
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTheme(option.value);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 transition-colors text-left"
                    style={{
                      backgroundColor: theme === option.value ? 'var(--color-primary-50)' : 'transparent',
                      color: theme === option.value ? 'var(--color-primary-700)' : 'var(--color-text-primary)',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (theme !== option.value) {
                        e.currentTarget.style.backgroundColor = 'var(--color-neutral-50)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (theme !== option.value) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      } else {
                        e.currentTarget.style.backgroundColor = 'var(--color-primary-50)';
                      }
                    }}
                  >
                    {option.icon}
                    <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
};

export default ThemeToggle;
