import React, { useEffect, useState } from 'react';
import { CheckCircle, ArrowRight, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Step7Validation = () => {
    const navigate = useNavigate();
    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        // Generate a random unique account number
        const randomId = Math.floor(10000000 + Math.random() * 90000000);
        setAccountNumber(`FNE-${randomId}`);
    }, []);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountNumber);
        toast.success('Numéro de compte copié !');
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            {/* Success Animation */}
            <div style={{ marginBottom: '2rem', animation: 'scaleIn 0.5s ease-out' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 186, 113, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 0 0 15px rgba(0, 186, 113, 0.05)'
                }}>
                    <CheckCircle size={70} color="var(--primary)" style={{ animation: 'checkPop 0.5s ease-out 0.3s backwards' }} />
                </div>

                <h2 style={{
                    fontSize: '2.25rem',
                    fontWeight: '800',
                    color: 'var(--primary)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                }}>
                    Félicitations !
                </h2>

                <p style={{
                    fontSize: '1.125rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6',
                    marginBottom: '2rem'
                }}>
                    Votre demande d'inscription a été validée avec succès.
                    Un SMS et un Email de confirmation ont été envoyés avec vos identifiants de connexion.
                </p>
            </div>

            {/* Account Number Box */}
            <div style={{
                backgroundColor: 'white',
                border: '2px dashed var(--primary)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                marginBottom: '2rem',
                position: 'relative',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '600' }}>
                    Votre Numéro de Compte Unique
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '0.05em' }}>
                        {accountNumber || 'Generating...'}
                    </span>
                    <button
                        onClick={copyToClipboard}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', padding: '0.5rem' }}
                        title="Copier"
                    >
                        <Copy size={24} />
                    </button>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    Conservez ce numéro précieusement.
                </p>
            </div>

            {/* Info Box */}
            <div style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                marginBottom: '2.5rem',
                textAlign: 'left'
            }}>
                <h3 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    📩 Prochaines étapes
                </h3>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.6'
                }}>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem' }}>
                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '8px' }} />
                        <span>Notre équipe va vérifier vos documents.</span>
                    </li>
                    <li style={{ marginBottom: '1rem', display: 'flex', gap: '0.75rem' }}>
                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '8px' }} />
                        <span>Vous recevrez un email de confirmation dans 24-48 heures.</span>
                    </li>
                    <li style={{ display: 'flex', gap: '0.75rem' }}>
                        <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginTop: '8px' }} />
                        <span>Une fois approuvé, vous pourrez accéder pleinement à votre compte.</span>
                    </li>
                </ul>

                <div style={{
                    marginTop: '1.5rem',
                    padding: '1rem',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    color: '#B45309',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'start',
                    gap: '0.5rem'
                }}>
                    <span>⚠️</span>
                    <span>
                        <strong>Note :</strong> Votre compte sera en mode lecture seule jusqu'à validation complète de votre inscription.
                    </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                    onClick={() => navigate('/dashboard')} // Assuming dashboard route exists
                    className="btn btn-primary"
                    style={{
                        padding: '1rem',
                        fontSize: '1.1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                >
                    Accéder à mon Espace <ArrowRight size={20} />
                </button>

                <button
                    onClick={() => navigate('/')}
                    className="btn btn-ghost"
                    style={{ padding: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}
                >
                    Retour à l'accueil
                </button>
            </div>

            <style>{`
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                @keyframes checkPop {
                    from { transform: scale(0); }
                    to { transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default Step7Validation;
