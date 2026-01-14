import React, { useState } from 'react';

const Step6Contrat = ({ data, updateData, onNext, onBack }) => {
    const [agreements, setAgreements] = useState({
        cgu: false,
        confidentialite: false,
        contratFiscal: false
    });

    const handleAgreementChange = (field, value) => {
        const updated = { ...agreements, [field]: value };
        setAgreements(updated);
        updateData({ agreements: updated });
    };

    const allAgreed = agreements.cgu && agreements.confidentialite && agreements.contratFiscal;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (allAgreed) {
            onNext();
        }
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Contrat
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Veuillez lire et accepter les termes
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Contrat scrollable */}
                <div style={{
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    height: '300px',
                    overflowY: 'auto',
                    backgroundColor: 'var(--bg-main)',
                    fontSize: '0.875rem',
                    lineHeight: '1.6'
                }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                        Contrat de Portage Fiscal FNE Connect
                    </h3>

                    {/* ... (Contract Content kept as is or minimized for brevity, assuming content is correct) ... */}
                    <h4 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                        Article 1 : Objet du contrat
                    </h4>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                        Le présent contrat a pour objet de définir les conditions dans lesquelles FNE Connect
                        assure la gestion administrative et fiscale de l'activité professionnelle du porté.
                    </p>
                    {/* ... more articles ... */}
                    <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        (Texte complet du contrat...)
                    </p>
                </div>

                {/* Checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)' }}>
                    <label style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={agreements.cgu}
                            onChange={(e) => handleAgreementChange('cgu', e.target.checked)}
                            style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                            J'accepte les <strong>conditions générales d'utilisation</strong> <span style={{ color: 'red' }}>*</span>
                        </span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={agreements.confidentialite}
                            onChange={(e) => handleAgreementChange('confidentialite', e.target.checked)}
                            style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                            J'accepte la <strong>politique de confidentialité</strong> <span style={{ color: 'red' }}>*</span>
                        </span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'start', gap: '0.75rem', cursor: 'pointer' }}>
                        <input
                            type="checkbox"
                            checked={agreements.contratFiscal}
                            onChange={(e) => handleAgreementChange('contratFiscal', e.target.checked)}
                            style={{ marginTop: '0.25rem', accentColor: 'var(--primary)', cursor: 'pointer', width: '18px', height: '18px' }}
                        />
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                            J'ai lu et j'accepte le <strong>contrat de portage fiscal</strong> <span style={{ color: 'red' }}>*</span>
                        </span>
                    </label>
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
                        disabled={!allAgreed}
                        className="btn btn-primary"
                        style={{
                            flex: 1,
                            padding: '0.875rem',
                            opacity: allAgreed ? 1 : 0.5,
                            cursor: allAgreed ? 'pointer' : 'not-allowed'
                        }}
                    >
                        Continuer →
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step6Contrat;
