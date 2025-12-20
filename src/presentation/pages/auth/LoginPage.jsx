import React, { useState } from 'react';
import Input from '../../components/ui/Input';
import InputPassword from '../../components/auth/InputPassword';
import SplitAuthLayout from '../../components/auth/SplitAuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ phone: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    // Left side form content
    const formContent = (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <h1 style={{
                    fontSize: '2rem',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem',
                    fontWeight: '700'
                }}>
                    Bon retour !
                </h1>
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
