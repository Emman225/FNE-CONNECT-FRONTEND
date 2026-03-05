import React, { useState } from 'react';
import Badge from './Badge';

export interface TabItem {
  /**
   * Identifiant unique de l'onglet
   */
  id: string;

  /**
   * Label de l'onglet
   */
  label: string;

  /**
   * Icône de l'onglet
   */
  icon?: React.ReactNode;

  /**
   * Badge/compteur
   */
  badge?: number;

  /**
   * Contenu de l'onglet
   */
  content: React.ReactNode;

  /**
   * Onglet désactivé
   */
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Liste des onglets
   */
  tabs: TabItem[];

  /**
   * Onglet actif par défaut
   */
  defaultTab?: string;

  /**
   * Callback au changement d'onglet
   */
  onChange?: (tabId: string) => void;

  /**
   * Variante des onglets
   * @default 'line'
   */
  variant?: 'line' | 'enclosed' | 'pill';

  /**
   * Taille des onglets
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Lazy loading du contenu
   * @default false
   */
  lazy?: boolean;

  /**
   * Classe CSS personnalisée
   */
  className?: string;

  /**
   * Classe CSS pour le contenu
   */
  contentClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  onChange,
  variant = 'line',
  size = 'md',
  lazy = false,
  className = '',
  contentClassName = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [loadedTabs, setLoadedTabs] = useState<Set<string>>(
    new Set(defaultTab ? [defaultTab] : tabs[0] ? [tabs[0].id] : [])
  );

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    setActiveTab(tabId);
    if (lazy) {
      setLoadedTabs((prev) => new Set(prev).add(tabId));
    }
    onChange?.(tabId);
  };

  // Tailles
  const sizeStyles = {
    sm: {
      tab: 'px-3 py-2 text-sm',
      icon: 16,
      gap: 'gap-1',
    },
    md: {
      tab: 'px-4 py-2.5 text-base',
      icon: 18,
      gap: 'gap-2',
    },
    lg: {
      tab: 'px-6 py-3 text-lg',
      icon: 20,
      gap: 'gap-2',
    },
  };

  const sizes = sizeStyles[size];

  // Styles par variante
  const getTabStyles = (isActive: boolean, disabled?: boolean) => {
    const baseStyles = {
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-fast)',
      opacity: disabled ? 0.5 : 1,
      border: 'none',
      background: 'none',
      fontWeight: isActive ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
    };

    if (variant === 'line') {
      return {
        ...baseStyles,
        color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
        borderBottom: isActive ? '2px solid var(--color-primary-500)' : '2px solid transparent',
      };
    }

    if (variant === 'enclosed') {
      return {
        ...baseStyles,
        color: isActive ? 'var(--color-primary-600)' : 'var(--color-text-secondary)',
        backgroundColor: isActive ? 'var(--color-background)' : 'transparent',
        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
        border: isActive
          ? '1px solid var(--color-neutral-200)'
          : '1px solid transparent',
        borderBottom: isActive ? '1px solid var(--color-background)' : '1px solid var(--color-neutral-200)',
        marginBottom: '-1px',
      };
    }

    if (variant === 'pill') {
      return {
        ...baseStyles,
        color: isActive ? 'var(--color-background)' : 'var(--color-text-secondary)',
        backgroundColor: isActive ? 'var(--color-primary-500)' : 'var(--color-neutral-100)',
        borderRadius: 'var(--radius-full)',
      };
    }

    return baseStyles;
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Tabs Header */}
      <div
        className="flex items-center"
        style={{
          gap: variant === 'pill' ? 'var(--space-2)' : '0',
          borderBottom: variant === 'enclosed' ? '1px solid var(--color-neutral-200)' : 'none',
        }}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
            className={`flex items-center ${sizes.tab} ${sizes.gap}`}
            style={getTabStyles(activeTab === tab.id, tab.disabled)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onMouseEnter={(e) => {
              if (!tab.disabled && activeTab !== tab.id && variant !== 'pill') {
                e.currentTarget.style.color = 'var(--color-primary-500)';
              }
            }}
            onMouseLeave={(e) => {
              if (!tab.disabled && activeTab !== tab.id && variant !== 'pill') {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }
            }}
          >
            {tab.icon && (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                {tab.icon}
              </span>
            )}
            <span>{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <Badge
                variant={activeTab === tab.id ? 'primary' : 'default'}
                size="sm"
                rounded
              >
                {tab.badge}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div
        className={`mt-4 ${contentClassName}`}
        style={{
          marginTop: 'var(--space-6)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const shouldRender = !lazy || loadedTabs.has(tab.id);

          return (
            <div
              key={tab.id}
              role="tabpanel"
              id={`tabpanel-${tab.id}`}
              aria-labelledby={`tab-${tab.id}`}
              style={{
                display: isActive ? 'block' : 'none',
              }}
              className={isActive ? 'animate-fade-in' : ''}
            >
              {shouldRender && tab.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Hook useTabs pour gérer l'état
 */
export const useTabs = (defaultTab?: string) => {
  const [activeTab, setActiveTab] = useState<string | undefined>(defaultTab);

  const handleChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  return { activeTab, onChange: handleChange, setActiveTab };
};

export default Tabs;
