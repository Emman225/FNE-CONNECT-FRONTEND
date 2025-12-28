import React, { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';

const Step5Paiement = ({ data, updateData, onNext, onBack }) => {
    const [selectedPlan, setSelectedPlan] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const plans = [
        {
            id: 'mensuel',
            name: 'Abonnement Mensuel',
            price: '5 000',
            period: 'mois',
            features: [
                'Factures illimitées',
                'Conformité DGI garantie',
                'Support prioritaire',
                'Tableau de bord complet'
            ]
        },
        {
            id: 'annuel',
            name: 'Abonnement Annuel',
            price: '50 000',
            period: 'an',
            savings: 'Économisez 10 000 FCFA',
            features: [
                'Factures illimitées',
                'Conformité DGI garantie',
                'Support prioritaire 24/7',
                'Tableau de bord complet',
                'Formation personnalisée',
                '2 mois offerts'
            ],
            recommended: true
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        updateData({
            subscriptionPlan: selectedPlan,
            paymentMethod: paymentMethod
        });
        onNext();
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Paiement
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Choisissez votre formule d'abonnement à FNE Connect
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Plans */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '1rem',
                        fontWeight: '600',
                        fontSize: '1rem',
                        color: 'var(--text-main)'
                    }}>
                        Sélectionnez votre formule
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {plans.map((plan) => (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                                style={{
                                    border: selectedPlan === plan.id ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s',
                                    backgroundColor: selectedPlan === plan.id ? 'rgba(0, 186, 113, 0.05)' : 'white',
                                    position: 'relative'
                                }}
                            >
                                {plan.recommended && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '-12px',
                                        right: '20px',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        Recommandé
                                    </div>
                                )}

                                <div style={{ marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                                        {plan.name}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                        <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)' }}>
                                            {plan.price}
                                        </span>
                                        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
                                            FCFA / {plan.period}
                                        </span>
                                    </div>
                                    {plan.savings && (
                                        <p style={{
                                            fontSize: '0.875rem',
                                            color: 'var(--success)',
                                            fontWeight: '600',
                                            marginTop: '0.5rem'
                                        }}>
                                            {plan.savings}
                                        </p>
                                    )}
                                </div>

                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
                                            <Check size={16} color="var(--primary)" />
                                            <span style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {selectedPlan === plan.id && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Check size={16} color="white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                {selectedPlan && (
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '1rem',
                            fontWeight: '600',
                            fontSize: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Méthode de paiement
                        </label>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Orange Money', 'MTN Money', 'Moov Money', 'Wave'].map((method) => (
                                <label
                                    key={method}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem',
                                        padding: '1rem',
                                        border: paymentMethod === method ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        backgroundColor: paymentMethod === method ? 'rgba(0, 186, 113, 0.05)' : 'white',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value={method}
                                        checked={paymentMethod === method}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        style={{ accentColor: 'var(--primary)', cursor: 'pointer', width: '20px', height: '20px' }}
                                    />
                                    <CreditCard size={24} color="var(--primary)" />
                                    <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-main)' }}>
                                        {method}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Info Box */}
                        <div style={{
                            marginTop: '1.5rem',
                            backgroundColor: 'rgba(0, 186, 113, 0.05)',
                            border: '1px solid rgba(0, 186, 113, 0.2)',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem'
                        }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                                💡 Après validation, vous recevrez un SMS pour confirmer le paiement via {paymentMethod || 'votre méthode de paiement'}.
                            </p>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn btn-light"
                        style={{ padding: '0.875rem 1.5rem' }}
                    >
                        ← Retour
                    </button>
                    <button
                        type="submit"
                        disabled={!selectedPlan || !paymentMethod}
                        className="btn btn-primary"
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            opacity: selectedPlan && paymentMethod ? 1 : 0.5,
                            cursor: selectedPlan && paymentMethod ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Continuer au paiement →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step5Paiement;
