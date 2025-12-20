import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Calculator, Users, ArrowRight } from 'lucide-react';

const SERVICE_ITEMS = [
    {
        icon: <FileText size={32} />,
        title: "Facturation Certifiée",
        description: "Émettez des factures conformes aux normes DGI en quelques secondes. Signature électronique incluse."
    },
    {
        icon: <Calculator size={32} />,
        title: "Pilotage Financier",
        description: "Tableaux de bord analytiques pour suivre votre trésorerie et anticiper vos besoins de financement."
    },
    {
        icon: <Users size={32} />,
        title: "CRM Intégré",
        description: "Vision 360° de vos clients : historique, solvabilité, encours et opportunités commerciales."
    }
];

const HomeServices = () => {
    const navigate = useNavigate();

    return (
        <section id="services" style={{ padding: '4rem 0', background: 'linear-gradient(to bottom, #f8fafc, #ffffff)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 5rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>Notre Expertise</span>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', color: '#1e293b' }}>
                        Des Solutions Taillées pour l'<span style={{ color: 'var(--secondary)' }}>Excellence</span>
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', lineHeight: 1.6, fontWeight: '300' }}>
                        Découvrez une suite d'outils interconnectés conçus pour simplifier votre gestion et accélérer votre développement.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {SERVICE_ITEMS.map((item, index) => (
                        <div key={index} style={{
                            background: 'white',
                            padding: '3rem 2rem',
                            borderRadius: '16px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            cursor: 'pointer',
                            borderTop: `4px solid ${index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}` // Alternating colors
                        }}
                            className="hover:shadow-xl hover:-translate-y-2"
                        >
                            <div style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '12px',
                                background: index % 2 === 0 ? 'var(--primary-lighter)' : 'var(--secondary-lighter)',
                                color: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '2rem'
                            }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>{item.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '2rem' }}>{item.description}</p>
                            <div style={{ color: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                                En savoir plus <ArrowRight size={18} />
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                    <button
                        className="btn"
                        onClick={() => navigate('/services')}
                        style={{
                            background: 'var(--secondary)',
                            color: 'white',
                            padding: '1rem 3rem',
                            fontWeight: '600',
                            borderRadius: '30px', /* Pill shape */
                            border: 'none',
                            fontSize: '1.1rem',
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        Voir toutes nos fonctionnalités
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HomeServices;
