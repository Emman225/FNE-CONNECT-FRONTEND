import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

import Input from '../../../../components/ui/Input';
import InputPassword from '../../components/auth/InputPassword';
import SplitAuthLayout from '../../components/auth/SplitAuthLayout';

import { MOCK_USERS } from '../../../core/constants/mockUsers';
import { useAuth } from '../../../../auth/AuthProvider';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            const user = MOCK_USERS.find(u => u.phone === formData.phone);

            if (user) {
                // Verify password (simple check)
                if (user.password === formData.password) {
                    login(user); // Pass full user object
                    navigate('/dashboard');
                } else {
                    setError('Mot de passe incorrect.');
                    setLoading(false);
                }
            } else {
                setError('Aucun compte trouvé avec ce numéro.');
                setLoading(false);
            }
        }, 1000);
    };

    // Left side form content
    const formContent = (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'var(--gradient-dual)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-lg)',
                        transform: 'rotate(-5deg)'
                    }}>
                        <ShieldCheck size={32} color="white" strokeWidth={2.5} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: 'var(--primary)',
                            letterSpacing: '-1px',
                            display: 'block',
                            lineHeight: 1
                        }}>
                            FNE <span style={{ color: 'var(--text-primary)' }}>Connect</span>
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-secondary)',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            marginTop: '0.5rem',
                            display: 'block',
                            opacity: 0.8
                        }}>
                            PORTAGE FISCAL
                        </span>
                    </div>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Connectez-vous pour accéder à votre espace.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input
                    label="Numéro de téléphone"
                    placeholder="Ex: 0708091011"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                />

                <div>
                    <InputPassword
                        label="Mot de passe"
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />

                    {error && (
                        <div className="fade-in" style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--danger-light)',
                            color: 'var(--danger)',
                            fontSize: '0.875rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    <div className="flex-between" style={{ marginTop: '1rem' }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            cursor: 'pointer',
                            color: 'var(--text-secondary)'
                        }}>
                            <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                            Se souvenir de moi
                        </label>
                        <Link to="/auth/forgot-password" style={{
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: 'var(--primary)',
                            textDecoration: 'none'
                        }}>
                            Mot de passe oublié ?
                        </Link>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem' }}
                >
                    {loading ? 'Connexion en cours...' : (
                        <>
                            Se connecter <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </form>

            <div style={{
                marginTop: '2rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)'
            }}>
                Pas encore de compte ? {' '}
                <Link to="/auth/register" style={{
                    fontWeight: '600',
                    color: 'var(--primary)',
                    textDecoration: 'none'
                }}>
                    Créer un compte
                </Link>
            </div>
        </div>
    );

    return (
        <SplitAuthLayout
            leftContent={formContent}
            rightTitle="Gérez votre activité en toute simplicité"
            rightSubtitle="FNE Connect vous permet de créer des factures, gérer vos clients et suivre vos paiements en quelques clics."
            rightFeatures={[
                'Factures professionnelles en quelques secondes',
                'Gestion complète de vos clients',
                'Suivi en temps réel de vos paiements',
                'Sécurité et confidentialité garanties'
            ]}
        />
    );
};

export default LoginPage;
