import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { X, Lock, AlertTriangle, FileText } from 'lucide-react';
import { useNotifications } from '../../../context/NotificationContext';

const AccountBlockModal = ({ isOpen, onClose, vendor, alert }) => {
    const { showSuccess, showLoading, dismissToast } = useNotifications();
    const [isBlocking, setIsBlocking] = useState(false);
    const [reason, setReason] = useState('');
    const [blockDuration, setBlockDuration] = useState('temporary');

    if (!isOpen || !vendor) return null;

    const handleBlock = async () => {
        if (!reason.trim()) {
            return;
        }

        setIsBlocking(true);
        const loadingToast = showLoading('Blocage du compte en cours...');

        // Simulate API call
        setTimeout(() => {
            dismissToast(loadingToast);
            showSuccess(`Compte de ${vendor.name} bloqué avec succès`);
            setIsBlocking(false);
            onClose();
        }, 1500);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: '#FEE2E2'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '1rem',
                            right: '1rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)'
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <Lock size={32} color="white" />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        marginBottom: '0.5rem',
                        color: '#991B1B'
                    }}>
                        Bloquer le Compte
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: '#7F1D1D',
                        fontSize: '0.875rem'
                    }}>
                        Action de sécurité - Blocage temporaire ou permanent
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {/* Vendor Info */}
                    <div style={{
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Informations Vendeur
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Nom</span>
                                <span style={{ fontWeight: '600' }}>{vendor.name}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>ID Vendeur</span>
                                <span style={{ fontWeight: '500' }}>{vendor.id}</span>
                            </div>
                            {alert && (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>Alerte</span>
                                    <span style={{ fontWeight: '500', color: '#DC2626' }}>{alert.id}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Alert Details */}
                    {alert && (
                        <div style={{
                            backgroundColor: '#FEF3C7',
                            border: '1px solid #F59E0B',
                            borderRadius: 'var(--radius-md)',
                            padding: '1rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <AlertTriangle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                            <div>
                                <p style={{ fontWeight: '600', color: '#92400E', marginBottom: '0.25rem' }}>
                                    {alert.description}
                                </p>
                                <p style={{ fontSize: '0.875rem', color: '#78350F' }}>
                                    Type: {alert.type.replace('_', ' ')} - Sévérité: {alert.severity}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Block Duration */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '0.75rem',
                            color: 'var(--text-main)'
                        }}>
                            Durée du blocage
                        </label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{
                                flex: 1,
                                padding: '1rem',
                                border: blockDuration === 'temporary' ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                backgroundColor: blockDuration === 'temporary' ? 'var(--primary-lighter)' : 'white',
                                transition: 'all var(--transition-normal)'
                            }}>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="temporary"
                                    checked={blockDuration === 'temporary'}
                                    onChange={(e) => setBlockDuration(e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                <span style={{ fontWeight: '600' }}>Temporaire</span>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0 1.5rem' }}>
                                    48h de blocage
                                </p>
                            </label>
                            <label style={{
                                flex: 1,
                                padding: '1rem',
                                border: blockDuration === 'permanent' ? '2px solid #DC2626' : '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                backgroundColor: blockDuration === 'permanent' ? '#FEE2E2' : 'white',
                                transition: 'all var(--transition-normal)'
                            }}>
                                <input
                                    type="radio"
                                    name="duration"
                                    value="permanent"
                                    checked={blockDuration === 'permanent'}
                                    onChange={(e) => setBlockDuration(e.target.value)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                <span style={{ fontWeight: '600', color: '#DC2626' }}>Permanent</span>
                                <p style={{ fontSize: '0.75rem', color: '#7F1D1D', margin: '0.25rem 0 0 1.5rem' }}>
                                    Jusqu'à révision
                                </p>
                            </label>
                        </div>
                    </div>

                    {/* Reason */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            color: 'var(--text-main)'
                        }}>
                            Motif du blocage *
                        </label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Décrivez la raison du blocage (obligatoire pour la traçabilité)..."
                            rows={4}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '0.9375rem',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            className="input-field"
                        />
                    </div>

                    {/* Warning */}
                    <div style={{
                        backgroundColor: '#FEE2E2',
                        border: '1px solid #EF4444',
                        borderRadius: 'var(--radius-md)',
                        padding: '1rem',
                        marginBottom: '2rem'
                    }}>
                        <p style={{ fontSize: '0.875rem', color: '#991B1B', fontWeight: '500' }}>
                            ⚠️ Cette action bloquera immédiatement toutes les opérations du vendeur. Un rapport sera automatiquement généré pour la CENTIF.
                        </p>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            style={{ flex: 1 }}
                            disabled={isBlocking}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleBlock}
                            style={{
                                flex: 1,
                                backgroundColor: '#DC2626',
                                borderColor: '#DC2626'
                            }}
                            disabled={isBlocking || !reason.trim()}
                        >
                            {isBlocking ? 'Blocage en cours...' : 'Confirmer le blocage'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountBlockModal;
