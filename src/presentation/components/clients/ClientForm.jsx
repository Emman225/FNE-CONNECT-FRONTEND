import React, { useState } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Save, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        location: '',
        type: 'Particulier',
        taxId: '', // NCC for companies
        regime: '' // New field for Regime
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to save
        console.log('Submitting client:', formData);
        alert('Client ajouté avec succès !');
        navigate('/dashboard/clients');
    };

    return (
        <Card style={{ padding: '2rem' }}>
            <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', fontWeight: '700', color: 'var(--text-main)' }}>Informations du Client</h3>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem', display: 'block', color: 'var(--text-secondary)' }}>Type de client</label>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="type"
                                value="Particulier"
                                checked={formData.type === 'Particulier'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }}
                            />
                            <span style={{ fontWeight: '500' }}>Particulier</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="type"
                                value="Entreprise"
                                checked={formData.type === 'Entreprise'}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--primary)' }}
                            />
                            <span style={{ fontWeight: '500' }}>Entreprise</span>
                        </label>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <Input
                        label={formData.type === 'Entreprise' ? "Raison Sociale" : "Nom complet"}
                        placeholder={formData.type === 'Entreprise' ? "Ex: DIO SARL" : "Ex: Jean Kouassi"}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    {formData.type === 'Entreprise' ? (
                        <Input
                            label="Numéro CC (NCC)"
                            placeholder="Ex: 1234567 A"
                            value={formData.taxId}
                            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                        />
                    ) : (
                        <div className="flex flex-col gap-1 w-full" style={{ marginBottom: '1rem' }}>
                            <label style={{
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)',
                                display: 'block'
                            }}>
                                Régime
                            </label>
                            <select
                                className="input-field"
                                value={formData.regime}
                                onChange={(e) => setFormData({ ...formData, regime: e.target.value })}
                                style={{
                                    width: '100%',
                                    height: '46px', // Match input height
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Sélectionner un régime</option>
                                <option value="Le régime de l’entreprenant">Le régime de l’entreprenant</option>
                                <option value="Le régime des microentreprises">Le régime des microentreprises</option>
                                <option value="Particulier">Particulier</option>
                                <option value="Le régime réel simplifié d’imposition">Le régime réel simplifié d’imposition</option>
                                <option value="Le régime réel normal d’imposition">Le régime réel normal d’imposition</option>
                            </select>
                        </div>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <Input
                        label="Téléphone"
                        placeholder="+225..."
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                    <Input
                        label="Email (Optionnel)"
                        type="email"
                        placeholder="contact@client.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>

                <Input
                    label="Localisation / Adresse"
                    placeholder="Commune, Quartier, Rue..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    style={{ marginBottom: '2.5rem' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button type="button" className="btn btn-light" onClick={() => navigate('/dashboard/clients')} style={{ border: '1px solid var(--border-color)' }}>Annuler</button>
                    <button type="submit" className="btn btn-primary">
                        <UserPlus size={18} /> Ajouter le client
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default ClientForm;
