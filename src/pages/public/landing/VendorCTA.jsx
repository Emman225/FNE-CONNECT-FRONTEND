import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorCTA = () => {
    const navigate = useNavigate();

    return (
        <section style={{
            position: 'relative',
            padding: '4rem 0',
            background: 'var(--gradient-brand)', /* Using the Green-Blue Mix */
            color: 'white',
            overflow: 'hidden'
        }}>
            {/* Geometric Shapes for Visual Interest */}
            <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', right: '-50px', width: '400px', height: '400px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '30px', marginBottom: '2rem', backdropFilter: 'blur(5px)' }}>
                        <span style={{ fontWeight: '600', letterSpacing: '1px', fontSize: '0.9rem' }}>PARTENARIAT STRATÉGIQUE</span>
                    </div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Optimisez votre activité commerciale
                    </h2>
                    <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '3rem', fontWeight: '300' }}>
                        Rejoignez un réseau de vendeurs d'élite utilisant FNE Connect pour sécuriser leurs revenus et automatiser leur conformité. Une gestion sans friction pour une performance maximale.
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn hover-scale"
                            onClick={() => navigate('/auth/register')}
                            style={{
                                background: 'white',
                                color: '#10b981',
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                border: 'none',
                                fontWeight: '700',
                                borderRadius: '2px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            S'abonner maintenant
                        </button>
                        <button
                            className="btn hover-scale"
                            onClick={() => navigate('/contact')}
                            style={{
                                background: 'transparent',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.3)',
                                padding: '1rem 3rem',
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                borderRadius: '2px',
                                backdropFilter: 'blur(5px)'
                            }}
                        >
                            Parler à un expert
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VendorCTA;
