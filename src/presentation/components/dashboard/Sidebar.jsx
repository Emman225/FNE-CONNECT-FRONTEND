import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, CreditCard, Settings, LogOut, FileCheck, ShieldCheck, Wallet, TrendingUp, Shield } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Tableau de bord', path: '/dashboard' },
        { icon: <FileText size={20} />, label: 'Factures', path: '/dashboard/invoices' },
        { icon: <FileText size={20} />, label: 'Devis', path: '/dashboard/quotes' },
        { icon: <FileCheck size={20} />, label: 'Proformas', path: '/dashboard/proformas' },
        { icon: <Users size={20} />, label: 'Clients', path: '/dashboard/clients' },
        { icon: <CreditCard size={20} />, label: 'Paiements', path: '/dashboard/payments' },
        { icon: <Wallet size={20} />, label: 'Commissions', path: '/dashboard/commissions' },
        { icon: <TrendingUp size={20} />, label: 'Reversements', path: '/dashboard/payouts' },
        { icon: <Shield size={20} />, label: 'Conformité AML', path: '/dashboard/compliance/aml' },
        { icon: <FileCheck size={20} />, label: 'Rapports DGI', path: '/dashboard/reports' },
        { type: 'separator' },
        { icon: <ShieldCheck size={20} />, label: 'Gestion Vendeurs', path: '/dashboard/admin/vendors' },
        { icon: <Settings size={20} />, label: 'Configuration', path: '/dashboard/admin/config' },
        { icon: <TrendingUp size={20} />, label: 'Reporting Global', path: '/dashboard/admin/reporting' },
        { type: 'separator' },
        { icon: <Settings size={20} />, label: 'Paramètres', path: '/dashboard/settings' },
    ];

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
            borderRight: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)'
        }}>
            {/* Brand Header */}
            <div style={{
                padding: '2rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                borderBottom: '1px solid var(--border-color)'
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
                        color: 'var(--text-main)',
                        letterSpacing: '-0.5px',
                        display: 'block',
                        lineHeight: 1
                    }}>
                        FNE <span style={{ color: 'var(--secondary)' }}>Connect</span>
                    </span>
                    <span style={{
                        fontSize: '0.675rem',
                        color: 'var(--text-muted)',
                        fontWeight: '500',
                        letterSpacing: '0.5px'
                    }}>
                        PORTAGE FISCAL
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    {menuItems.map((item, index) => {
                        if (item.type === 'separator') {
                            return (
                                <li key={`separator-${index}`} style={{
                                    height: '1px',
                                    backgroundColor: 'var(--border-color)',
                                    margin: '0.75rem 0'
                                }}></li>
                            );
                        }

                        return (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === '/dashboard'}
                                    style={({ isActive }) => ({
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.875rem',
                                        padding: '0.875rem 1rem',
                                        borderRadius: 'var(--radius-lg)',
                                        textDecoration: 'none',
                                        fontSize: '0.9375rem',
                                        fontWeight: isActive ? '600' : '500',
                                        color: isActive ? 'var(--secondary)' : 'var(--text-secondary)',
                                        backgroundColor: isActive ? 'var(--bg-sidebar-hover)' : 'transparent',
                                        borderLeft: isActive ? '3px solid var(--secondary)' : '3px solid transparent',
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
                                        {item.icon}
                                    </span>
                                    {item.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Profile Section */}
            <div style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.875rem'
            }}>
                <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--gradient-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '700',
                    fontSize: '0.9375rem',
                    boxShadow: 'var(--shadow-md)'
                }}>
                    MK
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.9375rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Jean Kouassi
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        Vendeur
                    </div>
                </div>
                <button
                    onClick={() => console.log('Logout')}
                    style={{
                        border: 'none',
                        background: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                        e.currentTarget.style.color = 'var(--danger)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                    title="Déconnexion"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
