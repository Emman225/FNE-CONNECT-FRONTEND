import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calculator, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import Container from '../../../components/ui/Container';

const SERVICE_ITEMS = [
    {
        icon: <FileText size={32} />,
        title: "Facturation Certifiée",
        description: "Émettez des factures conformes aux normes DGI en quelques secondes. Signature électronique incluse.",
        color: "#0ea5e9", // Blue
        features: ["Standard DGI", "Signature Doc"]
    },
    {
        icon: <Calculator size={32} />,
        title: "Pilotage Financier",
        description: "Tableaux de bord analytiques pour suivre votre trésorerie et anticiper vos besoins de financement.",
        color: "#10b981", // Green
        features: ["KPIs Temps Réel", "Analyses Flash"]
    },
    {
        icon: <Users size={32} />,
        title: "CRM Intégré",
        description: "Vision 360° de vos clients : historique, solvabilité, encours et opportunités commerciales.",
        color: "#f59e0b", // Amber
        features: ["Historique Client", "Suivi Prospect"]
    }
];

const HomeServices = () => {
    const navigate = useNavigate();

    return (
        <section id="services" style={{ padding: '10rem 0', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
            <Container>
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 6rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem', display: 'block' }}>Notre Expertise</span>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '2rem', color: '#1e293b', lineHeight: 1.1 }}>
                        Des Solutions Taillées pour l'<span style={{ color: 'var(--secondary)' }}>Excellence Économique</span>
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.8 }}>
                        Découvrez une suite d'outils interconnectés conçus pour simplifier votre gestion quotidienne et propulser votre croissance.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
                    {SERVICE_ITEMS.map((item, index) => (
                        <div key={index} className="service-card-premium" style={{
                            background: 'white',
                            padding: '4rem 2.5rem',
                            borderRadius: '3rem',
                            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',
                            border: '1px solid #f1f5f9',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onClick={() => navigate('/services')}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '1.5rem',
                                background: `${item.color}10`,
                                color: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2.5rem',
                                transition: 'all 0.3s'
                            }} className="service-icon-box">
                                {item.icon}
                            </div>

                            <h3 style={{ fontSize: '1.75rem', fontWeight: '900', marginBottom: '1.25rem', color: '#1e293b' }}>{item.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: '2.5rem', fontSize: '1.05rem' }}>{item.description}</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3rem' }}>
                                {item.features.map((feat, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CheckCircle2 size={18} color={item.color} />
                                        <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: '600' }}>{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ color: item.color, fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                En savoir plus <ArrowRight size={20} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                    <button
                        className="hover-lift"
                        onClick={() => navigate('/services')}
                        style={{
                            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                            color: 'white',
                            padding: '1.25rem 4rem',
                            fontWeight: '800',
                            borderRadius: '1.25rem',
                            border: 'none',
                            fontSize: '1.15rem',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '1rem'
                        }}
                    >
                        Toutes nos fonctionnalités <ArrowRight size={22} />
                    </button>
                </div>
            </Container>

            <style>{`
                .service-card-premium:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 40px 70px -20px rgba(0, 0, 0, 0.12);
                    border-color: #e2e8f0;
                }
                .service-card-premium:hover .service-icon-box {
                    transform: scale(1.1) rotate(5deg);
                }
                .hover-lift:hover {
                    transform: translateY(-8px);
                }
            `}</style>
        </section>
    );
};

export default HomeServices;
