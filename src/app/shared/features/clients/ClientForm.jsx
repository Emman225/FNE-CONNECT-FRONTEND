import React, { useState, useEffect } from 'react';
import Card from '../../../../components/ui/Card';
import { UserPlus, Save, Building, User, Globe, Landmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDashboardPath } from '../../../../hooks/useDashboardPath';
import showAlert from '../../../../utils/sweetAlert';

// Constants mirroring those in invoice.types.ts
const BillingType = {
    B2B: 'B2B', // Business to Business
    B2C: 'B2C', // Business to Consumer
    B2F: 'B2F', // Business to Foreign
    B2G: 'B2G'  // Business to Government
};

const BILLING_TYPE_LABELS = {
    [BillingType.B2B]: 'Entreprise (B2B)',
    [BillingType.B2C]: 'Consommateur final (B2C)',
    [BillingType.B2F]: 'Client international (B2F)',
    [BillingType.B2G]: 'État & collectivités (B2G)'
};

const CURRENCY_OPTIONS = [
    { value: 'XAF', label: 'XAF - Franc CFA', description: 'Afrique Centrale' },
    { value: 'EUR', label: 'EUR - Euro', description: 'Europe' },
    { value: 'USD', label: 'USD - Dollar américain', description: 'États-Unis' },
    { value: 'GBP', label: 'GBP - Livre sterling', description: 'Royaume-Uni' },
    { value: 'XOF', label: 'XOF - Franc CFA', description: 'Afrique de l\'Ouest' },
    { value: 'GNF', label: 'GNF - Franc guinéen', description: 'Guinée' },
    { value: 'NGN', label: 'NGN - Naira', description: 'Nigeria' }
];

const MOCK_CLIENTS = [
    { id: 1, name: 'Jean Doe', phone: '0708091011', email: 'jean@gmail.com', address: 'Cocody, Riviéra', type: 'B2C', ncc: '', taxRegime: 'Particulier' },
    { id: 2, name: 'Entreprise ABC', phone: '0102030405', email: 'contact@abc.ci', address: 'Plateau, Immeuble X', type: 'B2B', ncc: 'A1234567Z', taxRegime: 'Le régime réel normal d’imposition' },
    { id: 3, name: 'Marc Konan', phone: '0505050505', email: '', address: 'Yopougon, Maroc', type: 'B2C', ncc: '', taxRegime: 'Particulier' },
];

