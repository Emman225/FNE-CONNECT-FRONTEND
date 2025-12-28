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

                    {/* Right: Socials, Links, Contact */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

                        {/* Top Links */}
                        <div style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid rgba(255,255,255,0.2)', paddingRight: '0.75rem' }} className="hide-on-mobile">
                            <button onClick={() => navigate('/news')} className="btn btn-ghost-white btn-sm">Actualités</button>
                            <button onClick={() => navigate('/faq')} className="btn btn-ghost-white btn-sm">FAQ</button>
                            <button onClick={() => navigate('/contact')} className="btn btn-ghost-white btn-sm">Contact</button>
                        </div>

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

                        {/* Social Icons */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <a href="#" className="btn btn-ghost-white btn-icon btn-sm" style={{ padding: '0.5rem' }}><Facebook size={16} /></a>
                            <a href="#" className="btn btn-ghost-white btn-icon btn-sm" style={{ padding: '0.5rem' }}><Linkedin size={16} /></a>
                            <a href="#" className="btn btn-ghost-white btn-icon btn-sm" style={{ padding: '0.5rem' }}>
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
