import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Image as ImageIcon, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Step4Documents = ({ data, updateData, onNext, onBack }) => {
    const cniRectoRef = useRef(null);
    const cniVersoRef = useRef(null);
    const cniSelfieRef = useRef(null);
    const justificatifRef = useRef(null);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'application/pdf'];

    const handleFileSelect = (field, file) => {
        if (!file) return;

        // Validate Format
        if (!ACCEPTED_FORMATS.includes(file.type)) {
            toast.error('Format non supporté. Veuillez utiliser JPG, PNG ou PDF.');
            return;
        }

        // Validate Size
        if (file.size > MAX_FILE_SIZE) {
            toast.error('Fichier trop volumineux. La taille maximale est de 5 Mo.');
            return;
        }

        updateData({ [field]: file });
        toast.success('Document ajouté avec succès !');
    };

    const handleRemoveFile = (field) => {
        updateData({ [field]: null });
    };

    const validate = () => {
        if (!data.cniRecto) { toast.error('Veuillez télécharger la CNI Recto.'); return false; }
        if (!data.cniVerso) { toast.error('Veuillez télécharger la CNI Verso.'); return false; }
        if (!data.cniSelfie) { toast.error('Veuillez télécharger le Selfie avec CNI.'); return false; }
        if (!data.justificatifDomicile) { toast.error('Veuillez télécharger le Justificatif de domicile.'); return false; }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            onNext();
        }
    };

    const FileUploadBox = ({ label, field, inputRef, file }) => {
        const isImage = file && file.type.startsWith('image/');
        const previewUrl = isImage ? URL.createObjectURL(file) : null;

        return (
            <div>
                <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '500', fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    {label} <span style={{ color: 'red' }}>*</span>
                </label>
                <div
                    onClick={() => !file && inputRef.current?.click()}
                    style={{
                        border: '2px dashed var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: file ? '1rem' : '2rem',
                        textAlign: 'center',
                        cursor: file ? 'default' : 'pointer',
                        backgroundColor: file ? 'var(--bg-secondary)' : 'white',
                        transition: 'all 0.2s',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    {file ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, overflow: 'hidden' }}>
                                {/* Thumbnail / Icon */}
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    flexShrink: 0,
                                    backgroundColor: 'var(--bg-main)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid var(--border-color)'
                                }}>
                                    {isImage ? (
                                        <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <FileText size={24} color="var(--primary)" />
                                    )}
                                </div>

                                <div style={{ flex: 1, overflow: 'hidden', textAlign: 'left' }}>
                                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {file.name}
                                    </p>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveFile(field);
                                }}
                                style={{
                                    background: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '50%',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--danger)',
                                    flexShrink: 0
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Upload size={32} color="var(--text-muted)" style={{ marginBottom: '0.5rem' }} />
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                                Cliquez pour télécharger (PDF, JPG, PNG)
                            </p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                Max 5 Mo
                            </p>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => e.target.files[0] && handleFileSelect(field, e.target.files[0])}
                    />
                </div>
            </div>
        );
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
                    Documents
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Téléchargez vos pièces justificatives (Obligatoire)
                </p>
            </div>

            {/* Info Box */}
            <div style={{
                backgroundColor: 'rgba(59, 130, 246, 0.05)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '2rem'
            }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, display: 'flex', gap: '0.5rem' }}>
                    <span>ℹ️</span>
                    <span>
                        Assurez-vous que les documents sont <strong>lisibles</strong> et <strong>bien cadrés</strong>.
                        Formats acceptés : PDF, JPG, PNG. Taille max : 5 Mo.
                    </span>
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