const ClientForm = ({ clientId, isViewOnly = false }) => {
    const navigate = useNavigate();
    const { basePath } = useDashboardPath();
    const isEditMode = !!clientId;

    // State mirroring InvoiceForm structure for client info
    const [formData, setFormData] = useState({
        billingType: BillingType.B2B,
        clientInfo: {
            clientName: '',
            phone: '',
            email: '',
            ncc: '',
            currency: 'XAF',
            exchangeRate: 1,
            additionalNotes: '',
            address: '',
            taxRegime: ''
        }
    });

    useEffect(() => {
        if (clientId) {
            const client = MOCK_CLIENTS.find(c => c.id === parseInt(clientId));
            if (client) {
                setFormData({
                    billingType: client.type,
                    clientInfo: {
                        clientName: client.name,
                        phone: client.phone,
                        email: client.email,
                        ncc: client.ncc,
                        currency: 'XAF',
                        exchangeRate: 1,
                        additionalNotes: '',
                        address: client.address,
                        taxRegime: client.taxRegime
                    }
                });
            }
        }
    }, [clientId]);

    const handleBillingTypeChange = (type) => {
        if (isViewOnly) return;
        setFormData(prev => ({
            ...prev,
            billingType: type,
            clientInfo: {
                ...prev.clientInfo,
                ncc: type === BillingType.B2B ? prev.clientInfo.ncc : '',
                currency: type === BillingType.B2F ? prev.clientInfo.currency : 'XAF',
                exchangeRate: type === BillingType.B2F ? prev.clientInfo.exchangeRate : 1
            }
        }));
    };

    const handleClientInfoChange = (field, value) => {
        if (isViewOnly) return;
        setFormData(prev => ({
            ...prev,
            clientInfo: {
                ...prev.clientInfo,
                [field]: value
            }
        }));
    };

    const getBillingTypeIcon = (type) => {
        switch (type) {
            case BillingType.B2B: return <Building size={20} />;
            case BillingType.B2C: return <User size={20} />;
            case BillingType.B2F: return <Globe size={20} />;
            case BillingType.B2G: return <Landmark size={20} />;
            default: return <Building size={20} />;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isViewOnly) return;

        // Logic to save
        const clientData = {
            ...formData,
            id: 'CL-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            created_at: new Date().toISOString()
        };
        console.log('Submitting client:', clientData);

        await showAlert.success(
            isEditMode ? 'Client Modifié' : 'Client Ajouté',
            isEditMode ? 'Les informations du client ont été mises à jour.' : 'Le nouveau client a été enregistré avec succès.'
        );

        navigate(`${basePath}/clients`);
    };

    return (
        <Card style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>
                    {isViewOnly ? 'Détails du Client' : (isEditMode ? 'Modifier le Client' : 'Nouveau Client')}
                </h3>

                {/* SECTION: TYPE DE FACTURATION */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', display: 'block', color: 'var(--text-secondary)' }}>
                        Type de Client <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        value={formData.billingType}
                        onChange={(e) => handleBillingTypeChange(e.target.value)}
                        disabled={isViewOnly}
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white',
                            fontSize: '0.95rem'
                        }}
                        required
                    >
                        {Object.entries(BILLING_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {getBillingTypeIcon(formData.billingType)}
                        {BILLING_TYPE_LABELS[formData.billingType]}
                    </div>
                </div>

                {/* SECTION: INFORMATIONS CLIENT */}
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--primary)' }}>
                            {getBillingTypeIcon(formData.billingType)}
                        </div>
                        <div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>Informations client</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Détails du client pour la facturation</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '1.5rem' }}>
                        {/* NCC (uniquement pour B2B) */}
                        {formData.billingType === BillingType.B2B && (
                            <>
                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        NCC du client <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.clientInfo.ncc || ''}
                                        onChange={(e) => handleClientInfoChange('ncc', e.target.value)}
                                        disabled={isViewOnly}
                                        placeholder="Numéro de Compte Contribuable"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                        }}
                                        required
                                    />
                                </div>
                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Régime fiscal <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <select
                                        value={formData.clientInfo.taxRegime || ''}
                                        onChange={(e) => handleClientInfoChange('taxRegime', e.target.value)}
                                        disabled={isViewOnly}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                        }}
                                        required
                                    >
                                        <option value="">Sélectionner</option>
                                        <option value="Le régime de l’entreprenant">Le régime de l’entreprenant</option>
                                        <option value="Le régime des microentreprises">Le régime des microentreprises</option>
                                        <option value="Particulier">Particulier</option>
                                        <option value="Le régime réel simplifié d’imposition">Le régime réel simplifié d’imposition</option>
                                        <option value="Le régime réel normal d’imposition">Le régime réel normal d’imposition</option>
                                    </select>
                                </div>
                            </>
                        )}

                        {/* Nom du client */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Nom de la société / du client <span style={{ color: 'red' }}>*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.clientInfo.clientName}
                                onChange={(e) => handleClientInfoChange('clientName', e.target.value)}
                                disabled={isViewOnly}
                                placeholder="Nom complet"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                }}
                                required
                            />
                        </div>

                        {/* Téléphone */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Téléphone {formData.billingType === BillingType.B2B && <span style={{ color: 'red' }}>*</span>}
                            </label>
                            <input
                                type="tel"
                                value={formData.clientInfo.phone || ''}
                                onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                                disabled={isViewOnly}
                                placeholder="+225..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                }}
                                required={formData.billingType === BillingType.B2B}
                            />
                        </div>

                        {/* Email */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Email {formData.billingType === BillingType.B2B && <span style={{ color: 'red' }}>*</span>}
                            </label>
                            <input
                                type="email"
                                value={formData.clientInfo.email || ''}
                                onChange={(e) => handleClientInfoChange('email', e.target.value)}
                                disabled={isViewOnly}
                                placeholder="email@example.com"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                }}
                                required={formData.billingType === BillingType.B2B}
                            />
                        </div>

                        {/* Adresse */}
                        <div style={{ gridColumn: 'span 1' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Adresse / Localisation
                            </label>
                            <input
                                type="text"
                                value={formData.clientInfo.address || ''}
                                onChange={(e) => handleClientInfoChange('address', e.target.value)}
                                disabled={isViewOnly}
                                placeholder="Commune, Quartier..."
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                }}
                            />
                        </div>

                        {/* Devise (uniquement pour B2F) */}
                        {formData.billingType === BillingType.B2F && (
                            <>
                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Devise <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <select
                                        value={formData.clientInfo.currency || 'XAF'}
                                        onChange={(e) => handleClientInfoChange('currency', e.target.value)}
                                        disabled={isViewOnly}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                        }}
                                        required
                                    >
                                        {CURRENCY_OPTIONS.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div style={{ gridColumn: 'span 1' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                        Taux de change <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.clientInfo.exchangeRate || 1}
                                        onChange={(e) => handleClientInfoChange('exchangeRate', parseFloat(e.target.value))}
                                        disabled={isViewOnly}
                                        placeholder="1.00"
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)',
                                            backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white'
                                        }}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Autres mentions */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                Autres mentions
                            </label>
                            <textarea
                                value={formData.clientInfo.additionalNotes || ''}
                                onChange={(e) => handleClientInfoChange('additionalNotes', e.target.value)}
                                disabled={isViewOnly}
                                placeholder="Informations complémentaires..."
                                rows={3}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: isViewOnly ? 'var(--bg-main)' : 'white',
                                    resize: 'vertical'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                    <button type="button" className="btn btn-light" onClick={() => navigate(`${basePath}/clients`)} style={{ border: '1px solid var(--border-color)' }}>
                        {isViewOnly ? 'Fermer' : 'Annuler'}
                    </button>
                    {!isViewOnly && (
                        <button type="submit" className="btn btn-primary">
                            <Save size={18} /> {isEditMode ? 'Enregistrer les modifications' : 'Enregistrer le client'}
                        </button>
                    )}
                </div>
            </form>
        </Card>
    );
};

export default ClientForm;
