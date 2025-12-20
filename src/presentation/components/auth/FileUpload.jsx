import React, { useRef, useState } from 'react';
import { UploadCloud, File, X, Check } from 'lucide-react';
import Button from '../ui/Button';

const FileUpload = ({ label, accept = "image/*,.pdf", onFileSelect, required }) => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            if (onFileSelect) onFileSelect(selectedFile);
        }
    };

    const handleRemove = (e) => {
        e.stopPropagation();
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (onFileSelect) onFileSelect(null);
    };

    return (
        <div style={{ marginBottom: '1.5rem' }}>
            {label && (
                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', display: 'block', color: 'var(--color-text-main)' }}>
                    {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
                </label>
            )}

            <div
                onClick={handleClick}
                style={{
                    border: '2px dashed #D1D5DB',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: file ? '#F0FDF4' : 'var(--color-background)', // Light green if file selected
                    borderColor: file ? 'var(--color-primary)' : '#D1D5DB',
                    transition: 'all 0.2s'
                }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    style={{ display: 'none' }}
                />

                {file ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-surface)', borderRadius: '50%' }}>
                            <Check size={24} color="var(--color-primary)" />
                        </div>
                        <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                            <p style={{ fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{file.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                            onClick={handleRemove}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', padding: '0.5rem' }}
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <>
                        <UploadCloud size={32} style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }} />
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                            Cliquez ou glissez votre document ici
                        </p>
                        <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.25rem' }}>PNG, JPG ou PDF (max 5MB)</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileUpload;
