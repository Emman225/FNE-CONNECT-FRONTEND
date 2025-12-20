import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import { Save, User, Mail, Phone, Camera, Trash2 } from 'lucide-react';

const GeneralSettings = () => {
    const [formData, setFormData] = useState({
        fullName: 'Jean Kouassi',
        email: 'jean.kouassi@example.com',
        phone: '07 08 09 10 11',
        bio: 'Directeur Général - DIO SARL',
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Card className="fade-in" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Profil Personnel</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Gérez vos informations personnelles et vos préférences.</p>
                </div>
                <button className="btn btn-primary">
                    <Save size={18} /> Enregistrer
                </button>
            </div>

            <div style={{ display: 'flex', gap: '3rem', flexDirection: 'column' }}>
                {/* Photo Section */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1.5rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            background: 'var(--gradient-dual)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '2.5rem',
                            fontWeight: '700',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            JK
                        </div>
                        <button style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            background: 'white',
                            border: '1px solid var(--border-color)',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)'
                        }}>
                            <Camera size={16} color="var(--text-main)" />
                        </button>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>Photo de profil</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem', maxWidth: '300px' }}>
                            Cette photo sera affichée sur votre profil et visible par les autres utilisateurs.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button className="btn btn-secondary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>Changer</button>
                            <button className="btn btn-icon" style={{ color: 'var(--danger)', border: '1px solid var(--border-color)', background: 'white' }} title="Supprimer">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Nom Complet</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                className="input-field"
                                style={{ paddingLeft: '2.75rem' }}
                                value={formData.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Email Professionnel</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="email"
                                className="input-field"
                                style={{ paddingLeft: '2.75rem' }}
                                value={formData.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Numéro de Téléphone</label>
                        <div style={{ position: 'relative' }}>
                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="tel"
                                className="input-field"
                                style={{ paddingLeft: '2.75rem' }}
                                value={formData.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-main)' }}>Poste / Rôle</label>
                        <input
                            type="text"
                            className="input-field"
                            value={formData.bio}
                            onChange={(e) => handleChange('bio', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default GeneralSettings;
