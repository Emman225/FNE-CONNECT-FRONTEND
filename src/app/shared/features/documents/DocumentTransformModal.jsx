import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { FileText, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocumentStore } // from '../../../store' // TODO: Fix store path;
import { useNotifications } from '../../../context/NotificationContext';

const DocumentTransformModal = ({ isOpen, onClose, document, transformType }) => {
    const navigate = useNavigate();
    const { transformToProforma, transformToInvoice } = useDocumentStore();
    const { showSuccess, showLoading, dismissToast } = useNotifications();
    const [isTransforming, setIsTransforming] = useState(false);

    if (!isOpen || !document) return null;

    const getTransformInfo = () => {
        if (transformType === 'quote-to-proforma') {
            return {
                title: 'Transformer en Proforma',
                description: 'Voulez-vous transformer ce devis en facture proforma ?',
                from: 'Devis',
                to: 'Proforma',
                fromId: document.id,
                toPrefix: 'PRO'
            };
        } else if (transformType === 'proforma-to-invoice') {
            return {
                title: 'Transformer en Facture',
                description: 'Voulez-vous transformer cette proforma en facture ?',
                from: 'Proforma',
                to: 'Facture',
                fromId: document.id,
                toPrefix: 'FAC'
            };
        }
        return {};
    };

    const info = getTransformInfo();

    const handleTransform = async () => {
        setIsTransforming(true);
        const loadingToast = showLoading('Transformation en cours...');

        // Simulate API call
        setTimeout(() => {
            if (transformType === 'quote-to-proforma') {
                transformToProforma(document.id);
                dismissToast(loadingToast);
                showSuccess(`Proforma créée avec succès !`);
                navigate('/dashboard/proformas');
            } else if (transformType === 'proforma-to-invoice') {
                transformToInvoice(document.id);
                dismissToast(loadingToast);
                showSuccess(`Facture créée avec succès !`);
                navigate('/dashboard/invoices');
            }
            setIsTransforming(false);
            onClose();
        }, 1500);
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
                padding: '2rem',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
            }}>
                {/* Close button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-secondary)'
                    }}
                    className="hover:bg-gray-100"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-lighter)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <FileText size={32} color="var(--primary)" />
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    marginBottom: '0.5rem',
                    color: 'var(--text-main)'
                }}>
                    {info.title}
                </h2>

                {/* Description */}
                <p style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem'
                }}>
                    {info.description}
                </p>

                {/* Document info */}
                <div style={{
                    backgroundColor: 'var(--bg-main)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                {info.from}
                            </p>
                            <p style={{ fontWeight: '600', color: 'var(--text-main)' }}>
                                {document.id}
                            </p>
                        </div>
                        <ArrowRight size={24} color="var(--primary)" />
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                {info.to}
                            </p>
                            <p style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                {info.toPrefix}-{Date.now()}
                            </p>
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Client</span>
                            <span style={{ fontWeight: '500' }}>{document.client.name}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Montant TTC</span>
                            <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                {document.totalTTC?.toLocaleString('fr-FR')} FCFA
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        style={{ flex: 1 }}
                        disabled={isTransforming}
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleTransform}
                        style={{ flex: 1 }}
                        disabled={isTransforming}
                    >
                        {isTransforming ? 'Transformation...' : 'Confirmer'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DocumentTransformModal;
