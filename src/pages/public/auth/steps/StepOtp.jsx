import React, { useState } from 'react';
import OtpInput from '../../../components/auth/OtpInput';
import Button from '../../../components/ui/Button';

const StepOtp = ({ next, back, updateData, data }) => {
    const [loading, setLoading] = useState(false);

    const handleComplete = (code) => {
        updateData({ otp: code });
    };

    const handleValidation = () => {
        setLoading(true);
        // Simulate API Check
        setTimeout(() => {
            setLoading(false);
            next();
        }, 1000);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Vérification</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Entrez le code envoyé au <strong>{data.phone}</strong>
                </p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <OtpInput length={6} onComplete={handleComplete} />
            </div>

            <Button onClick={handleValidation} disabled={loading} style={{ width: '100%', marginBottom: '1rem' }}>
                {loading ? 'Vérification...' : 'Vérifier'}
            </Button>

            <Button variant="ghost" onClick={back} style={{ width: '100%' }}>
                Retour
            </Button>

            <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem' }}>
                Vous n'avez rien reçu ? <button style={{ border: 'none', background: 'none', color: 'var(--color-primary)', fontWeight: '600', cursor: 'pointer' }}>Renvoyer le code</button>
            </div>
        </div>
    );
};

export default StepOtp;
