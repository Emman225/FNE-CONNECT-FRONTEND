import React, { useState } from 'react';
import Card from '../../../../components/ui/Card';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { Save, Building, FileText, MapPin, Globe } from 'lucide-react';

const CompanySettings = () => {
    const [formData, setFormData] = useState({
        companyName: 'DIO SARL',
        ncc: '123456789 A',
        address: 'Abidjan, Cocody Riviera 2',
        website: 'https://diosarl.ci',
    });

    return (
        <Card style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text-main)' }}>Informations de l'Entreprise</h3>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                <Input
                    label="Raison Sociale"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    icon={<Building size={18} />}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <Input
                        label="Numéro CC (NCC)"
                        value={formData.ncc}
                        onChange={(e) => setFormData({ ...formData, ncc: e.target.value })}
                        icon={<FileText size={18} />}
                    />
                    <Input
                        label="Site Web"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        icon={<Globe size={18} />}
                    />
                </div>

                <Input
                    label="Adresse Siège Social"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    icon={<MapPin size={18} />}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button className="btn btn-primary">
                        <Save size={18} /> Mettre à jour
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default CompanySettings;
