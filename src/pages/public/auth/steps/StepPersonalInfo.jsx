import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const StepPersonalInfo = ({ next, back, updateData, data }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        next();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Informations Personnelles</h2>

            <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Input
                        label="Nom"
                        placeholder="Votre nom"
                        value={data.lastName || ''}
                        onChange={(e) => updateData({ lastName: e.target.value })}
                        required
                    />
                    <Input
                        label="Prénoms"
                        placeholder="Vos prénoms"
                        value={data.firstName || ''}
                        onChange={(e) => updateData({ firstName: e.target.value })}
                        required
                    />
                </div>

                <Input
                    label="Date de naissance"
                    type="date"
                    value={data.birthDate || ''}
                    onChange={(e) => updateData({ birthDate: e.target.value })}
                    required
                />

                <Input
                    label="Adresse"
                    placeholder="Commune, Quartier..."
                    value={data.address || ''}
                    onChange={(e) => updateData({ address: e.target.value })}
                    required
                />

                <Input
                    label="Email (Optionnel)"
                    type="email"
                    placeholder="exemple@email.com"
                    value={data.email || ''}
                    onChange={(e) => updateData({ email: e.target.value })}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Button variant="ghost" onClick={back} type="button" style={{ flex: 1 }}>Retour</Button>
                <Button type="submit" style={{ flex: 1 }}>Suivant</Button>
            </div>
        </form>
    );
};

export default StepPersonalInfo;
