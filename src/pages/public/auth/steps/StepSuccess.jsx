import React from 'react';
import Button from '../../../components/ui/Button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StepSuccess = () => {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#DCFCE7', // Green-100
                color: 'var(--color-primary)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto'
            }}>
                <CheckCircle size={48} />
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--color-primary-dark)' }}>Inscription Réussie !</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                Votre dossier a été transmis avec succès.<br />
                Il est en cours de validation par nos équipes de conformité.
            </p>

            <Button onClick={() => navigate('/dashboard')} style={{ width: '100%' }}>
                Accéder au Tableau de Bord
            </Button>
        </div>
    );
};

export default StepSuccess;
