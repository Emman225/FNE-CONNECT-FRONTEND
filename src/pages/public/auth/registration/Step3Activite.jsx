import React from 'react';

const Step3Activite = ({ data, updateData, onNext, onBack }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
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
                {/* Type d'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Type d'activité
                    </label>
                    <select
                        className="input-field"
                        value={data.typeActivite || ''}
                        onChange={(e) => updateData({ typeActivite: e.target.value })}
                    >
                        <option value="">Sélectionnez votre activité</option>
                        <option value="Artisan">Artisan</option>
                        <option value="Commerçant">Commerçant</option>
                        <option value="Prestataire de services">Prestataire de services</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Autre">Autre</option>
                    </select>
                </div>

                {/* Description de l'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Description de l'activité
                    </label>
                    <textarea
                        className="input-field"
                        placeholder="Décrivez brièvement votre activité..."
                        value={data.descriptionActivite || ''}
                        onChange={(e) => updateData({ descriptionActivite: e.target.value })}
                        rows={4}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                {/* Nom commercial (optionnel) */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Nom commercial (optionnel)
                    </label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ex: Boutique Chez Mamadou"
                        value={data.nomCommercial || ''}
                        onChange={(e) => updateData({ nomCommercial: e.target.value })}
                    />
                </div>

                {/* Année de début d'activité */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Année de début d'activité
                    </label>
                    <select
                        className="input-field"
                        value={data.anneeDebut || ''}
                        onChange={(e) => updateData({ anneeDebut: e.target.value })}
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
