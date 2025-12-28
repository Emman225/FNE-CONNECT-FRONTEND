import React from 'react';
import { Zap, Shield, Smartphone, FileText, PieChart, Users } from 'lucide-react';

const FEATURE_ITEMS = [
    {
        icon: FileText,
        title: "Facturation Simplifiée",
        description: "Créez et envoyez des factures normalisées en quelques clics."
    },
    {
        icon: Shield,
        title: "Sécurité Maximale",
        description: "Vos données sont cryptées et stockées de manière sécurisée."
    },
    {
        icon: Smartphone,
        title: "Accessible Partout",
        description: "Gérez votre entreprise depuis votre mobile, tablette ou ordinateur."
    },
    {
        icon: Zap,
        title: "Traitement Rapide",
        description: "Automatisez vos processus et gagnez un temps précieux."
    },
    {
        icon: PieChart,
        title: "Suivi en Temps Réel",
        description: "Tableaux de bord détaillés pour suivre vos performances."
    },
    {
        icon: Users,
        title: "Multi-Utilisateurs",
        description: "Travaillez en équipe avec des accès personnalisés."
    }
];

const FeaturesSection = () => {
    return (
        <section style={{ padding: '3rem 0', background: 'var(--bg-main)', overflow: 'hidden' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--secondary)', marginBottom: '1rem' }}>
                        Pourquoi choisir FNE Connect
                    </h2>
                    <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Une solution complète conçue pour répondre aux exigences modernes de la facturation électronique en Côte d'Ivoire.
                    </p>
                </div>

                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                    {/* Desktop Layout */}
                    <div className="hide-on-mobile-grid" style={{ gap: '2rem', alignItems: 'center', width: '100%' }}>

                        {/* Left Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {FEATURE_ITEMS.slice(0, 3).map((feature, index) => (
                                <div key={index} className="hover-lift" style={{
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    boxShadow: 'var(--shadow-md)',
                                    position: 'relative',
                                    textAlign: 'right',
                                    zIndex: 2
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        right: '-15px',
                                        top: '-15px',
                                        width: '50px',
                                        height: '50px',
                                        background: 'var(--secondary)',
                                        borderRadius: '10px 10px 0 10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        boxShadow: 'var(--shadow-md)'
                                    }}>
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Center Image */}
                        <div style={{ position: 'relative', height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{
                                width: '320px',
                                height: '320px',
                                borderRadius: '50%',
                                background: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                border: '8px solid white',
                                boxShadow: 'var(--shadow-xl)',
                                position: 'relative',
                                overflow: 'hidden',
                                zIndex: 1
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    background: 'rgba(30, 58, 138, 0.6)', // Blue tint
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {/* Central Logo */}
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 0 30px rgba(0,0,0,0.2)'
                                    }}>
                                        {/* Using Shield logo from lucide broadly or image if available. Reusing the icon style from Navbar */}
                                        <div style={{
                                            color: 'var(--primary)',
                                            transform: 'scale(2.2)'
                                        }}>
                                            <Shield size={24} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Orbit/Circle behind */}
                            <div style={{
                                position: 'absolute',
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                border: '2px dashed var(--primary)',
                                opacity: 0.3,
                                zIndex: 0,
                                animation: 'spin 60s linear infinite'
                            }}></div>
                        </div>

                        {/* Right Column */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {FEATURE_ITEMS.slice(3, 6).map((feature, index) => (
                                <div key={index} className="hover-lift" style={{
                                    background: 'white',
                                    padding: '1.5rem',
                                    borderRadius: '1rem',
                                    boxShadow: 'var(--shadow-md)',
                                    position: 'relative',
                                    textAlign: 'left',
                                    zIndex: 2
                                }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '-15px',
                                        top: '-15px',
                                        width: '50px',
                                        height: '50px',
                                        background: 'var(--secondary)',
                                        borderRadius: '10px 10px 10px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        boxShadow: 'var(--shadow-md)'
                                    }}>
                                        <feature.icon size={24} />
                                    </div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--secondary)', marginTop: '0.5rem' }}>{feature.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Layout (Stacked) */}
                    <div className="hide-on-desktop-flex" style={{ gap: '2rem', width: '100%' }}>
                        {/* Image for mobile */}
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            alignSelf: 'center',
                            background: 'url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: '5px solid white',
                            boxShadow: 'var(--shadow-lg)',
                            marginBottom: '2rem',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'rgba(30, 58, 138, 0.6)',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Shield size={24} color="var(--primary)" />
                                </div>
                            </div>
                        </div>

                        {FEATURE_ITEMS.map((feature, index) => (
                            <div key={index} style={{
                                background: 'white',
                                padding: '2rem',
                                borderRadius: '1rem',
                                boxShadow: 'var(--shadow-md)',
                                position: 'relative',
                                marginTop: '1rem'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    left: '20px',
                                    top: '-20px',
                                    width: '50px',
                                    height: '50px',
                                    background: 'var(--secondary)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    boxShadow: 'var(--shadow-md)'
                                }}>
                                    <feature.icon size={24} />
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--secondary)', marginTop: '1.5rem' }}>{feature.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feature.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
