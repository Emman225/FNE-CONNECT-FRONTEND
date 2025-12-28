import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Step7Validation = () => {
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
            {/* Success Icon */}
            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 186, 113, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <CheckCircle size={60} color="var(--primary)" />
                </div>

                <h2 style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '1rem'
                }}>
                    Inscription soumise !
                </h2>

                <p style={{
                    fontSize: '1.125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                }}>
                    Votre demande d'inscription a été envoyée avec succès.
                </p>
            </div>

            {/* Info Box */}
            <div style={{
                backgroundColor: 'rgba(0, 186, 113, 0.05)',
                border: '1px solid rgba(0, 186, 113, 0.2)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '2rem',
                textAlign: 'left'
            }}>
                <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--primary)',
                    marginBottom: '1rem'
                }}>
                    Prochaines étapes
                </h3>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8'
                }}>
                    <li style={{ marginBottom: '0.75rem' }}>
                        ✓ Notre équipe va vérifier vos documents
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        ✓ Vous recevrez un email de confirmation dans 24-48 heures
                    </li>
                    <li style={{ marginBottom: '0.75rem' }}>
                        ✓ Une fois approuvé, vous pourrez accéder à votre tableau de bord
                    </li>
                </ul>
            </div>

            {/* Info Message */}
            <div style={{
                padding: '1rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '2rem'
            }}>
                <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    margin: 0
                }}>
                    <strong style={{ color: 'var(--primary)' }}>Note :</strong> Votre compte sera en mode lecture seule
                    jusqu'à validation complète de votre inscription.
                </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn btn-primary"
                    style={{ padding: '1rem', fontSize: '1rem' }}
                >
                    Accéder au tableau de bord
                </button>

                <button
                    onClick={() => navigate('/')}
                    className="btn btn-light"
                    style={{ padding: '1rem', fontSize: '1rem' }}
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
};

export default Step7Validation;
