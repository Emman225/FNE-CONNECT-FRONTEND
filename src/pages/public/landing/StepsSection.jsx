import React from 'react';
import { UserPlus, FileText, Wallet, CheckCircle } from 'lucide-react';

const steps = [
    {
        icon: <UserPlus size={28} />,
        title: "1. Inscription & KYC",
        description: "Créez votre compte en quelques minutes avec votre numéro de téléphone et votre pièce d'identité."
    },
    {
        icon: <FileText size={28} />,
        title: "2. Création facture",
        description: "Éditez des devis et factures professionnels conformes aux normes DGI."
    },
    {
        icon: <Wallet size={28} />,
        title: "3. Paiement commission",
        description: "Réglez la commission de portage facilement via Mobile Money ou Carte Bancaire."
    },
    {
        icon: <CheckCircle size={28} />,
        title: "4. Reversement",
        description: "Recevez vos paiements clients et vos reversements directement sur votre compte."
    }
];

const StepsSection = () => {
    return (
        <section id="steps" style={{ padding: '8rem 0', backgroundColor: 'white', position: 'relative' }}>
            {/* Decoration */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: 'linear-gradient(to bottom, #F8FAFC, white)' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 5rem auto' }}>
                    <div className="badge badge-primary" style={{ marginBottom: '1rem' }}>Comment ça marche ?</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                        C'est simple comme <span style={{ color: 'var(--primary)' }}>bonjour</span>
                    </h2>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.6 }} className="text-muted">
                        FNE Connect simplifie vos démarches administratives en 4 étapes clés.
                        Concentrez-vous sur votre business, nous gérons le reste.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="card hover-lift"
                            style={{
                                border: '1px solid var(--border-color)',
                                background: 'white',
                                textAlign: 'center',
                                padding: '3rem 2rem',
                                borderRadius: 'var(--radius-xl)',
                                transition: 'all var(--transition-normal)'
                            }}
                        >
                            <div style={{
                                width: '72px',
                                height: '72px',
                                background: 'var(--bg-main)',
                                color: 'var(--primary)',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem auto',
                                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s ease'
                            }}>
                                {step.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem', color: 'var(--text-main)' }}>{step.title}</h3>
                            <p className="text-muted" style={{ lineHeight: '1.6' }}>
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
