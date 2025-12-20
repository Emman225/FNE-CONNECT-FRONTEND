import React from 'react';
import { FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section style={{
            padding: '8rem 0 6rem',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #EFF6FF 100%)',
            minHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Decoration */}
            <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0, 186, 113, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
                borderRadius: '50%',
                zIndex: 0
            }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Text Content */}
                    <div className="fade-in">
                        <div className="badge badge-info" style={{ marginBottom: '1.5rem', gap: '0.5rem', padding: '0.5rem 1rem', background: 'white', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                            <ShieldCheck size={16} color="var(--primary)" />
                            <span style={{ color: 'var(--text-main)' }}>Conforme DGI Côte d'Ivoire</span>
                        </div>

                        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1', color: 'var(--text-main)', fontWeight: '800' }}>
                            Soyez conforme,<br />
                            <span style={{
                                background: 'var(--gradient-text)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                position: 'relative',
                                display: 'inline-block'
                            }}>
                                facturez simplement.
                                <svg width="100%" height="12" viewBox="0 0 200 12" style={{ position: 'absolute', bottom: '0px', left: 0, opacity: 0.3, zIndex: -1 }}>
                                    <path d="M2 5 Q 100 15 198 5" stroke="var(--secondary)" strokeWidth="6" fill="none" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-muted text-lg" style={{ marginBottom: '2.5rem', maxWidth: '550px', lineHeight: 1.6 }}>
                            La solution complète pour les artisans, freelances et commerçants. Émettez des Factures Normalisées Électroniques sans tracas administratifs.
                        </p>

                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/auth/register')}
                                className="btn btn-primary"
                                style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
                            >
                                Créer mon compte gratuit
                                <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => document.getElementById('steps').scrollIntoView({ behavior: 'smooth' })}
                                className="btn btn-secondary"
                                style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}
                            >
                                Voir comment ça marche
                            </button>
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', gap: '2rem', alignItems: 'center', opacity: 0.8 }}>
                            <div className="text-sm text-muted">Utilisé par plus de <strong style={{ color: 'var(--primary)' }}>500+</strong> entreprises</div>
                            <div style={{ height: '20px', borderLeft: '1px solid var(--border-color)' }}></div>
                            <div className="text-sm text-muted">Support <strong>24/7</strong></div>
                        </div>
                    </div>

                    {/* Visual/Image Placeholder */}
                    <div style={{ position: 'relative', perspective: '1000px' }} className="slide-in">
                        <div className="glass-card" style={{
                            padding: '2.5rem',
                            transform: 'rotateY(-5deg) rotateX(2deg)',
                            transition: 'transform 0.5s ease',
                            background: 'rgba(255,255,255,0.7)'
                        }}
                            onMouseMove={(e) => {
                                e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.02)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'rotateY(-5deg) rotateX(2deg)';
                            }}
                        >
                            {/* Abstract UI representation */}
                            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', background: 'var(--gradient-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 10px rgba(0, 186, 113, 0.2)' }}>
                                        <FileCheck size={24} />
                                    </div>
                                    <div>
                                        <div style={{ width: '100px', height: '10px', backgroundColor: 'var(--text-main)', borderRadius: '4px', opacity: 0.8, marginBottom: '0.5rem' }}></div>
                                        <div style={{ width: '60px', height: '8px', backgroundColor: 'var(--text-secondary)', borderRadius: '4px', opacity: 0.5 }}></div>
                                    </div>
                                </div>
                                <div className="badge badge-success" style={{ padding: '0.5rem 1rem' }}>Payé</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                <div style={{ height: '70px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-main)' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ width: '60%', height: '8px', backgroundColor: 'var(--text-secondary)', borderRadius: '4px', opacity: 0.3, marginBottom: '6px' }}></div>
                                        <div style={{ width: '40%', height: '6px', backgroundColor: 'var(--text-secondary)', borderRadius: '4px', opacity: 0.2 }}></div>
                                    </div>
                                </div>
                                <div style={{ height: '70px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', padding: '0 1rem', opacity: 0.6 }}></div>
                            </div>

                            <div style={{ padding: '1.5rem', background: 'var(--gradient-card-accent-blue)', borderRadius: '16px', color: 'white', textAlign: 'center', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)' }}>
                                <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Montant Total</div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', letterSpacing: '-0.02em' }}>150.000 FCFA</div>
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-40px',
                            left: '-40px',
                            backgroundColor: 'white',
                            color: 'var(--text-main)',
                            padding: '1.25rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-xl)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            transform: 'rotate(5deg)',
                            border: '1px solid rgba(255,255,255,0.8)',
                            zIndex: 2
                        }}>
                            <div style={{ background: 'var(--success-light)', color: 'var(--success)', borderRadius: '50%', padding: '0.75rem' }}>
                                <ShieldCheck size={28} />
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: 1 }}>100%</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', marginTop: '4px' }}>Conforme & Sécurisé</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
