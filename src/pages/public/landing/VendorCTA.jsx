import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
import Container from '../../../components/ui/Container';

const VendorCTA = () => {
    const navigate = useNavigate();

    return (
        <section style={{
            position: 'relative',
            padding: '12rem 0',
            background: 'linear-gradient(135deg, #012143 0%, #064e3b 100%)',
            color: 'white',
            overflow: 'hidden'
        }}>
            {/* Animated Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(50px)'
            }}></div>
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(50px)'
            }}></div>

            <Container style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>

                    <div style={{
                        background: 'rgba(255,255,255,0.1)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        marginBottom: '3rem',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <Rocket size={18} color="#10b981" />
                        <span style={{ fontWeight: '800', letterSpacing: '2px', fontSize: '0.85rem', textTransform: 'uppercase' }}>Propulsez votre business</span>
                    </div>

                    <h2 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '2.5rem', lineHeight: 1.1 }}>
                        Optimisez votre activité <br />avec l'<span style={{ color: '#10b981' }}>Excellence Fiscale</span>
                    </h2>

                    <p style={{ fontSize: '1.4rem', opacity: 0.8, lineHeight: 1.8, marginBottom: '4rem', fontWeight: '400', maxWidth: '750px' }}>
                        Rejoignez un réseau de leaders utilisant FNE Connect pour sécuriser leurs flux financiers et automatiser leur conformité DGI en un temps record.
                    </p>

                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="hover-lift"
                            onClick={() => navigate('/auth/register')}
                            style={{
                                background: 'white',
                                color: '#064e3b',
                                padding: '1.25rem 4rem',
                                fontSize: '1.2rem',
                                border: 'none',
                                fontWeight: '900',
                                borderRadius: '1.25rem',
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}
                        >
                            S'inscrire maintenant <ArrowRight size={24} />
                        </button>
                        <button
                            className="hover-lift"
                            onClick={() => navigate('/contact')}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.2)',
                                padding: '1.25rem 4rem',
                                fontSize: '1.2rem',
                                fontWeight: '800',
                                borderRadius: '1.25rem',
                                backdropFilter: 'blur(10px)',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            Parler à un expert
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

export default VendorCTA;
