import React from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { FileText, Calculator, Users, ShieldCheck, Globe, BarChart, Briefcase, PieChart, Zap, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
    {
        icon: <FileText size={48} />,
        title: "Facturation Électronique Certifiée",
        description: "Émission instantanée de factures normalisées conformes DGI. Signature numérique et archivage légal sécurisé pendant 10 ans.",
        features: ["Conformité DGI 100%", "Signature qualifiée", "Archivage probant"]
    },
    {
        icon: <Briefcase size={48} />,
        title: "Gestion Commerciale Avancée",
        description: "Optimisez votre cycle de vente de la prospection à l'encaissement. Devis, bons de commande et factures liés intelligemment.",
        features: ["Suivi des devis", "Commandes fournisseurs", "Gestion des stocks"]
    },
    {
        icon: <PieChart size={48} />,
        title: "Business Intelligence",
        description: "Transformez vos données en décisions. Tableaux de bord dynamiques pour piloter votre chiffre d'affaires et votre rentabilité en temps réel.",
        features: ["Rapports personnalisés", "Analyse prédictive", "Export comptable"]
    },
    {
        icon: <Globe size={48} />,
        title: "Accès & Mobilité",
        description: "Votre entreprise dans votre poche. Accédez à vos données 24/7 depuis n'importe quel appareil avec une synchronisation parfaite.",
        features: ["App mobile", "Mode hors ligne", "Multi-utilisateurs"]
    },
    {
        icon: <Zap size={48} />,
        title: "Automatisation & API",
        description: "Connectez FNE Connect à votre écosystème existant (ERP, CRM, E-commerce) grâce à notre API robuste et documentée.",
        features: ["API RESTful", "Webhooks", "Intégrations natives"]
    },
    {
        icon: <Headphones size={48} />,
        title: "Support Dédié Premium",
        description: "Une équipe d'experts à votre écoute pour vous accompagner dans votre déploiement et votre utilisation quotidienne.",
        features: ["Chat en direct", "Formation", "Account Manager"]
    }
];

const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '400px',
                background: 'linear-gradient(rgba(10, 111, 189, 0.85), rgba(6, 78, 59, 0.85)), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                marginTop: '0'
            }}>
                <Container>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '1rem', display: 'block' }}>FNE CONNECT</span>
                        <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '4px' }}>Services</h1>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, background: '#f8fafc', padding: '5rem 0' }}>
                <div className="container">

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
                        {SERVICES.map((service, index) => (
                            <div key={index} className="card hover-scale" style={{
                                padding: '3rem',
                                background: 'white',
                                borderTop: `4px solid ${index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)'}`, // Alternating colors
                                borderRadius: '4px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                            }}>
                                <div style={{
                                    color: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
                                    marginBottom: '2rem',
                                    background: index % 2 === 0 ? 'var(--primary-lighter)' : 'var(--secondary-lighter)',
                                    display: 'inline-flex',
                                    padding: '1rem',
                                    borderRadius: '50%'
                                }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#1e293b' }}>{service.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.05rem' }}>{service.description}</p>

                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569', fontSize: '0.95rem' }}>
                                            <div style={{ width: '6px', height: '6px', backgroundColor: index % 2 === 0 ? 'var(--primary)' : 'var(--secondary)', borderRadius: '50%' }}></div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '6rem', padding: '4rem', background: 'var(--secondary)', borderRadius: '4px', color: 'white', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Une question sur nos offres ?</h2>
                        <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                            Nos experts sont à votre disposition pour analyser vos besoins et vous proposer la solution la plus adaptée.
                        </p>
                        <button
                            className="btn"
                            onClick={() => navigate('/auth/register')}
                            style={{
                                background: 'white',
                                color: 'var(--secondary)',
                                padding: '1rem 3rem',
                                fontWeight: '700',
                                border: 'none',
                                fontSize: '1.1rem'
                            }}
                        >
                            Demander une démo
                        </button>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
