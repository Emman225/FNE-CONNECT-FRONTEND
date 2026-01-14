import React, { useState } from 'react';
import { Building2, User, Globe, Landmark, X } from 'lucide-react';
import { useEffect } from 'react';
import { useNotifications } from '../../../context/NotificationContext';

const AddVendorModal = ({ isOpen, onClose, onSave, vendor = null }) => {
    const { showError } = useNotifications();
    const [data, setData] = useState({
        clientType: '',
        clientNcc: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        currency: '',
        exchangeRate: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (vendor) {
                // Map vendor fields to form fields
                setData({
                    clientType: vendor.clientType || 'B2B', // Fallback or logic based on company
                    clientNcc: vendor.ncc || '',
                    clientName: vendor.name || '',
                    clientPhone: vendor.phone || '',
                    clientEmail: vendor.email || '',
                    currency: vendor.currency || '',
                    exchangeRate: vendor.exchangeRate || ''
                });
            } else {
                setData({
                    clientType: '',
                    clientNcc: '',
                    clientName: '',
                    clientPhone: '',
                    clientEmail: '',
                    currency: '',
                    exchangeRate: ''
                });
            }
        }
    }, [isOpen, vendor]);

    if (!isOpen) return null;

    // Validation Logic
    const validate = () => {
        if (!data.clientType) {
            showError('Veuillez sélectionner un type d\'activité.');
            return false;
        }

        const requiredFields = {
            'B2B': ['clientNcc', 'clientName', 'clientPhone', 'clientEmail'],
            'B2C': ['clientName'],
            'B2F': ['clientName', 'currency', 'exchangeRate'],
            'B2G': ['clientName']
        };

        const currentRequired = requiredFields[data.clientType] || [];
        for (const field of currentRequired) {
            if (!data[field]) {
                const labels = {
                    clientNcc: 'NCC du client',
                    clientName: 'Nom du client / Société',
                    clientPhone: 'Téléphone',
                    clientEmail: 'Email',
                    currency: 'Devise',
                    exchangeRate: 'Taux de change'
                };
                showError(`Veuillez remplir le champ obligatoire : ${labels[field] || field}`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onSave(data);
            onClose();
        }
    };

    const updateData = (newData) => {
        setData(prev => ({ ...prev, ...newData }));
    };

    const renderClientTypeCard = (type, icon, title, description) => (
        <div
            onClick={() => updateData({ clientType: type })}
            style={{
                border: data.clientType === type ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                cursor: 'pointer',
                backgroundColor: data.clientType === type ? 'rgba(59, 130, 246, 0.05)' : 'white',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
            }}
        >
            <div style={{
                color: data.clientType === type ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: data.clientType === type ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-secondary)',
                padding: '0.75rem',
                borderRadius: '50%'
            }}>
                {icon}
            </div>
            <div>
                <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: data.clientType === type ? 'var(--primary)' : 'var(--text-main)' }}>{title}</h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{description}</p>
            </div>
        </div>
    );

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '700px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                margin: '1rem',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--secondary)',
                    color: 'white'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'white' }}>
                        {vendor ? 'Modifier le Vendeur' : 'Ajouter un Vendeur'}
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'white'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h2 style={{
                            fontSize: '1.75rem',
                            fontWeight: '700',
                            color: 'var(--primary)',
                            marginBottom: '0.5rem'
                        }}>
                            Type de Client
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            Sélectionnez votre cible principale
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Client Type Selection */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                            {renderClientTypeCard('B2B', <Building2 size={24} />, 'B2B - Entreprise', 'Vente aux entreprises locales')}
                            {renderClientTypeCard('B2C', <User size={24} />, 'B2C - Particulier', 'Vente aux particuliers')}
                            {renderClientTypeCard('B2F', <Globe size={24} />, 'B2F - International', 'Clients à l\'étranger')}
                            {renderClientTypeCard('B2G', <Landmark size={24} />, 'B2G - Public', 'État et collectivités')}
                        </div>

                        {/* Conditional Fields */}
                        {data.clientType && (
                            <div style={{
                                animation: 'fadeIn 0.3s ease-in-out',
                                backgroundColor: 'var(--bg-secondary)',
                                padding: '1.5rem',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                                    Informations requises pour {data.clientType}
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>

                                    {/* B2B Specific */}
                                    {data.clientType === 'B2B' && (
                                        <div style={{ gridColumn: '1 / -1' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>NCC du client <span style={{ color: 'red' }}>*</span></label>
                                            <input
                                                type="text"
                                                className="input-field"
                                                placeholder="Numéro NCC"
                                                value={data.clientNcc || ''}
                                                onChange={(e) => updateData({ clientNcc: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                                            />
                                        </div>
                                    )}

                                    {/* Common Field: Name */}
                                    <div style={{ gridColumn: '1 / -1' }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Nom du client / Société <span style={{ color: 'red' }}>*</span></label>
                                        <input
                                            type="text"
                                            className="input-field"
                                            placeholder={data.clientType === 'B2C' ? "Nom du client" : "Raison sociale"}
                                            value={data.clientName || ''}
                                            onChange={(e) => updateData({ clientName: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                                        />
                                    </div>

                                    {/* Phone & Email - Required for B2B */}
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                                            Téléphone {data.clientType === 'B2B' && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input
                                            type="tel"
                                            className="input-field"
                                            placeholder="+225..."
                                            value={data.clientPhone || ''}
                                            onChange={(e) => updateData({ clientPhone: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                                        />
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                                            Email {data.clientType === 'B2B' && <span style={{ color: 'red' }}>*</span>}
                                        </label>
                                        <input
                                            type="email"
                                            className="input-field"
                                            placeholder="contact@client.com"
                                            value={data.clientEmail || ''}
                                            onChange={(e) => updateData({ clientEmail: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                                        />
                                    </div>

                                    {/* B2F Specifics */}
                                    {data.clientType === 'B2F' && (
                                        <>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Devise <span style={{ color: 'red' }}>*</span></label>
                                                <select
                                                    className="input-field"
                                                    value={data.currency || ''}
                                                    onChange={(e) => updateData({ currency: e.target.value })}
                                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'white' }}
                                                >
                                                    <option value="">Sélectionner</option>
                                                    <option value="EUR">Euro (€)</option>
                                                    <option value="USD">Dollar ($)</option>
                                                    <option value="GBP">Livre (£)</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>Taux de change (XOF) <span style={{ color: 'red' }}>*</span></label>
                                                <input
                                                    type="number"
                                                    className="input-field"
                                                    placeholder="Ex: 655.957"
                                                    value={data.exchangeRate || ''}
                                                    onChange={(e) => updateData({ exchangeRate: e.target.value })}
                                                    style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Footer Buttons */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-light"
                                style={{ padding: '0.875rem 1.5rem', border: '1px solid var(--border-color)' }}
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ flex: 1, padding: '0.875rem' }}
                            >
                                {vendor ? 'Mettre à jour' : 'Ajouter le vendeur'}
                            </button>
                        </div>
                    </form>
                </div>
                <style>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default AddVendorModal;
