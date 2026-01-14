import React, { useState } from 'react';
import { CreditCard, Check, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const Step5Paiement = ({ data, updateData, onSubmit, onBack }) => {
    // Component logic remains similar, but using onSubmit instead of onNext
    const [selectedPlan, setSelectedPlan] = useState(data.subscriptionPlan || '');
    const [paymentMethod, setPaymentMethod] = useState(data.paymentMethod || '');
    const [paymentPhone, setPaymentPhone] = useState(data.paymentPhone || '');

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

        if (!paymentPhone || paymentPhone.length < 10) {
            toast.error('Veuillez entrer un numéro de téléphone valide pour le paiement.');
            return;
        }

        updateData({
            subscriptionPlan: selectedPlan,
            paymentMethod: paymentMethod,
            paymentPhone: paymentPhone
        });
        onSubmit(); // Call the final submit function
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
                                <div
                                    key={method}
                                    onClick={() => setPaymentMethod(method)}
                                    style={{
                                        padding: '1rem',
                                        border: paymentMethod === method ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        backgroundColor: paymentMethod === method ? 'rgba(0, 186, 113, 0.05)' : 'white',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: paymentMethod === method ? '1rem' : '0' }}>
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            borderRadius: '50%',
                                            border: `2px solid ${paymentMethod === method ? 'var(--primary)' : 'var(--text-muted)'}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {paymentMethod === method && (
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                                            )}
                                        </div>
                                        <CreditCard size={24} color={paymentMethod === method ? 'var(--primary)' : 'var(--text-muted)'} />
                                        <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--text-main)' }}>
                                            {method}
                                        </span>
                                    </div>

                                    {/* Mobile Money Number Input - Only shows when selected */}
                                    {paymentMethod === method && (
                                        <div
                                            onClick={(e) => e.stopPropagation()}
                                            style={{
                                                marginLeft: '2.25rem',
                                                animation: 'slideDown 0.3s ease-out'
                                            }}
                                        >
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                                                Numéro {method} pour le paiement <span style={{ color: 'red' }}>*</span>
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <Smartphone size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                                <input
                                                    type="tel"
                                                    value={paymentPhone}
                                                    onChange={(e) => setPaymentPhone(e.target.value.replace(/[^0-9]/g, ''))}
                                                    placeholder="Entrez le numéro (Ex: 0707...)"
                                                    className="input-field"
                                                    style={{ paddingLeft: '2.5rem', width: '100%' }}
                                                    autoFocus
                                                />
                                            </div>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                                Le montant sera débité de ce numéro.
                                            </p>
                                        </div>
                                    )}
                                </div>
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
                                💡 Après validation, vous recevrez une demande de paiement sur le numéro indiqué.
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
                        disabled={!selectedPlan || !paymentMethod || !paymentPhone}
                        className="btn btn-primary"
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            opacity: selectedPlan && paymentMethod && paymentPhone ? 1 : 0.5,
                            cursor: selectedPlan && paymentMethod && paymentPhone ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Confirmer & Créer le compte
                    </button>
                </div>
            </form>
            <style>{`
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Step5Paiement;
