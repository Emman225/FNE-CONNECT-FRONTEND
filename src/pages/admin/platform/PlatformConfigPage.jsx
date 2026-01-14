import React, { useState, useMemo } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Settings, Save, RotateCcw, Search } from 'lucide-react';
import { useNotifications } from '../../../context/NotificationContext';

const MOCK_VENDORS = [
    { id: 1, name: 'Boutique Koumassi', accountNumber: 'FNE-25897001' },
    { id: 2, name: 'Ets Konan', accountNumber: 'FNE-25897002' },
    { id: 3, name: 'Marc Konan', accountNumber: 'FNE-25897003' },
    { id: 4, name: 'Sarl Ivoire', accountNumber: 'FNE-25897004' },
    { id: 5, name: 'Boutique Luxe', accountNumber: 'FNE-25897005' },
];

const PlatformConfigPage = () => {
    const { showSuccess } = useNotifications();

    const [config, setConfig] = useState({
        // Commission Settings
        defaultCommissionRate: 3,
        minCommissionAmount: 1000,
        maxCommissionAmount: 1000000,

        // Specific Commissions
        specificCommissions: [
            { id: 1, vendorName: 'Boutique Koumassi', accountNumber: 'FNE-25897001', rate: 2.5 }
        ],

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

    const [newSpecific, setNewSpecific] = useState({ vendorId: '', rate: 0 });
    const [vendorSearch, setVendorSearch] = useState('');
    const [showVendorResults, setShowVendorResults] = useState(false);

    const filteredVendors = useMemo(() => {
        if (!vendorSearch) return MOCK_VENDORS;
        return MOCK_VENDORS.filter(v =>
            v.accountNumber.toLowerCase().includes(vendorSearch.toLowerCase()) ||
            v.name.toLowerCase().includes(vendorSearch.toLowerCase())
        );
    }, [vendorSearch]);

    const handleChange = (field, value) => {
        setConfig(prev => ({ ...prev, [field]: value }));
    };

    const handleAddSpecificCommission = () => {
        if (!newSpecific.vendorId) return;
        const vendor = MOCK_VENDORS.find(v => v.id === parseInt(newSpecific.vendorId));
        if (!vendor) return;

        const exists = config.specificCommissions.find(sc => sc.accountNumber === vendor.accountNumber);
        if (exists) {
            showSuccess(`Une commission spécifique existe déjà pour ce vendeur.`);
            return;
        }

        setConfig(prev => ({
            ...prev,
            specificCommissions: [
                ...prev.specificCommissions,
                {
                    id: Date.now(),
                    vendorName: vendor.name,
                    accountNumber: vendor.accountNumber,
                    rate: newSpecific.rate
                }
            ]
        }));
        setNewSpecific({ vendorId: '', rate: 0 });
        setVendorSearch('');
        showSuccess('Commission spécifique ajoutée');
    };

    const handleRemoveSpecificCommission = (id) => {
        setConfig(prev => ({
            ...prev,
            specificCommissions: prev.specificCommissions.filter(sc => sc.id !== id)
        }));
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

                {/* Specific Vendor Commissions */}
                <Card style={{ padding: '2rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-main)' }}>
                        Commissions Spécifiques par Vendeur
                    </h2>

                    <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'flex-end' }}>
                            <div style={{ position: 'relative' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    Vendeur (Recherche par N° Compte ou Nom)
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Saisir N° Compte ou Nom..."
                                        value={vendorSearch}
                                        onFocus={() => setShowVendorResults(true)}
                                        onChange={(e) => {
                                            setVendorSearch(e.target.value);
                                            setShowVendorResults(true);
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            background: 'white'
                                        }}
                                    />
                                    <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                </div>

                                {showVendorResults && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        right: 0,
                                        backgroundColor: 'white',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)',
                                        marginTop: '4px',
                                        boxShadow: 'var(--shadow-lg)',
                                        zIndex: 10,
                                        maxHeight: '200px',
                                        overflowY: 'auto'
                                    }}>
                                        {filteredVendors.length > 0 ? (
                                            filteredVendors.map(v => (
                                                <div
                                                    key={v.id}
                                                    onClick={() => {
                                                        setNewSpecific(prev => ({ ...prev, vendorId: v.id.toString() }));
                                                        setVendorSearch(`${v.accountNumber} - ${v.name}`);
                                                        setShowVendorResults(false);
                                                    }}
                                                    style={{
                                                        padding: '0.75rem 1rem',
                                                        cursor: 'pointer',
                                                        borderBottom: '1px solid var(--border-color)',
                                                        fontSize: '0.9rem'
                                                    }}
                                                    onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--bg-main)'}
                                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                                                >
                                                    <div style={{ fontWeight: '600', color: 'var(--primary)' }}>{v.accountNumber}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{v.name}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                                Aucun vendeur trouvé
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    Taux de commission (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={newSpecific.rate}
                                    onChange={(e) => setNewSpecific(prev => ({ ...prev, rate: parseFloat(e.target.value) }))}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: 'var(--radius-md)'
                                    }}
                                />
                            </div>
                            <Button onClick={handleAddSpecificCommission} style={{ padding: '0.75rem 1.5rem' }}>
                                Ajouter
                            </Button>
                        </div>
                    </div>

                    <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8125rem' }}>Vendeur / N° Compte</th>
                                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.8125rem' }}>Taux (%)</th>
                                    <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.8125rem' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {config.specificCommissions.length === 0 ? (
                                    <tr>
                                        <td colSpan="3" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            Aucune commission spécifique configurée
                                        </td>
                                    </tr>
                                ) : (
                                    config.specificCommissions.map(sc => (
                                        <tr key={sc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                            <td style={{ padding: '1rem' }}>
                                                <div style={{ fontWeight: '600' }}>{sc.vendorName}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{sc.accountNumber}</div>
                                            </td>
                                            <td style={{ padding: '1rem' }}>{sc.rate}%</td>
                                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleRemoveSpecificCommission(sc.id)}
                                                    style={{ border: 'none', background: 'none', color: 'var(--danger)', cursor: 'pointer' }}
                                                >
                                                    Supprimer
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
