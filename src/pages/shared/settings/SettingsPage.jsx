import React, { useState } from 'react';
import GeneralSettings from '../../../app/shared/features/profile/GeneralSettings';
import CompanySettings from '../../../app/shared/features/profile/CompanySettings';
import SecuritySettings from '../../../app/shared/features/profile/SecuritySettings';
import { User, Building, Lock } from 'lucide-react';

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('general');

    const renderContent = () => {
        switch (activeTab) {
            case 'general': return <GeneralSettings />;
            case 'company': return <CompanySettings />;
            case 'security': return <SecuritySettings />;
            default: return <GeneralSettings />;
        }
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '1.875rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>Paramètres</h1>
                <p className="text-muted">Gérez vos informations personnelles et celles de votre entreprise.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', paddingBottom: '1px' }}>
                <button
                    onClick={() => setActiveTab('general')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.25rem',
                        borderBottom: activeTab === 'general' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'general' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'general' ? '600' : '500',
                        background: 'none',
                        borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <User size={18} /> Mon Profil
                </button>
                <button
                    onClick={() => setActiveTab('company')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.25rem',
                        borderBottom: activeTab === 'company' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'company' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'company' ? '600' : '500',
                        background: 'none',
                        borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Building size={18} /> Entreprise
                </button>
                <button
                    onClick={() => setActiveTab('security')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        padding: '0.75rem 1.25rem',
                        borderBottom: activeTab === 'security' ? '2px solid var(--primary)' : '2px solid transparent',
                        color: activeTab === 'security' ? 'var(--primary)' : 'var(--text-secondary)',
                        fontWeight: activeTab === 'security' ? '600' : '500',
                        background: 'none',
                        borderTop: 'none', borderLeft: 'none', borderRight: 'none', cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    <Lock size={18} /> Sécurité
                </button>
            </div>

            {/* Content */}
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default SettingsPage;
