import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop);
        return () => window.removeEventListener('scroll', checkScrollTop);
    }, [showScroll]);

    return (
        <footer>
            {/* Top Section - Reduced Height */}
            <div style={{ background: 'linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%)', color: 'var(--text-on-dark)', padding: '3rem 0 2rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>

                        {/* Brand */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                                    <ShieldCheck size={24} color="#ffffff" />
                                </div>
                                <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
                                    FNE <span style={{ color: '#ffffff' }}>CONNECT</span>
                                </span>
                            </div>
                            <p style={{ opacity: 0.9, lineHeight: '1.6', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                                Partenaire stratégique de votre réussite fiscale. Solution agréée DGI.
                            </p>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {['FB', 'LN', 'TW'].map((social, idx) => (
                                    <div key={idx} style={{
                                        width: '35px', height: '35px',
                                        background: 'rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '50%', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        <span style={{ fontSize: '0.7rem' }}>{social}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Solutions */}
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Solutions</h4>
                            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.9, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <li><a href="/services" style={{ color: 'var(--text-on-dark)', textDecoration: 'none' }}>Facturation Électronique</a></li>
                                <li><a href="/services" style={{ color: 'var(--text-on-dark)', textDecoration: 'none' }}>Gestion Commerciale</a></li>
                                <li><a href="/services" style={{ color: 'var(--text-on-dark)', textDecoration: 'none' }}>Reporting Financier</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem', color: 'white', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Contact</h4>
                            <ul style={{ listStyle: 'none', padding: 0, opacity: 0.9, display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.9rem' }}>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                                    <MapPin size={18} style={{ marginTop: '0.15rem', color: 'white' }} />
                                    <span style={{ lineHeight: 1.5 }}>Abidjan, Cocody<br />Angré Tapis Rouge</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <Phone size={18} style={{ color: 'white' }} />
                                    <span>+225 27 22 55 44 33</span>
                                </li>
                                <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                    <Mail size={18} style={{ color: 'white' }} />
                                    <a href="mailto:contact@fne-connect.com" style={{ color: 'white' }}>contact@fne-connect.com</a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Section - Colored Background */}
            <div style={{ backgroundColor: 'black', color: 'white', padding: '1rem 0', fontSize: '0.8rem' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                        <span>© {new Date().getFullYear()} DIO SARL. Tous droits réservés.</span>
                        <div style={{ display: 'flex', gap: '2rem' }}>
                            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }} className="hover:text-white">Mentions Légales</a>
                            <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }} className="hover:text-white">Confidentialité</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollTop}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    height: '50px',
                    width: '50px',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: showScroll ? 'flex' : 'none',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease'
                }}
            >
                <ArrowUp size={24} />
            </button>
        </footer>
    );
};

export default Footer;
