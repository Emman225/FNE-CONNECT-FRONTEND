import React from 'react';
import Button from '../../../components/ui/Button';
import FileUpload from '../../../components/auth/FileUpload';

const StepKyc = ({ next, back, updateData, data }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        next();
    };

    // In a real app we'd handle file storage logic here or in the parent
    const handleFile = (key, file) => {
        updateData({ [key]: file ? file.name : null }); // Storing name for mock
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>Documents KYC</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Nous devons vérifier votre identité.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <FileUpload
                    label="CNI (Recto)"
                    required
                    onFileSelect={(f) => handleFile('cniRecto', f)}
                />
                <FileUpload
                    label="CNI (Verso)"
                    required
                    onFileSelect={(f) => handleFile('cniVerso', f)}
                />
            </div>

            <FileUpload
                label="Selfie avec CNI"
                required
                accept="image/*"
                onFileSelect={(f) => handleFile('selfie', f)}
            />

            <FileUpload
                label="Justificatif de domicile (Facture CIE/SODECI)"
                onFileSelect={(f) => handleFile('proofAddress', f)}
            />

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <Button variant="ghost" onClick={back} type="button" style={{ flex: 1 }}>Retour</Button>
                <Button type="submit" style={{ flex: 1 }}>Terminer</Button>
            </div>
        </form>
    );
};

export default StepKyc;
