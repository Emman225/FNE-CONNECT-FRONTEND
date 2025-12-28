import React from 'react';

const Step2Identite = ({ data, updateData, onNext, onBack }) => {
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
                    Identité
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Renseignez vos informations personnelles
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Civilité et Nationalité */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Civilité
                        </label>
                        <select
                            className="input-field"
                            value={data.civilite || ''}
                            onChange={(e) => updateData({ civilite: e.target.value })}
                        >
                            <option value="">Sélectionner</option>
                            <option value="M.">M.</option>
                            <option value="Mme">Mme</option>
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Nationalité
                        </label>
                        <select
                            className="input-field"
                            value={data.nationalite || ''}
                            onChange={(e) => updateData({ nationalite: e.target.value })}
                        >
                            <option value="">Sélectionner</option>
                            <option value="Ivoirienne">Ivoirienne</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                </div>

                {/* Nom et Prénoms */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Nom
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Votre nom"
                            value={data.nom || ''}
                            onChange={(e) => updateData({ nom: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Prénoms
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Vos prénoms"
                            value={data.prenoms || ''}
                            onChange={(e) => updateData({ prenoms: e.target.value })}
                        />
                    </div>
                </div>

                {/* Date et Lieu de naissance */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Date de naissance
                        </label>
                        <input
                            type="date"
                            className="input-field"
                            value={data.dateNaissance || ''}
                            onChange={(e) => updateData({ dateNaissance: e.target.value })}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                            Lieu de naissance
                        </label>
                        <input
                            type="text"
                            className="input-field"
                            placeholder="Ville"
                            value={data.lieuNaissance || ''}
                            onChange={(e) => updateData({ lieuNaissance: e.target.value })}
                        />
                    </div>
                </div>

                {/* Adresse complète */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Adresse complète
                    </label>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Rue, quartier, commune..."
                        value={data.adresse || ''}
                        onChange={(e) => updateData({ adresse: e.target.value })}
                    />
                </div>

                {/* Email */}
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.875rem' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        className="input-field"
                        placeholder="votre@email.com"
                        value={data.email || ''}
                        onChange={(e) => updateData({ email: e.target.value })}
                    />
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

export default Step2Identite;
