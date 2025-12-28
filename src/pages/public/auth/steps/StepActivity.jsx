import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const StepActivity = ({ next, back, updateData, data }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        next();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-text-main)' }}>Activité Professionnelle</h2>

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', display: 'block', color: 'var(--color-text-main)' }}>
                    Type d'activité
                </label>
                <select
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #D1D5DB',
                        backgroundColor: 'var(--color-surface)',
                        outline: 'none',
                        color: 'var(--color-text-main)',
                        fontSize: '1rem'
                    }}
                    value={data.activityType || ''}
                    onChange={(e) => updateData({ activityType: e.target.value })}
                    required
                >
                    <option value="">Sélectionner...</option>
                    <option value="artisan">Artisan</option>
                    <option value="commercant">Commerçant</option>
                    <option value="freelance">Freelance / Prestataire</option>
                    <option value="transport">Transporteur</option>
                    <option value="agriculteur">Agriculteur</option>
                    <option value="autre">Autre</option>
                </select>
            </div>

            <Input
                label="Nom Commercial (Optionnel)"
                placeholder="Ex: Boutique Grâce Divine"
                value={data.shopName || ''}
                onChange={(e) => updateData({ shopName: e.target.value })}
            />

            <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', display: 'block', color: 'var(--color-text-main)' }}>
                    Description succincte
                </label>
                <textarea
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid #D1D5DB',
                        backgroundColor: 'var(--color-surface)',
                        outline: 'none',
                        color: 'var(--color-text-main)',
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                    placeholder="Décrivez votre activité en quelques mots..."
                    value={data.description || ''}
                    onChange={(e) => updateData({ description: e.target.value })}
                />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Button variant="ghost" onClick={back} type="button" style={{ flex: 1 }}>Retour</Button>
                <Button type="submit" style={{ flex: 1 }}>Suivant</Button>
            </div>
        </form>
    );
};

export default StepActivity;
