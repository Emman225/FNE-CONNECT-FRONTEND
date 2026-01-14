import React from 'react';
import toast from 'react-hot-toast';

const Step3Activite = ({ data, updateData, onNext, onBack }) => {

    // Validation Logic
    const validate = () => {
        if (!data.activityNature) {
            toast.error('Veuillez sélectionner la nature de votre activité.');
            return false;
        }
        if (!data.activityDescription || data.activityDescription.trim().length < 10) {
            toast.error('Veuillez fournir une description d\'au moins 10 caractères.');
            return false;
        }
        if (!data.activityStartYear) {
            toast.error('Veuillez sélectionner l\'année de début d\'activité.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onNext();
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Activité
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Décrivez votre activité professionnelle
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                {/* Nature de l'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        Nature de l'activité <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        className="input-field"
                        value={data.activityNature || ''}
                        onChange={(e) => updateData({ activityNature: e.target.value })}
                    >
                        <option value="">Sélectionnez une option</option>
                        <option value="Artisan">Artisan</option>
                        <option value="Commerçant">Commerçant</option>
                        <option value="Prestataire de services">Prestataire de services</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                {/* Description de l'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        Description de l'activité <span style={{ color: 'red' }}>*</span>
                    </label>
                    <textarea
                        className="input-field"
                        placeholder="Décrivez brièvement votre activité, vos produits ou services..."
                        value={data.activityDescription || ''}
                        onChange={(e) => updateData({ activityDescription: e.target.value })}
                        rows={4}
                        style={{ resize: 'vertical' }}
                    />
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', textAlign: 'right' }}>
                        {(data.activityDescription || '').length}/10 caractères min.
                    </p>
                </div>

                {/* Année de début d'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                        Année de début d'activité <span style={{ color: 'red' }}>*</span>
                    </label>
                    <select
                        className="input-field"
                        value={data.activityStartYear || ''}
                        onChange={(e) => updateData({ activityStartYear: e.target.value })}
                    >
                        <option value="">Sélectionnez l'année</option>
                        {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button
                        type="button"
                        onClick={onBack}
                        className="btn btn-light"
                        style={{ padding: '0.875rem 1.5rem' }}
                    >
                        ← Retour
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ flex: 1, padding: '0.875rem' }}
                    >
                        Continuer →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step3Activite;
