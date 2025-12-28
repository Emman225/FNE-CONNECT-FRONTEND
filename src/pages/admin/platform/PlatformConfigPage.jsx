import React, { useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Settings, Save, RotateCcw } from 'lucide-react';
import { useNotifications } from '../../../context/NotificationContext';

const PlatformConfigPage = () => {
    const { showSuccess } = useNotifications();

    const [config, setConfig] = useState({
        // Commission Settings
        defaultCommissionRate: 3,
        minCommissionAmount: 1000,
        maxCommissionAmount: 1000000,

        // Tax Settings
        tvaRate: 18,
        applyTvaByDefault: true,
        airsiRate: 1,
        applyAirsiByDefault: true,

        // AML Settings
        amlDailyTransactionLimit: 5000000,
        amlMonthlyTransactionLimit: 50000000,
        amlSuspiciousAmountThreshold: 10000000,
        amlAutoBlockEnabled: false,

        // Document Settings
        quoteValidityDays: 30,
        proformaValidityDays: 45,
        invoicePaymentTermsDays: 30,

        // Payout Settings
        payoutFrequency: 'weekly',
        minPayoutAmount: 50000,
        payoutProcessingDays: 2,

        // Platform Settings
        platformName: 'FNE CONNECT',
        supportEmail: 'support@fneconnect.sn',
        supportPhone: '+221 33 123 45 67',
        maintenanceMode: false
    });

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        showSuccess('Configuration enregistrée avec succès !');
        console.log('Saved config:', config);
    };

    const handleReset = () => {
        // Reset to default values
        setConfig({
            defaultCommissionRate: 3,
            minCommissionAmount: 1000,
            maxCommissionAmount: 1000000,
            tvaRate: 18,
            applyTvaByDefault: true,
            airsiRate: 1,
            applyAirsiByDefault: true,
            amlDailyTransactionLimit: 5000000,
            amlMonthlyTransactionLimit: 50000000,
            amlSuspiciousAmountThreshold: 10000000,
            amlAutoBlockEnabled: false,
            quoteValidityDays: 30,
            proformaValidityDays: 45,
            invoicePaymentTermsDays: 30,
            payoutFrequency: 'weekly',
            minPayoutAmount: 50000,
            payoutProcessingDays: 2,
            platformName: 'FNE CONNECT',
            supportEmail: 'support@fneconnect.sn',
            supportPhone: '+221 33 123 45 67',
            maintenanceMode: false
        });
        showSuccess('Configuration réinitialisée aux valeurs par défaut');
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{
                        fontSize: '1.875rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        letterSpacing: '-0.025em',
                        marginBottom: '0.5rem'
                    }}>
                        Configuration Plateforme
                    </h1>
                    <p className="text-muted">Gérez les paramètres globaux de la plateforme.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outline" onClick={handleReset}>
                        <RotateCcw size={18} /> Réinitialiser
                    </Button>
                    <Button onClick={handleSave}>
                        <Save size={18} /> Enregistrer
                    </Button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Commission Settings */}
                <Card style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Paramètres de Commission
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Taux de commission par défaut (%)
                            </label>
                            <input
                                type="number"
                                value={config.defaultCommissionRate}
                                onChange={(e) => handleChange('defaultCommissionRate', parseFloat(e.target.value))}
                                min="0"
                                max="100"
                                step="0.1"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Montant minimum de commission (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.minCommissionAmount}
                                onChange={(e) => handleChange('minCommissionAmount', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Montant maximum de commission (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.maxCommissionAmount}
                                onChange={(e) => handleChange('maxCommissionAmount', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>
                    </div>
                </Card>

                {/* Tax Settings */}
                <Card style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Paramètres Fiscaux
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Taux TVA (%)
                            </label>
                            <input
                                type="number"
                                value={config.tvaRate}
                                onChange={(e) => handleChange('tvaRate', parseFloat(e.target.value))}
                                min="0"
                                max="100"
                                step="0.1"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <input
                                    type="checkbox"
                                    checked={config.applyTvaByDefault}
                                    onChange={(e) => handleChange('applyTvaByDefault', e.target.checked)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>
                                        Appliquer TVA par défaut
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        TVA activée sur tous les documents
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Taux AIRSI (%)
                            </label>
                            <input
                                type="number"
                                value={config.airsiRate}
                                onChange={(e) => handleChange('airsiRate', parseFloat(e.target.value))}
                                min="0"
                                max="100"
                                step="0.1"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <input
                                    type="checkbox"
                                    checked={config.applyAirsiByDefault}
                                    onChange={(e) => handleChange('applyAirsiByDefault', e.target.checked)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>
                                        Appliquer AIRSI par défaut
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        AIRSI activée sur tous les documents
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </Card>

                {/* AML Settings */}
                <Card style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Paramètres AML (Anti-Blanchiment)
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Limite quotidienne (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.amlDailyTransactionLimit}
                                onChange={(e) => handleChange('amlDailyTransactionLimit', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Limite mensuelle (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.amlMonthlyTransactionLimit}
                                onChange={(e) => handleChange('amlMonthlyTransactionLimit', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Seuil suspect (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.amlSuspiciousAmountThreshold}
                                onChange={(e) => handleChange('amlSuspiciousAmountThreshold', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                <input
                                    type="checkbox"
                                    checked={config.amlAutoBlockEnabled}
                                    onChange={(e) => handleChange('amlAutoBlockEnabled', e.target.checked)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '0.9375rem' }}>
                                        Blocage automatique
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                        Bloquer automatiquement les comptes suspects
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </Card>

                {/* Payout Settings */}
                <Card style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Paramètres de Reversement
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Fréquence de reversement
                            </label>
                            <select
                                value={config.payoutFrequency}
                                onChange={(e) => handleChange('payoutFrequency', e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            >
                                <option value="daily">Quotidien</option>
                                <option value="weekly">Hebdomadaire</option>
                                <option value="biweekly">Bimensuel</option>
                                <option value="monthly">Mensuel</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Montant minimum de reversement (FCFA)
                            </label>
                            <input
                                type="number"
                                value={config.minPayoutAmount}
                                onChange={(e) => handleChange('minPayoutAmount', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                Délai de traitement (jours)
                            </label>
                            <input
                                type="number"
                                value={config.payoutProcessingDays}
                                onChange={(e) => handleChange('payoutProcessingDays', parseInt(e.target.value))}
                                min="0"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PlatformConfigPage;
