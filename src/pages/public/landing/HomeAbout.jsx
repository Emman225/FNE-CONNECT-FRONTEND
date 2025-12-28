import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomeAbout = () => {
    const navigate = useNavigate();

    return (
        <section style={{ padding: '4rem 0', background: '#ffffff', position: 'relative' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'center' }}>

                    {/* Visual with premium shadow */}
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            position: 'relative',
                            height: '500px',
                            background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '4px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}>
                            {/* Blue Accent Overlay */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, transparent 100%)',
                                borderRadius: '4px'
                            }}></div>

                            <div style={{
                                position: 'absolute',
                                bottom: '-3rem',
                                left: '-3rem',
                                background: '#10b981', // Green 
                                color: 'white',
                                padding: '3rem',
                                borderRadius: '2px', // Sharper corners
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}>
                                <div style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1, marginBottom: '0.5rem' }}>10+</div>
                                <div style={{ fontWeight: '500', fontSize: '1.1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Années d'Expertise</div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ width: '40px', height: '4px', background: '#10b981' }}></div>
                            <span style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', color: '#10b981', fontSize: '0.9rem' }}>Qui sommes-nous</span>
                        </div>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '2rem', color: '#1e293b', lineHeight: 1.1 }}>
                            Le Partenaire de Confiance pour votre <span style={{ color: '#10b981' }}>Croissance</span>.
                        </h2>
                        <p style={{ fontSize: '1.25rem', lineHeight: 1.7, color: '#475569', marginBottom: '2rem', fontWeight: '300' }}>
                            FNE Connect n'est pas seulement une plateforme de facturation. C'est un écosystème numérique complet conçu pour sécuriser vos échanges et optimiser vos processus financiers.
                        </p>
                        <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '2rem', marginBottom: '3rem', background: 'rgba(16, 185, 129, 0.05)', padding: '1.5rem', borderRadius: '0 4px 4px 0' }}>
                            <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: '#10b981', margin: 0 }}>
                                "Notre mission est de transformer la complexité fiscale en avantage compétitif pour nos clients."
                            </p>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/about')}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#10b981' }}
                        >
                            Découvrir notre vision <ArrowRight size={20} />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
