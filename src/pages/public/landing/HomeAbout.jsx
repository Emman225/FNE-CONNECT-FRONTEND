import React from 'react';
import { ArrowRight, CheckCircle2, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../components/ui/Container';

const HomeAbout = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '10rem 0', background: '#ffffff', position: 'relative', overflow: 'hidden' }}>
            <Container>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '8rem', alignItems: 'center' }}>

                    {/* Visual with premium shadow and decorative elements */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            top: '-40px',
                            left: '-40px',
                            width: '200px',
                            height: '200px',
                            border: '15px solid rgba(16, 185, 129, 0.05)',
                            borderRadius: '3rem',
                            zIndex: 0
                        }}></div>

                        <div style={{
                            position: 'relative',
                            height: '600px',
                            background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '3.5rem',
                            boxShadow: '0 40px 80px -20px rgba(0, 0, 0, 0.2)',
                            zIndex: 1
                        }}>
                            {/* Dark Overlay for better contrast */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom, transparent 50%, rgba(1, 33, 67, 0.8))',
                                borderRadius: '3.5rem'
                            }}></div>

                            {/* Floating Badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '3rem',
                                left: '-2rem',
                                background: 'white',
                                padding: '2.5rem',
                                borderRadius: '2.5rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                                zIndex: 10,
                                border: '1px solid #f1f5f9',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    background: 'var(--primary-lighter)',
                                    color: 'var(--primary)',
                                    borderRadius: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1.5rem'
                                }}>
                                    <Award size={32} />
                                </div>
                                <div style={{ fontSize: '3rem', fontWeight: '900', lineHeight: 1, marginBottom: '0.25rem', color: '#1e293b' }}>10+</div>
                                <div style={{ fontWeight: '700', fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--primary)' }}>Années d'Expertise</div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '4px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', color: 'var(--primary)', fontSize: '0.85rem' }}>Qui sommes-nous</span>
                        </div>
                        <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2.5rem', color: '#1e293b', lineHeight: 1.1 }}>
                            Le Partenaire de Confiance pour votre <span style={{ color: 'var(--primary)' }}>Sérénité Fiscale</span>.
                        </h2>
                        <p style={{ fontSize: '1.25rem', lineHeight: 1.8, color: '#64748b', marginBottom: '3rem' }}>
                            FNE Connect n'est pas seulement une plateforme de facturation. C'est un écosystème numérique complet certifié DGI, conçu pour sécuriser vos échanges et automatiser vos processus financiers les plus complexes.
                        </p>

                        <div style={{ display: 'grid', gap: '1.5rem', marginBottom: '4rem' }}>
                            {[
                                "Conformité réglementaire totale DGI",
                                "Sécurisation avancée des données financières",
                                "Accompagnement expert et support dédié"
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <CheckCircle2 size={24} color="var(--primary)" />
                                    <span style={{ fontSize: '1.1rem', color: '#334155', fontWeight: '500' }}>{item}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            className="hover-lift"
                            onClick={() => navigate('/about')}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.25rem 3rem',
                                fontSize: '1.15rem',
                                fontWeight: '800',
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '1.25rem',
                                boxShadow: '0 20px 40px rgba(16, 185, 129, 0.2)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            Découvrir notre vision <ArrowRight size={22} />
                        </button>
                    </div>

                </div>
            </Container>

            <style>{`
                .hover-lift:hover {
                    transform: translateY(-8px);
                }
            `}</style>
        </section>
    );
};

export default HomeAbout;
