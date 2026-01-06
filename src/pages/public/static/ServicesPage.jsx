import React from 'react';
import Navbar from '../../../app/public/components/Navbar';
import Footer from '../../../app/public/components/Footer';
import Container from '../../../components/ui/Container';
import { FileText, Calculator, Users, ShieldCheck, Globe, BarChart, Briefcase, PieChart, Zap, Headphones, CheckCircle2, ArrowRight, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
    {
        icon: <FileText size={32} />,
        title: "Facturation Électronique Certifiée",
        description: "Émission instantanée de factures normalisées conformes DGI. Signature numérique et archivage légal sécurisé pendant 10 ans.",
        features: ["Conformité DGI 100%", "Signature qualifiée", "Archivage probant"],
        color: "#3b82f6"
    },
    {
        icon: <Briefcase size={32} />,
        title: "Gestion Commerciale Avancée",
        description: "Optimisez votre cycle de vente de la prospection à l'encaissement. Devis, bons de commande et factures liés intelligemment.",
        features: ["Suivi des devis", "Commandes fournisseurs", "Gestion des stocks"],
        color: "#10b981"
    },
    {
        icon: <BarChart size={32} />,
        title: "Business Intelligence",
        description: "Transformez vos données en décisions. Tableaux de bord dynamiques pour piloter votre chiffre d'affaires et votre rentabilité en temps réel.",
        features: ["Rapports personnalisés", "Analyse prédictive", "Export comptable"],
        color: "#f59e0b"
    },
    {
        icon: <Globe size={32} />,
        title: "Accès & Mobilité",
        description: "Votre entreprise dans votre poche. Accédez à vos données 24/7 depuis n'importe quel appareil avec une synchronisation parfaite.",
        features: ["App mobile", "Mode hors ligne", "Multi-utilisateurs"],
        color: "#8b5cf6"
    },
    {
        icon: <Zap size={32} />,
        title: "Automatisation & API",
        description: "Connectez FNE Connect à votre écosystème existant (ERP, CRM, E-commerce) grâce à notre API robuste et documentée.",
        features: ["API RESTful", "Webhooks", "Intégrations natives"],
        color: "#ef4444"
    },
    {
        icon: <Headphones size={32} />,
        title: "Support Dédié Premium",
        description: "Une équipe d'experts à votre écoute pour vous accompagner dans votre déploiement et votre utilisation quotidienne.",
        features: ["Chat en direct", "Formation", "Account Manager"],
        color: "#06b6d4"
    }
];

const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8fafc' }}>
            <Navbar />

            {/* Premium Page Hero Section */}
            <div style={{
                position: 'relative',
                height: '450px',
                background: 'linear-gradient(rgba(1, 33, 67, 0.8), rgba(1, 33, 67, 0.95)), url(https://images.unsplash.com/photo-1454165833767-027ffea9e51e?auto=format&fit=crop&q=80&w=2000)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
                    zIndex: 0
                }}></div>
                <Container style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <span style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            marginBottom: '1.5rem',
                            display: 'inline-block',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            letterSpacing: '1px'
                        }}>
                            NOTRE EXPERTISE
                        </span>
                        <h1 style={{ fontSize: '4.5rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: 1.1 }}>
                            Solutions intelligentes pour <br />
                            <span style={{ color: 'var(--primary-light)' }}>entreprises modernes.</span>
                        </h1>
                        <p style={{ fontSize: '1.25rem', opacity: 0.9, lineHeight: 1.6 }}>
                            Nous simplifions votre gestion fiscale et commerciale grâce à une technologie de pointe conçue pour la performance et la conformité.
                        </p>
                    </div>
                </Container>
            </div>

            <main style={{ flex: 1, padding: '8rem 0' }}>
                <Container>
                    {/* Introductory Section */}
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' }}>Des services conçus pour votre succès</h2>
                        <div style={{ width: '80px', height: '5px', background: 'var(--primary)', margin: '0 auto 2rem', borderRadius: '10px' }}></div>
                        <p style={{ color: '#64748b', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.7 }}>
                            FNE Connect n'est pas qu'un simple logiciel de facturation. C'est un écosystème complet qui propulse votre entreprise vers l'excellence opérationnelle.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '3rem' }}>
                        {SERVICES.map((service, index) => (
                            <div key={index} className="hover-lift" style={{
                                padding: '3.5rem',
                                background: 'white',
                                borderRadius: '2.5rem',
                                boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.05)',
                                border: '1px solid #f1f5f9',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease'
                            }}>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    borderRadius: '20px',
                                    background: `${service.color}10`,
                                    color: service.color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '2.5rem'
                                }}>
                                    {service.icon}
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.25rem', color: '#1e293b' }}>{service.title}</h3>
                                <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: '2.5rem', fontSize: '1.1rem', flex: 1 }}>{service.description}</p>

                                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
                                    <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Inclus dans l'offre :</h4>
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: '#475569', fontSize: '0.95rem', fontWeight: '500' }}>
                                                <CheckCircle2 size={16} style={{ color: service.color }} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section - Redesigned */}
                    <div style={{
                        marginTop: '10rem',
                        padding: '6rem 4rem',
                        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                        borderRadius: '3.5rem',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 40px 60px -15px rgba(0,0,0,0.3)'
                    }}>
                        <Sparkles size={120} style={{ position: 'absolute', right: '-20px', top: '-20px', opacity: 0.1, color: 'var(--primary-light)' }} />
                        <Star size={80} style={{ position: 'absolute', left: '-20px', bottom: '-20px', opacity: 0.1, color: 'var(--primary-light)' }} />

                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Prêt à transformer votre gestion ?</h2>
                            <p style={{ fontSize: '1.3rem', opacity: 0.8, marginBottom: '3.5rem', maxWidth: '750px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
                                Rejoignez plus de 500 entreprises qui nous font confiance pour leur conformité fiscale et leur croissance quotidienne.
                            </p>
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => navigate('/auth/register')}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        padding: '1.25rem 3.5rem',
                                        fontWeight: '800',
                                        borderRadius: '1rem',
                                        border: 'none',
                                        fontSize: '1.15rem',
                                        cursor: 'pointer',
                                        boxShadow: '0 15px 30px rgba(30, 64, 175, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        transition: 'all 0.3s'
                                    }}
                                    className="hover-lift"
                                >
                                    Démarrer gratuitement <ArrowRight size={22} />
                                </button>
                                <button
                                    onClick={() => navigate('/contact')}
                                    style={{
                                        background: 'transparent',
                                        color: 'white',
                                        padding: '1.25rem 3.5rem',
                                        fontWeight: '800',
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        fontSize: '1.15rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                    className="hover-lift"
                                >
                                    Parler à un expert
                                </button>
                            </div>
                            <p style={{ marginTop: '2.5rem', fontSize: '0.95rem', opacity: 0.6, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <ShieldCheck size={18} /> Sans engagement · Support 24/7 compris
                            </p>
                        </div>
                    </div>
                </Container>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
