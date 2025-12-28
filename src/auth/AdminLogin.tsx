import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, User, Lock, CheckSquare, Square, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { userRoles, isAdminRole } from '../types/roles';

const AdminLogin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Mock "Remember Me" state
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);

            if (!result.success) {
                setError(result.error || 'Échec de la connexion');
            } else if (result.user) {
                if (isAdminRole(result.user.role)) {
                    navigate('/admin/dashboard');
                } else if (result.user.role === userRoles.VENDOR) {
                    setError('Espace réservé aux administrateurs.');
                } else {
                    navigate('/admin/dashboard');
                }
            }
        } catch (err) {
            setError('Erreur de connexion');
        } finally {
            setLoading(false);
        }
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
                maxWidth: '425px', // Slightly increased width
                padding: '2rem', // Reduced padding
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light glass
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '20px', // Slightly tighter radius
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            }}>
                {/* Logo Section */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div style={{
                        width: '56px', // Reduced size
                        height: '56px',
                        background: 'linear-gradient(135deg, #10b981 0%, #0a6fbd 100%)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.75rem',
                        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
                        transform: 'rotate(-5deg)'
                    }}>
                        <ShieldCheck size={32} color="white" />
                    </div>
                    <h2 style={{
                        fontSize: '1.25rem', // Reduced font size
                        fontWeight: '800',
                        color: '#1e293b',
                        marginBottom: '0.25rem',
                        textAlign: 'center'
                    }}>
                        FNE <span style={{ color: '#10b981' }}>Connect</span>
                    </h2>
                    <p style={{
                        color: '#64748b',
                        fontSize: '0.85rem', // Reduced font size
                        textAlign: 'center',
                        fontWeight: '500'
                    }}>
                        Espace Administration
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    {/* Email Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.8rem', // Reduced label size
                            fontWeight: '600',
                            color: '#334155',
                            marginBottom: '0.25rem'
                        }}>
                            Email
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }}>
                                <User size={16} />
                            </div>
                            <input
                                type="email"
                                placeholder="admin@fne.ci"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem', // Compact padding
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    color: '#1e293b',
                                    fontSize: '0.9rem',
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

                    {/* Password Input */}
                    <div>
                        <label style={{
                            display: 'block',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#334155',
                            marginBottom: '0.25rem'
                        }}>
                            Mot de passe
                        </label>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                left: '0.75rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: '#94a3b8'
                            }}>
                                <Lock size={16} />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 2.5rem 0.75rem 2.5rem', // Compact padding
                                    backgroundColor: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    color: '#1e293b',
                                    fontSize: '0.9rem',
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
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '0.75rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#94a3b8',
                                    cursor: 'pointer',
                                    padding: 0
                                }}
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', color: '#64748b', fontWeight: '500' }} onClick={() => setRememberMe(!rememberMe)}>
                            {rememberMe ? <CheckSquare size={16} color="#10b981" /> : <Square size={16} />}
                            Se souvenir de moi
                        </label>
                        <Link to="/admin/forgot-password" style={{ color: '#0a6fbd', textDecoration: 'none', fontWeight: '600' }}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            padding: '0.5rem',
                            borderRadius: '8px',
                            backgroundColor: '#fee2e2',
                            color: '#ef4444',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            border: '1px solid #fca5a5',
                            fontWeight: '500'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.875rem',
                            background: 'linear-gradient(135deg, #10b981 0%, #0a6fbd 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontWeight: '700',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            marginTop: '0.25rem',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        {loading ? 'Connexion...' : (
                            <>
                                Se connecter <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer Copyright */}
                <div style={{
                    marginTop: '1.5rem',
                    textAlign: 'center',
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    fontWeight: '500'
                }}>
                    © 2025 FNE Connect. Tous droits réservés.
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
