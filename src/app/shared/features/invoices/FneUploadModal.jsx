import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import { useNotifications } from '../../../../context/NotificationContext';

const FneUploadModal = ({ isOpen, onClose, invoice, onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { showSuccess, showError } = useNotifications();

    if (!isOpen || !invoice) return null;

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            showError("Veuillez sélectionner un fichier PDF valide.");
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            showError("Veuillez sélectionner un fichier avant d'importer.");
            return;
        }

        setIsUploading(true);
        // Simulate API call
        setTimeout(() => {
            setIsUploading(false);
            showSuccess(`Facture FNE pour ${invoice.number} téléversée avec succès !`);
            if (onUploadSuccess) onUploadSuccess(invoice.id);
            onClose();
            setFile(null);
        }, 2000);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '500px',
                width: '100%',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative',
                padding: '2rem'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--text-secondary)'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-lighter)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <Upload size={30} color="var(--primary)" />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Téléverser Facture FNE</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Joindre le document officiel pour la facture {invoice.number}</p>
                </div>

                <div
                    style={{
                        border: '2px dashed var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        padding: '2rem',
                        textAlign: 'center',
                        backgroundColor: 'var(--bg-main)',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        position: 'relative'
                    }}
                    onClick={() => document.getElementById('fne-upload-input').click()}
                >
                    <input
                        id="fne-upload-input"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />

                    {file ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--success)' }}>
                            <FileText size={24} />
                            <span style={{ fontWeight: '600' }}>{file.name}</span>
                        </div>
                    ) : (
                        <div>
                            <p style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Cliquez pour sélectionner le PDF</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Format PDF uniquement (Max 5Mo)</p>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button variant="outline" onClick={onClose} style={{ flex: 1 }} disabled={isUploading}>
                        Annuler
                    </Button>
                    <Button onClick={handleUpload} style={{ flex: 1 }} disabled={!file || isUploading}>
                        {isUploading ? 'Importation...' : 'Téléverser'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FneUploadModal;
