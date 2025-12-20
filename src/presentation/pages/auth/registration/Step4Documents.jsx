import React, { useRef } from 'react';
import { Upload, FileText, X } from 'lucide-react';

const Step4Documents = ({ data, updateData, onNext, onBack }) => {
    const cniRectoRef = useRef(null);
    const cniVersoRef = useRef(null);
    const cniSelfieRef = useRef(null);
    const justificatifRef = useRef(null);

    const handleFileSelect = (field, file) => {
        if (file) {
            updateData({ [field]: file });
        }
    };

    const handleRemoveFile = (field) => {
        updateData({ [field]: null });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    const FileUploadBox = ({ label, field, inputRef, file }) => (
        <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', fontSize: '0.875rem' }}>
                {label}
            </label>
            <div
                onClick={() => !file && inputRef.current?.click()}
                style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem',
                    textAlign: 'center',
                    cursor: file ? 'default' : 'pointer',
                    backgroundColor: file ? 'var(--bg-main)' : 'white',
                    transition: 'all 0.2s'
                }}
            >
                {file ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <FileText size={24} color="var(--primary)" />
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>
                                {file.name}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile(field);
                            }}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--danger)',
                                padding: '0.25rem'
                            }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <div>
                        <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                            Cliquez pour télécharger
                        </p>
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,.pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => e.target.files[0] && handleFileSelect(field, e.target.files[0])}
                />
            </div>
        </div>
    );

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'var(--primary)',
                    marginBottom: '0.5rem'
                }}>
                    Documents
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Téléchargez vos pièces d'identité
                </p>
            </div>

            {/* Info Box */}
            <div style={{
                backgroundColor: 'rgba(0, 186, 113, 0.1)',
                border: '1px solid var(--primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '2rem'
            }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--primary)', margin: 0 }}>
                    ℹ️ Vos documents sont nécessaires pour un pdf, une capture une capture d'écran jpg/png/pdf, une capture seront acceptés.
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <FileUploadBox
                    label="CNI - Recto"
                    field="cniRecto"
                    inputRef={cniRectoRef}
                    file={data.cniRecto}
                />

                <FileUploadBox
                    label="CNI - Verso"
                    field="cniVerso"
                    inputRef={cniVersoRef}
                    file={data.cniVerso}
                />

                <FileUploadBox
                    label="Selfie avec CNI"
                    field="cniSelfie"
                    inputRef={cniSelfieRef}
                    file={data.cniSelfie}
                />

                <FileUploadBox
                    label="Justificatif de domicile"
                    field="justificatifDomicile"
                    inputRef={justificatifRef}
                    file={data.justificatifDomicile}
                />

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

export default Step4Documents;
