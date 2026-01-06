import React from 'react';
import { UserPlus, FileText, Wallet, CheckCircle, ArrowRight } from 'lucide-react';
import Container from '../../../components/ui/Container';

const steps = [
    {
        icon: <UserPlus size={32} />,
        title: "Inscription & KYC",
        description: "Créez votre compte en quelques minutes avec vos informations de base et documents d'identité.",
        color: "var(--primary)"
    },
    {
        icon: <FileText size={32} />,
        title: "Création Facture",
        description: "Éditez des devis et factures professionnels entièrement conformes aux normes DGI.",
        color: "#0ea5e9"
    },
    {
        icon: <Wallet size={32} />,
        title: "Paiement Commission",
        description: "Réglez la commission de portage en toute sécurité via Mobile Money ou Carte Bancaire.",
        color: "#f59e0b"
    },
    {
        icon: <CheckCircle size={32} />,
        title: "Reversement",
        description: "Recevez vos paiements clients et vos reversements directement sur votre compte bancaire.",
        color: "#10b981"
    }
];

const StepsSection = () => {
    return (
        <section id="steps" style={{ padding: '10rem 0', backgroundColor: '#fdfdfd', position: 'relative', overflow: 'hidden' }}>
            <Container>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2.5rem', marginBottom: '6rem', flexWrap: 'wrap' }}>
                    <div style={{
                        background: 'var(--primary-lighter)',
                        color: 'var(--primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '1rem',
                        fontSize: '0.85rem',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        border: '1px solid var(--primary-light)'
                    }}>
                        Simplicité & Efficacité
                    </div>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: '#1e293b', margin: 0, lineHeight: 1 }}>
                        Un Processus <span style={{ color: 'var(--primary)' }}>Fluide</span> en 4 Étapes
                    </h2>
                </div>

                <p style={{ textAlign: 'center', fontSize: '1.25rem', lineHeight: 1.8, color: '#64748b', maxWidth: '900px', margin: '-3rem auto 6rem auto' }}>
                    FNE Connect simplifie vos démarches administratives complexes pour vous permettre de vous concentrer sur ce qui compte vraiment : votre croissance.
                </p>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '2rem',
                    position: 'relative'
                }}>
                    {/* Connecting Line (Desktop Only) */}
                    <div style={{
                        position: 'absolute',
                        top: '120px',
                        left: '10%',
                        right: '10%',
                        height: '2px',
                        background: 'linear-gradient(to right, transparent, #e2e8f0, transparent)',
                        zIndex: 0,
                        display: 'none' // Can be enabled with media queries if needed
                    }} />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="step-card-premium"
                            style={{
                                background: 'white',
                                textAlign: 'center',
                                padding: '3rem 1.5rem',
                                borderRadius: '3rem',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            {/* Step Number Badge */}
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: '#f8fafc',
                                color: '#94a3b8',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                fontWeight: '800',
                                fontSize: '0.9rem',
                                border: '1px solid #f1f5f9'
                            }}>
                                {index + 1}
                            </div>

                            <div style={{
                                width: '90px',
                                height: '90px',
                                background: `${step.color}10`,
                                color: step.color,
                                borderRadius: '2rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2.5rem auto',
                                transition: 'all 0.3s'
                            }} className="step-icon-box">
                                {step.icon}
                            </div>

                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.25rem', color: '#1e293b' }}>{step.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.8, fontSize: '1.05rem' }}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>

            <style>{`
                .step-card-premium:hover {
                    transform: translateY(-12px);
                    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.1);
                    border-color: #e2e8f0;
                }
                .step-card-premium:hover .step-icon-box {
                    transform: scale(1.1) rotate(5deg);
                }
            `}</style>
        </section>
    );
};

export default StepsSection;
