import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';
import { Shield, Save, Bell, Lock, Mail, AlertTriangle } from 'lucide-react';
import settingService from '../../../services/settingService';
import toast from 'react-hot-toast';

const SecuritySettingsPage = () => {
    const [settings, setSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const data = await settingService.getByGroup('security');
            setSettings(data);
        } catch (error) {
            console.error("Failed to fetch security settings", error);
            toast.error("Erreur lors du chargement des paramètres de sécurité.");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleChange = (key, currentValue) => {
        const newValue = currentValue === '1' ? '0' : '1';
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value: newValue } : s));
    };

    const handleInputChange = (key, value) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value } : s));
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            await settingService.updateBulk(settings.map(s => ({ key: s.key, value: s.value })));
            toast.success("Paramètres de sécurité mis à jour avec succès.");
        } catch (error) {
            console.error("Failed to save settings", error);
            toast.error("Erreur lors de l'enregistrement des paramètres.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Chargement...</div>;
    }

    const getSetting = (key) => settings.find(s => s.key === key);

    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Shield size={32} /> Paramètres de Sécurité
                </h1>
                <p className="text-muted">Configurez les alertes et les politiques de sécurité de la plateforme.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                <Card style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '12px' }}>
                            <Bell size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Alertes de Sécurité</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Notifications en cas d'activité suspecte</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Alertes par Email */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontWeight: '600' }}>Alertes par Email</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Envoyer un email aux admins lors d'un accès non autorisé.</div>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={getSetting('security_email_alerts_enabled')?.value === '1'}
                                    onChange={() => handleToggleChange('security_email_alerts_enabled', getSetting('security_email_alerts_enabled')?.value)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>

                        <hr style={{ border: 0, borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

                        {/* Rôles destinataires */}
                        <div className="form-group">
                            <label className="form-label">Destinataires des alertes (Rôles)</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="ex: admin, compliance"
                                value={getSetting('security_alert_recipients')?.value || ''}
                                onChange={(e) => handleInputChange('security_alert_recipients', e.target.value)}
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Séparez les rôles par des virgules.</p>
                        </div>
                    </div>
                </Card>

                <Card style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', backgroundColor: '#EFF6FF', color: '#2563EB', borderRadius: '12px' }}>
                            <Lock size={24} />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Contrôle d'Accès</h3>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Politiques de connexion et de session</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Tentatives de connexion max.</label>
                            <input
                                type="number"
                                className="form-control"
                                value={getSetting('security_max_failed_attempts')?.value || ''}
                                onChange={(e) => handleInputChange('security_max_failed_attempts', e.target.value)}
                            />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Nombre de tentatives avant blocage temporaire.</p>
                        </div>

                        <div className="alert alert-warning" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '0.75rem' }}>
                            <AlertTriangle size={18} style={{ color: '#D97706', shrink: 0 }} />
                            <p style={{ fontSize: '0.8rem', color: '#92400E', margin: 0 }}>
                                Toute modification de ces paramètres est enregistrée dans les journaux d'audit pour garantir la traçabilité.
                            </p>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className="btn btn-primary"
                    onClick={saveSettings}
                    disabled={saving}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}
                >
                    <Save size={18} />
                    {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
            </div>

            <style>{`
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 48px;
                    height: 24px;
                }
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #ccc;
                    transition: .4s;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: white;
                    transition: .4s;
                }
                input:checked + .slider {
                    background-color: var(--primary);
                }
                input:checked + .slider:before {
                    transform: translateX(24px);
                }
                .slider.round {
                    border-radius: 34px;
                }
                .slider.round:before {
                    border-radius: 50%;
                }
            `}</style>
        </div>
    );
};

export default SecuritySettingsPage;
