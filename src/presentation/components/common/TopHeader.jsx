import React from 'react';
import { Phone, Facebook, Linkedin, Twitter, ShieldCheck } from 'lucide-react'; // X icon usually represented by Twitter or generic
import { useNavigate } from 'react-router-dom';

const TopHeader = () => {
    const navigate = useNavigate();

    return (
        <div style={{ width: '100%', fontFamily: "'Inter', sans-serif" }}>
            {/* Top Green Strip */}
            <div style={{ height: '8px', backgroundColor: '#10b981', width: '100%' }}></div>

            {/* Main Blue Background Section */}
            <div style={{
                backgroundColor: '#067ac2',
                color: 'white',
                padding: '0.5rem 1rem', /* Small height as requested */
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.85rem' /* Compact text */
                }}>
                    {/* Left: Slogan Only */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                        {/* Slogan */}
                        <div style={{ fontStyle: 'italic', opacity: 0.9 }} className="hide-on-mobile">
                            Ensemble, donnons de la valeur à vos chiffres par L'Excellence Fiscale Numérique
                        </div>
                    </div>

                    {/* Right: Contact, Button, Socials */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                        {/* Phone */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="hide-on-mobile">
                            <div style={{
                                background: 'rgba(255,255,255,0.15)',
                                borderRadius: '50%',
                                padding: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Phone size={14} fill="white" />
                            </div>
                            <span style={{ fontWeight: '600' }}>(+225) 0788866611</span>
                        </div>

                        <button
                            onClick={() => navigate('/auth/login')}
                            style={{
                                backgroundColor: 'white',
                                color: '#067ac2',
                                border: 'none',
                                borderRadius: '20px',
                                padding: '0.4rem 1.25rem',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            Se connecter
                        </button>

                        {/* Social Icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <a href="#" style={{ color: 'white', opacity: 0.9 }}><Facebook size={16} /></a>
                            <a href="#" style={{ color: 'white', opacity: 0.9 }}><Linkedin size={16} /></a>
                            <a href="#" style={{ color: 'white', opacity: 0.9 }}>
                                {/* Custom X Icon shape or generic Twitter for now */}
                                <span style={{ fontWeight: '800', fontSize: '14px' }}>X</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
