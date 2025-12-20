import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const Step1Compte = ({ data, updateData, onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOTP = () => {
        // Simulate OTP sending
        setOtpSent(true);
        alert('Code OTP envoyé au ' + data.phone);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Compte
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Créez vos identifiants de connexion
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Phone Number with OTP */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: 'var(--text-main)'
                    }}>
                        Numéro de téléphone (+225)
                    </label>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input
                            type="tel"
                            className="input-field"
                            placeholder="07 00 00 00 00"
                            value={data.phone || ''}
                            onChange={(e) => updateData({ phone: e.target.value })}
                            style={{ flex: 1 }}
                        />
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            className="btn"
                            style={{
                                backgroundColor: '#6B7280',
                                color: 'white',
                                padding: '0.75rem 1.5rem',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            Envoyer OTP
                        </button>
                    </div>
                </div>

                {/* Password */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: 'var(--text-main)'
                    }}>
                        Mot de passe
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Minimum 8 caractères"
                            value={data.password || ''}
                            onChange={(e) => updateData({ password: e.target.value })}
                            style={{ paddingRight: '3rem' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted)'
                            }}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: 'var(--text-main)'
                    }}>
                        Confirmer le mot de passe
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="input-field"
                            placeholder="Confirmez votre mot de passe"
                            value={data.confirmPassword || ''}
                            onChange={(e) => updateData({ confirmPassword: e.target.value })}
                            style={{ paddingRight: '3rem' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-muted)'
                            }}
                        >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '0.875rem' }}
                    >
                        Continuer →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1Compte;
