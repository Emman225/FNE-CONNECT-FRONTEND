import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, ChevronDown, LogOut, Settings, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Topbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // MOCK USER ROLE - In real app, get this from AuthContext
    const USER_ROLE = 'superadmin'; // Change to 'user' to test restriction

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
        console.log('Logging out...');
        // Add actual logout logic here
        navigate('/auth/login');
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
                        background: 'white',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        position: 'relative',
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all var(--transition-fast)'
                    }}
                    className="hover-lift"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                >
                    <Bell size={20} color="inherit" />
                    <span style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        width: '10px',
                        height: '10px',
                        backgroundColor: 'var(--danger)',
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: '0 2px 5px rgba(239, 68, 68, 0.4)'
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
                        style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', cursor: 'pointer', userSelect: 'none' }}
                        className="hover-lift"
                    >
                        <div className="hide-on-mobile" style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.9375rem', fontWeight: '600', margin: 0, color: 'var(--text-main)', lineHeight: 1.2 }}>Jean Kouassi</p>
                            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>Vendeur Pro</p>
                        </div>

                        <div style={{
                            width: '42px',
                            height: '42px',
                            background: 'var(--gradient-dual)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            color: 'white',
                            boxShadow: 'var(--shadow-md)',
                            border: '2px solid white'
                        }}>
                            <User size={20} />
                        </div>

                        <ChevronDown
                            size={16}
                            color="var(--text-muted)"
                            style={{
                                transition: 'transform 0.2s',
                                transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                        />
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
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>jean.kouassi@email.com</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                <Link
                                    to="/dashboard/settings"
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

                                {USER_ROLE === 'superadmin' && (
                                    <Link
                                        to="/dashboard/settings?tab=system" // Mock system settings link
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
                                        <Settings size={18} />
                                        <span>Paramètres</span>
                                        <span className="badge badge-primary" style={{ marginLeft: 'auto', fontSize: '10px', padding: '2px 6px' }}>ADMIN</span>
                                    </Link>
                                )}
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
        </header>
    );
};

export default Topbar;
