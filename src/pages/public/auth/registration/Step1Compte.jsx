import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Step1Compte = ({ data, updateData, onNext }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOTP = () => {
        if (!data.phone || !data.password || !data.confirmPassword) {
            toast.error('Veuillez remplir tous les champs avant de demander le code OTP.');
            return;
        }
        if (data.password !== data.confirmPassword) {
            toast.error('Les mots de passe ne correspondent pas.');
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setOtpSent(true);
            toast.success('Code OTP envoyé au ' + data.phone);
        }, 1000);
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        if (!data.otpCode) {
            toast.error('Veuillez entrer le code OTP.');
            return;
        }
        setIsLoading(true);
        // Simulate OTP verification
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
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
                    Créez vos identifiants pour commencer
                </p>
            </div>

            <form onSubmit={handleVerifyOTP} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Phone Number */}
                <div style={otpSent ? { opacity: 0.7, pointerEvents: 'none' } : {}}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        color: 'var(--text-main)'
                    }}>
                        Numéro de téléphone (+225) <span style={{ color: 'red' }}>*</span>
                    </label>
                    <input
                        type="tel"
                        className="input-field"
                        placeholder="07 00 00 00 00"
                        value={data.phone || ''}
                        onChange={(e) => updateData({ phone: e.target.value })}
                        disabled={otpSent}
                    />
                </div>

                {/* Password Fields - Hidden after OTP sent */}
                {!otpSent && (
                    <>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                Mot de passe <span style={{ color: 'red' }}>*</span>
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
                                        position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                Confirmer le mot de passe <span style={{ color: 'red' }}>*</span>
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
                                        position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
                                    }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={isLoading}
                            className="btn btn-primary"
                            style={{ padding: '0.875rem', marginTop: '1rem' }}
                        >
                            {isLoading ? 'Envoi...' : 'Demander Code OTP'}
                        </button>
                    </>
                )}

                {/* OTP Field - Visible only after OTP sent */}
                {otpSent && (
                    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                        <div style={{
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1.5rem',
                            border: '1px solid rgba(59, 130, 246, 0.2)'
                        }}>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--primary)', textAlign: 'center' }}>
                                Un code de vérification a été envoyé au {data.phone}.
                            </p>
                        </div>

                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                            Code OTP <span style={{ color: 'red' }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Entrez le code reçu"
                            value={data.otpCode || ''}
                            onChange={(e) => updateData({ otpCode: e.target.value })}
                            style={{ textAlign: 'center', letterSpacing: '0.2rem', fontSize: '1.2rem' }}
                        />

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={() => setOtpSent(false)}
                                className="btn btn-outline"
                                style={{ flex: 1 }}
                            >
                                Modifier numéro
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                            >
                                {isLoading ? 'Vérification...' : 'Vérifier & Continuer'}
                            </button>
                        </div>
                    </div>
                )}
            </form>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default Step1Compte;
