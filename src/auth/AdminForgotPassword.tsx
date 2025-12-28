import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ArrowLeft, ShieldCheck, CheckCircle } from 'lucide-react';

const AdminForgotPassword = () => {
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

    return (
        <div style={{
            minHeight: '100vh',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.85) 0%, rgba(10, 111, 189, 0.9) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Glassmorphism Card */}
            <div className="fade-in" style={{
                width: '100%',
                maxWidth: '450px',
                padding: '2.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light glass
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}>
                {/* Logo Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '72px',
                        height: '72px',
                        background: 'linear-gradient(135deg, #10b981 0%, #0a6fbd 100%)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
                        transform: 'rotate(-5deg)'
                    }}>
                        <ShieldCheck size={40} color="white" />
                    </div>
                </div>

                {!submitted ? (
                    <>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: '#1e293b',
                                marginBottom: '0.5rem'
                            }}>
                                Réinitialisation Admin
                            </h2>
                            <p style={{
                                color: '#64748b',
                                fontSize: '0.95rem',
                                fontWeight: '500'
                            }}>
                                Saisissez votre email administrateur.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Email Input */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    fontSize: '0.875rem',
                                    fontWeight: '600',
                                    color: '#334155',
                                    marginBottom: '0.5rem'
                                }}>
                                    Email
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        left: '1rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#94a3b8'
                                    }}>
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="admin@fne.ci"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '0.875rem 1rem 0.875rem 2.75rem',
                                            backgroundColor: 'white',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '12px',
                                            color: '#1e293b',
                                            fontSize: '0.95rem',
                                            outline: 'none',
                                            transition: 'all 0.2s'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#10b981';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'linear-gradient(135deg, #10b981 0%, #0a6fbd 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                                }}
                                onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                            >
                                {loading ? 'Envoi...' : (
                                    <>
                                        Envoyer le lien <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="fade-in" style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}>
                            <CheckCircle size={40} color="#10b981" />
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#1e293b', marginBottom: '0.5rem' }}>Vérifiez vos emails</h3>
                        <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                            Un lien de réinitialisation sécurisé a été envoyé à <strong>{email}</strong>.
                        </p>
                        <Link
                            to="/admin"
                            style={{
                                display: 'inline-block',
                                width: '100%',
                                padding: '1rem',
                                backgroundColor: 'white',
                                color: '#1e293b',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            Retour à la connexion
                        </Link>
                    </div>
                )}

                {/* Footer Link */}
                {!submitted && (
                    <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                        <Link to="/admin" style={{
                            color: '#64748b',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <ArrowLeft size={16} /> Retour
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminForgotPassword;
