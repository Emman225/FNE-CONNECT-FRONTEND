import React, { useState, FormEvent } from 'react';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Mail, ArrowLeft, CheckCircle } from 'lucide-react';

import Input from '../components/ui/Input';
import SplitAuthLayout from '../layouts/SplitAuthLayout';

/**
 * VendorForgotPassword - Vendor password recovery page
 * matches PublicLogin design.
 */
const VendorForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        setSubmitted(true);
    };

    // Left side form content
    const formContent = (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem'
                }}>
                    Mot de passe oublié ?
                </h1>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Entrez votre email pour recevoir les instructions de réinitialisation.
                </p>
            </div>

            {!submitted ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Input
                        label="Adresse email"
                        type="email"
                        placeholder="vendor@fne.ci"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        icon={<Mail size={18} />}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.875rem', marginTop: '0.5rem' }}
                    >
                        {loading ? 'Envoi en cours...' : (
                            <>
                                Envoyer le lien <ArrowRight size={18} />
                            </>
                        )}
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <Link to="/auth/login" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: 'var(--text-secondary)',
                            textDecoration: 'none',
                            fontWeight: '500',
                            fontSize: '0.9rem'
                        }}>
                            <ArrowLeft size={16} /> Retour à la connexion
                        </Link>
                    </div>
                </form>
            ) : (
                <div className="fade-in" style={{
                    textAlign: 'center',
                    padding: '2rem',
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        background: 'var(--success-light)',
                        color: 'var(--success)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem'
                    }}>
                        <CheckCircle size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.5rem' }}>Email envoyé !</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                        Si un compte existe pour <strong>{email}</strong>, vous recevrez un lien de réinitialisation dans quelques instants.
                    </p>
                    <Link to="/auth/login" className="btn btn-primary" style={{ display: 'inline-flex', width: '100%', justifyContent: 'center' }}>
                        Retour à la connexion
                    </Link>
                </div>
            )}

            <div style={{
                marginTop: '3rem',
                textAlign: 'center',
                fontSize: '0.75rem',
                color: 'var(--text-light)',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1rem'
            }}>
                © 2025 FNE Connect. Tous droits réservés.
            </div>
        </div>
    );

    return (
        <SplitAuthLayout
            leftContent={formContent}
            rightTitle="Récupération de compte"
            rightSubtitle="Nous vous aidons à sécuriser et récupérer l'accès à votre espace vendeur rapidement."
            rightFeatures={[
                'Processus sécurisé',
                'Réception instantanée',
                'Assistance disponible 24/7'
            ]}
        />
    );
};

export default VendorForgotPassword;
