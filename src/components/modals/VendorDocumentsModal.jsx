import React, { useState, useEffect } from 'react';
import { X, FileText, Image, Download, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { adminService } from '../../services/adminService';
import LogoLoader from '../ui/LogoLoader';

const VendorDocumentsModal = ({ isOpen, onClose, vendorId, vendorName }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && vendorId) {
            fetchDocuments();
        }
    }, [isOpen, vendorId]);

    const fetchDocuments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await adminService.getVendorDocuments(vendorId);
            setDocuments(response.data || response || []);
        } catch (err) {
            console.error('Erreur chargement documents:', err);
            setError('Impossible de charger les documents.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const getStatusBadge = (status) => {
        const styles = {
            approved: { bg: '#D1FAE5', color: '#065F46', border: '#10B981', label: 'Approuvé', icon: <CheckCircle size={12} /> },
            pending: { bg: '#FEF3C7', color: '#92400E', border: '#F59E0B', label: 'En attente', icon: <Clock size={12} /> },
            rejected: { bg: '#FEE2E2', color: '#991B1B', border: '#EF4444', label: 'Rejeté', icon: <XCircle size={12} /> },
        };
        const s = styles[status] || styles.pending;
        return (
            <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem',
                fontWeight: '600', backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}`,
            }}>
                {s.icon} {s.label}
            </span>
        );
    };

    const isImageFile = (fileType) => {
        return fileType && (fileType.startsWith('image/') || /\.(jpg|jpeg|png|gif|webp)$/i.test(fileType));
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '-';
        if (bytes < 1024) return `${bytes} o`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} Ko`;
        return `${(bytes / 1048576).toFixed(1)} Mo`;
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem',
        }}>
            <div style={{
                backgroundColor: 'white', borderRadius: '1rem', width: '100%', maxWidth: '720px',
                maxHeight: '85vh', display: 'flex', flexDirection: 'column',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}>
                {/* Header */}
                <div style={{
                    padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--primary)', margin: 0 }}>
                            Documents du Vendeur
                        </h2>
                        {vendorName && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                                {vendorName}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            border: 'none', background: 'none', cursor: 'pointer',
                            padding: '0.5rem', borderRadius: '0.5rem', color: '#6B7280',
                        }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '3rem' }}>
                            <LogoLoader size="lg" />
                            <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Chargement des documents...</p>
                        </div>
                    ) : error ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#DC2626' }}>
                            <XCircle size={32} style={{ margin: '0 auto 0.5rem' }} />
                            <p>{error}</p>
                        </div>
                    ) : documents.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                            <FileText size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                            <p style={{ fontWeight: '500' }}>Aucun document uploadé</p>
                            <p style={{ fontSize: '0.85rem' }}>Ce vendeur n'a pas encore soumis de documents.</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {documents.map((doc) => (
                                <div key={doc.id} style={{
                                    border: '1px solid #E5E7EB', borderRadius: '0.75rem',
                                    padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem',
                                    transition: 'border-color 0.2s',
                                }}>
                                    {/* Thumbnail / Icon */}
                                    <div style={{
                                        width: '56px', height: '56px', borderRadius: '0.5rem',
                                        backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', flexShrink: 0, overflow: 'hidden',
                                    }}>
                                        {isImageFile(doc.file_type) && doc.file_url ? (
                                            <img
                                                src={doc.file_url}
                                                alt={doc.document_type_label}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <FileText size={24} color="#9CA3AF" />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                            <span style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                                                {doc.document_type_label || doc.document_type}
                                            </span>
                                            {getStatusBadge(doc.status)}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                            {doc.original_name && <span>{doc.original_name}</span>}
                                            {doc.file_size && <span> · {formatFileSize(doc.file_size)}</span>}
                                            {doc.created_at && (
                                                <span> · Uploadé le {format(new Date(doc.created_at), 'dd MMM yyyy', { locale: fr })}</span>
                                            )}
                                        </div>
                                        {doc.rejection_reason && (
                                            <p style={{ fontSize: '0.75rem', color: '#DC2626', marginTop: '0.25rem' }}>
                                                Motif : {doc.rejection_reason}
                                            </p>
                                        )}
                                        {doc.reviewer && (
                                            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                                                Vérifié par : {doc.reviewer.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    {doc.file_url && (
                                        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                            <a
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                title="Voir"
                                                style={{
                                                    padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: 'var(--primary)', textDecoration: 'none',
                                                }}
                                            >
                                                <ExternalLink size={16} />
                                            </a>
                                            <a
                                                href={doc.file_url}
                                                download={doc.original_name}
                                                title="Télécharger"
                                                style={{
                                                    padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: '#6B7280', textDecoration: 'none',
                                                }}
                                            >
                                                <Download size={16} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '1rem 1.5rem', borderTop: '1px solid #E5E7EB',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {documents.length} document{documents.length > 1 ? 's' : ''}
                    </span>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.5rem 1.5rem', borderRadius: '0.5rem',
                            border: '1px solid #E5E7EB', backgroundColor: 'white',
                            cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem',
                        }}
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorDocumentsModal;
