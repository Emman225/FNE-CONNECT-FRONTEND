import React, { useState, useRef, useEffect } from 'react';
import { BellRing, Search, User, ChevronDown, LogOut, Settings, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { roleLabels, userRoles, isAdminRole } from '../../../../types/roles';
import { useAuth } from '../../../../auth/AuthProvider';

const Topbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Determine base path based on area
    const isAdminArea = location.pathname.startsWith('/admin');
    const basePath = isAdminArea ? '/admin/dashboard' : '/dashboard';
    const profilePath = isAdminArea ? '/admin/dashboard/profile' : '/dashboard/settings';

    // Get role label or fallback
    const userRoleLabel = user?.role ? roleLabels[user.role] : 'Utilisateur';
    const userName = user?.name || 'Utilisateur';
    const userEmail = user?.email || '';

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Capture the user role BEFORE clearing
        const currentUserRole = user?.role;
        const wasAdmin = currentUserRole && isAdminRole(currentUserRole);

        // Clear storage immediately
        localStorage.removeItem('fne_user');

        // Redirect immediately without triggering React state updates
        if (wasAdmin) {
            window.location.href = '/admin';
        } else {
            window.location.href = '/auth/login';
        }
    };

    return (
        <header style={{
            height: '80px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2.5rem',
            position: 'sticky',
            top: 0,
            zIndex: 40,
            transition: 'all var(--transition-normal)'
        }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '380px' }} className="fade-in">
                    <Search
                        size={20}
                        style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)'
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Rechercher une facture, un client..."
                        className="input-field"
                        style={{
                            paddingLeft: '3rem',
                            paddingRight: '1rem',
                            height: '46px',
                            backgroundColor: 'var(--bg-main)',
                            border: '1px solid transparent',
                            fontSize: '0.9375rem',
                            borderRadius: 'var(--radius-xl)',
                            transition: 'all var(--transition-normal)',
                            width: '100%',
                            boxShadow: 'none'
                        }}
                        onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = 'var(--primary)';
                            e.target.style.boxShadow = '0 0 0 4px var(--primary-lighter)';
                        }}
                        onBlur={(e) => {
                            e.target.style.backgroundColor = 'var(--bg-main)';
                            e.target.style.borderColor = 'transparent';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                {/* Notifications */}
                <button
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--border-color)', // Default border
                        cursor: 'pointer',
                        position: 'relative',
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-secondary)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--primary-lighter)';
                        e.currentTarget.style.borderColor = 'var(--primary-light)'; // Greenish border on hover
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'var(--border-color)'; // Reset to default border
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <BellRing size={20} style={{ strokeWidth: 2.5 }} color="currentColor" />
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--danger)',
                        borderRadius: '50%',
                        border: '1.5px solid white',
                        boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                    }}></span>
                </button>

                <div style={{ height: '32px', width: '1px', backgroundColor: 'var(--border-color)' }}></div>

                {/* Profile Dropdown */}
                <div
                    ref={menuRef}
                    style={{ position: 'relative' }}
                >
                    <div
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            cursor: 'pointer',
                            userSelect: 'none',
                            padding: '0.25rem 0.5rem 0.25rem 1rem', // Reduced vertical padding
                            borderRadius: 'var(--radius-full)',
                            border: '1px solid var(--border-color)', // Default border
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            background: 'transparent',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,253,244,0.8))';
                            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)'; // Stronger green border on hover
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(16, 185, 129, 0.1)';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = 'var(--border-color)'; // Reset to default border
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <div style={{
                            width: '36px', // Reduced from 42px
                            height: '36px', // Reduced from 42px
                            background: 'var(--gradient-dual)',
                            borderRadius: '10px', // Adjusted radius
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            color: 'white',
                            textAlign: 'center', // Ensure icon is centered
                            boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
                            border: '2px solid rgba(255,255,255,0.8)',
                            transition: 'transform 0.3s ease',
                            flexShrink: 0
                        }}>
                            <User size={18} />
                        </div>

                        <div className="hide-on-mobile" style={{ textAlign: 'left', padding: '0 0.5rem' }}>
                            <p style={{
                                fontSize: '0.875rem',
                                fontWeight: '700',
                                margin: 0,
                                background: 'var(--gradient-dual)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                lineHeight: 1.2
                            }}>{userName}, <span style={{ fontSize: '0.7em', fontWeight: '500', color: 'var(--text-secondary)', WebkitTextFillColor: 'var(--text-secondary)' }}>{userRoleLabel}</span></p>
                        </div>

                        <div style={{
                            marginLeft: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s'
                        }}>
                            <ChevronDown
                                size={18}
                                color="var(--text-secondary)"
                                style={{
                                    transition: 'transform 0.2s',
                                    transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="fade-in" style={{
                            position: 'absolute',
                            top: 'calc(100% + 1rem)',
                            right: 0,
                            width: '240px',
                            backgroundColor: 'white',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: 'var(--shadow-xl)',
                            border: '1px solid var(--border-color)',
                            padding: '0.5rem',
                            overflow: 'hidden',
                            zIndex: 100
                        }}>
                            {/* Header inside menu */}
                            <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '0.5rem' }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Mon Compte</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userEmail}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <Link
                                    to={profilePath}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="menu-item"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        color: 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        fontSize: '0.9375rem',
                                        borderRadius: 'var(--radius-md)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }}
                                >
                                    <User size={18} />
                                    <span>Mon Profil</span>
                                </Link>


                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        color: 'var(--danger)',
                                        background: 'none',
                                        border: 'none',
                                        fontSize: '0.9375rem',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--danger-light)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <LogOut size={18} />
                                    <span>Déconnexion</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header >
    );
};

export default Topbar;
