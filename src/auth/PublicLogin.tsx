import React, { useState, FormEvent } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

import Input from '../components/ui/Input';
import InputPassword from '../components/forms/InputPassword';
import SplitAuthLayout from '../layouts/SplitAuthLayout';
import { useAuth } from './AuthProvider';
import { userRoles, isAdminRole } from '../types/roles';

/**
 * PublicLogin - Vendor login page
 * 
 * Only vendors can login through this page.
 * Redirects to /dashboard on successful login.
 */
const PublicLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (!result.success) {
                setError(result.error || 'Échec de la connexion');
            } else if (result.user) {
                // Role-based redirection
                if (result.user.role === userRoles.VENDOR) {
                    navigate('/dashboard');
                } else if (isAdminRole(result.user.role)) {
                    // Admin trying to login via vendor portal
                    setError('Cet espace est réservé aux vendeurs. Connectez-vous via /admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (err) {
            setError('Une erreur est survenue lors de la connexion');
        } finally {
            setLoading(false);
        }
    };

    // Left side form content
    const formContent = (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>


                        <img src={logo} alt="FNE Connect" style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                    </div>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Connectez-vous pour accéder à votre espace.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Input
                    label="Adresse email"
                    type="email"
                    placeholder="vendor@fne.ci"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div>
                    <InputPassword
                        label="Mot de passe"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                marginTop: '1.5rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div>
                    Pas encore de compte ? {' '}
                    <Link to="/auth/register" style={{
                        fontWeight: '600',
                        color: 'var(--primary)',
                        textDecoration: 'none'
                    }}>
                        Créer un compte
                    </Link>
                </div>

                <div style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-light)',
                    marginTop: '0.5rem'
                }}>
                    © 2025 FNE Connect. Tous droits réservés.
                </div>
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

export default PublicLogin;
