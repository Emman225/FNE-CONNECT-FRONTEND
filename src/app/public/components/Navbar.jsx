import React, { useState } from 'react';
import { Menu, X, ShieldCheck, FileText, ClipboardList, LogIn, UserPlus } from 'lucide-react';
import TopHeader from './TopHeader';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isRegisterPage = location.pathname === '/auth/register';

    const [showNavbarButton, setShowNavbarButton] = useState(false);

    // Handle initial hash scroll
    React.useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    }, [location]);


    React.useEffect(() => {
        const handleScroll = () => {
            // TopHeader is approx 50-60px high. When scrolled past that, show navbar button.
            if (window.scrollY > 50) {
                setShowNavbarButton(true);
            } else {
                setShowNavbarButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <TopHeader />
            <nav style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div className="container">
                    <div className="flex-between" style={{ height: '65px' }}>
                        {/* Logo */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: 'var(--primary)',
                                borderRadius: '10px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <ShieldCheck size={24} />
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.5px', color: 'var(--primary)' }}>
                                FNE <span style={{ color: 'var(--primary)', opacity: 0.7 }}>CONNECT</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                            {[
                                { path: '/', label: 'Accueil' },
                                { path: '/about', label: 'A Propos' },
                                { path: '/services', label: 'Services' },
                            ].map((link) => {
                                const isActive = location.pathname === link.path;

                                return (
                                    <div
                                        key={link.path}
                                        onClick={() => navigate(link.path)}
                                        style={{
                                            fontWeight: 500,
                                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            position: 'relative'
                                        }}
                                    >
                                        {link.label}
                                        {isActive && (
                                            <div style={{
                                                position: 'absolute',
                                                bottom: '-4px',
                                                left: 0,
                                                width: '100%',
                                                height: '2px',
                                                background: 'var(--primary)',
                                                borderRadius: '2px'
                                            }} />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginRight: '0.75rem', paddingRight: '0.75rem', borderRight: '1px solid var(--border-color)' }}>
                                <button onClick={() => navigate('/tools/invoice')} className="btn btn-outline btn-sm">
                                    <FileText size={16} />
                                    Facture
                                </button>
                                <button onClick={() => navigate('/tools/proforma')} className="btn btn-outline btn-sm">
                                    <ClipboardList size={16} />
                                    Proforma
                                </button>
                            </div>

                            <button onClick={() => navigate('/auth/login')} className="btn btn-secondary btn-sm">
                                <LogIn size={16} />
                                Se connecter
                            </button>

                            {!isRegisterPage && (
                                <button onClick={() => navigate('/auth/register')} className="btn btn-primary btn-sm">
                                    <UserPlus size={16} />
                                    S'abonner
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="hide-on-desktop" style={{ display: 'none' }}>
                            <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)' }}>
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isOpen && (
                        <div className="hide-on-desktop" style={{
                            padding: '1.5rem',
                            borderTop: '1px solid var(--border-color)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            backgroundColor: 'white',
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <a href="#" onClick={() => setIsOpen(false)} style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--primary)' }}>Accueil</a>
                            <a href="#steps" onClick={() => setIsOpen(false)} style={{ padding: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Comment ça marche</a>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                    <button onClick={() => navigate('/tools/invoice')} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                                        <FileText size={16} />
                                        Facture
                                    </button>
                                    <button onClick={() => navigate('/tools/proforma')} className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                                        <ClipboardList size={16} />
                                        Proforma
                                    </button>
                                </div>
                                <button onClick={() => navigate('/auth/login')} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                                    <LogIn size={16} />
                                    Se connecter
                                </button>
                                <button onClick={() => navigate('/auth/register')} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                                    <UserPlus size={16} />
                                    S'abonner
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
};

export default Navbar;
