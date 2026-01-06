import React, { ReactNode } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, FileText, Users, CreditCard, Settings,
    FileCheck, ShieldCheck, Wallet, TrendingUp, Shield, UserCog
} from 'lucide-react';

import { useAuth } from '../../auth/AuthProvider';
import { menuKeys, rolePermissions, userRoles, MenuKey, UserRole } from '../../types/roles';

// Define the type for menu items
type MenuItem =
    | { type: 'header'; label: string; key: null; icon?: undefined; path?: undefined }
    | { type: 'separator'; label?: undefined; key: null; icon?: undefined; path?: undefined }
    | { type: 'link'; icon: ReactNode; label: string; path: string; key: MenuKey };

/**
 * Sidebar Component with RBAC
 * 
 * Dynamically displays menu items based on user role and current area (vendor/admin).
 * Detects whether we're in vendor dashboard (/dashboard) or admin dashboard (/admin/dashboard)
 * and adjusts paths and filtering accordingly.
 */
const Sidebar = () => {
    const { user } = useAuth();
    const location = useLocation();

    // Determine current area and base path
    const isAdminArea = location.pathname.startsWith('/admin');
    const basePath = isAdminArea ? '/admin/dashboard' : '/dashboard';

    // Default to VENDOR if no user/role found (safe fallback)
    const userRole = (user?.role || userRoles.VENDOR) as UserRole;
    const allowedKeys = rolePermissions[userRole] || [];

    // Define all menu items with their keys, icons, and paths
    const allMenuItems: MenuItem[] = [
        { type: 'header', label: 'PRINCIPAL', key: null },
        {
            type: 'link', icon: <LayoutDashboard size={20} />,
            label: 'Tableau de bord',
            path: `${basePath}`,
            key: menuKeys.DASHBOARD
        },

        { type: 'header', label: 'GESTION', key: null },
        {
            type: 'link', icon: <Users size={20} />,
            label: 'Clients',
            path: `${basePath}/clients`,
            key: menuKeys.CLIENTS
        },
        {
            type: 'link', icon: <FileText size={20} />,
            label: 'Factures',
            path: `${basePath}/invoices`,
            key: menuKeys.INVOICES
        },
        {
            type: 'link', icon: <FileText size={20} />,
            label: 'Devis',
            path: `${basePath}/quotes`,
            key: menuKeys.QUOTES
        },
        {
            type: 'link', icon: <FileCheck size={20} />,
            label: 'Proformas',
            path: `${basePath}/proformas`,
            key: menuKeys.PROFORMAS
        },

        { type: 'header', label: 'FINANCE', key: null },
        {
            type: 'link', icon: <CreditCard size={20} />,
            label: 'Paiements',
            path: `${basePath}/payments`,
            key: menuKeys.PAYMENTS
        },
        {
            type: 'link', icon: <Wallet size={20} />,
            label: 'Commissions',
            path: `${basePath}/commissions`,
            key: menuKeys.COMMISSIONS
        },
        {
            type: 'link', icon: <TrendingUp size={20} />,
            label: 'Reversements',
            path: `${basePath}/payouts`,
            key: menuKeys.PAYOUTS
        },

        { type: 'header', label: 'CONFORMITÉ', key: null },
        {
            type: 'link', icon: <Shield size={20} />,
            label: 'Conformité AML',
            path: `${basePath}/compliance/aml`,
            key: menuKeys.CONFORMITE_AML
        },
        {
            type: 'link', icon: <FileCheck size={20} />,
            label: 'Rapports DGI',
            path: `${basePath}/reports`,
            key: menuKeys.RAPPORTS_DGI
        },

        { type: 'header', label: 'ADMINISTRATION', key: null },
        {
            type: 'link', icon: <UserCog size={20} />,
            label: 'Gestion Utilisateurs',
            path: `${basePath}/users`,
            key: menuKeys.GESTION_UTILISATEURS
        },
        {
            type: 'link', icon: <ShieldCheck size={20} />,
            label: 'Gestion Vendeurs',
            path: `${basePath}/vendors`,
            key: menuKeys.GESTION_VENDEURS
        },
        {
            type: 'link', icon: <Settings size={20} />,
            label: 'Configuration',
            path: `${basePath}/config`,
            key: menuKeys.CONFIGURATION
        },
        {
            type: 'link', icon: <TrendingUp size={20} />,
            label: 'Reporting Global',
            path: `${basePath}/reporting`,
            key: menuKeys.REPORTING_GLOBAL
        },

    ];

    // Filter menu items based on user permissions
    // Include headers only if they have at least one visible child
    const menuItems = allMenuItems.filter((item, index, array) => {
        if (item.type === 'header') {
            // Check next items until next header or end
            let hasVisibleChild = false;
            for (let i = index + 1; i < array.length; i++) {
                if (array[i].type === 'header' || array[i].type === 'separator') break;
                const nextItem = array[i];
                if (nextItem.key && allowedKeys.includes(nextItem.key as MenuKey)) {
                    hasVisibleChild = true;
                    break;
                }
            }
            return hasVisibleChild;
        }
        if (item.type === 'separator') {
            return true; // Always show separators
        }
        return item.key && allowedKeys.includes(item.key as MenuKey);
    });

    return (
        <aside style={{
            width: '280px',
            backgroundColor: 'var(--bg-sidebar)',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 50,
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--shadow-md)'
        }}>
            {/* Brand Header */}
            <div style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                <div style={{
                    minWidth: '42px',
                    height: '42px',
                    background: 'var(--gradient-dual)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-lg)',
                    transition: 'transform var(--transition-normal)'
                }}
                    className="hover-lift"
                >
                    <ShieldCheck size={24} color="white" strokeWidth={2.5} />
                </div>
                <div>
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '800',
                        color: 'white',
                        letterSpacing: '-0.5px',
                        display: 'block',
                        lineHeight: 1
                    }}>
                        FNE <span style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Connect</span>
                    </span>
                    <span style={{
                        fontSize: '0.675rem',
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}>
                        PORTAGE FISCAL
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {menuItems.map((item, index) => {
                        if (item.type === 'header') {
                            return (
                                <li key={`header-${index}`} style={{
                                    fontSize: '0.7rem',
                                    fontWeight: '700',
                                    color: 'rgba(255, 255, 255, 0.4)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    padding: '1rem 0.75rem 0.5rem',
                                    marginTop: index > 0 ? '0.25rem' : '0'
                                }}>
                                    {item.label}
                                </li>
                            );
                        }

                        if (item.type === 'separator') {
                            return (
                                <li key={`separator-${index}`} style={{
                                    height: '1px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    margin: '0.5rem 0'
                                }}></li>
                            );
                        }

                        const linkItem = item as Extract<MenuItem, { type: 'link' }>;

                        return (
                            <li key={linkItem.path}>
                                <NavLink
                                    to={linkItem.path}
                                    end={linkItem.key === menuKeys.DASHBOARD}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.625rem 0.75rem',
                                        borderRadius: 'var(--radius-lg)',
                                        textDecoration: 'none',
                                        fontSize: '0.875rem',
                                        fontWeight: isActive ? '600' : '500',
                                        color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)',
                                        backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                                        transition: 'all var(--transition-normal)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer'
                                    })}
                                    onMouseEnter={(e) => {
                                        if (!e.currentTarget.classList.contains('active')) {
                                            e.currentTarget.style.backgroundColor = 'var(--bg-sidebar-hover)';
                                            e.currentTarget.style.transform = 'translateX(4px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!e.currentTarget.classList.contains('active')) {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.transform = 'translateX(0)';
                                        }
                                    }}
                                >
                                    <span style={{ display: 'flex', alignItems: 'center', transition: 'transform var(--transition-normal)' }}>
                                        {linkItem.icon}
                                    </span>
                                    {linkItem.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
