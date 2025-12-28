import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { FileCheck, X, Download, Share2 } from 'lucide-react';
// import { QRCodeSVG } from 'qrcode.react';
import { useNotifications } from '../../../../context/NotificationContext';
import { formatCurrency } from '../../../../utils/financialUtils';

const FneInvoiceModal = ({ isOpen, onClose, invoice }) => {
    const { showSuccess, showLoading, dismissToast } = useNotifications();
    const [isGenerating, setIsGenerating] = useState(false);
    const [fneGenerated, setFneGenerated] = useState(invoice?.fneNumber ? true : false);
    const [fneData, setFneData] = useState({
        number: invoice?.fneNumber || null,
        qrCode: invoice?.fneQrCode || null,
        generatedAt: invoice?.fneGeneratedAt || null
    });

    if (!isOpen || !invoice) return null;

    const handleGenerateFNE = async () => {
        setIsGenerating(true);
        const loadingToast = showLoading('Génération de la facture FNE en cours...');

        // Simulate API call to DGI
        setTimeout(() => {
            const fneNumber = `FNE-CI-${new Date().getFullYear()}-${Math.random().toString().slice(2, 12)}`;
            const qrCodeData = `https://dgi.gouv.ci/verify/${fneNumber}`;

            setFneData({
                number: fneNumber,
                qrCode: qrCodeData,
                generatedAt: new Date().toISOString()
            });

            setFneGenerated(true);
            setIsGenerating(false);
            dismissToast(loadingToast);
            showSuccess('Facture FNE générée avec succès !');
        }, 2500);
    };

    const handleDownload = () => {
        showSuccess('Téléchargement de la facture FNE en cours...');
        // Simulate PDF download
        console.log('Downloading FNE invoice:', fneData.number);
    };

    const handleShare = () => {
        showSuccess('Lien de partage copié dans le presse-papier !');
        // Simulate sharing
        console.log('Sharing FNE invoice:', fneData.number);
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
                maxWidth: '700px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-xl)',
                position: 'relative'
            }}>
                {/* Header */}
                <div style={{
                    padding: '2rem',
                    borderBottom: '1px solid var(--border-color)',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 1
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
                            padding: '0.5rem',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-secondary)'
                        }}
                        className="hover:bg-gray-100"
                    >
                        <X size={20} />
                    </button>

                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: fneGenerated ? 'var(--success-light)' : 'var(--primary-lighter)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem'
                    }}>
                        <FileCheck size={32} color={fneGenerated ? 'var(--success)' : 'var(--primary)'} />
                    </div>

                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        textAlign: 'center',
                        marginBottom: '0.5rem',
                        color: 'var(--text-main)'
                    }}>
                        {fneGenerated ? 'Facture FNE Officielle' : 'Générer Facture FNE'}
                    </h2>

                    <p style={{
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '0.875rem'
                    }}>
                        {fneGenerated
                            ? 'Votre facture FNE a été générée avec succès'
                            : 'Générez votre facture FNE officielle conforme à la DGI'
                        }
                    </p>
                </div>

                {/* Content */}
                <div style={{ padding: '2rem' }}>
                    {/* Invoice Details */}
                    <div style={{
                        backgroundColor: 'var(--bg-main)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.5rem',
                        marginBottom: '2rem'
                    }}>
                        <h3 style={{
                            fontSize: '1rem',
                            fontWeight: '600',
                            marginBottom: '1rem',
                            color: 'var(--text-main)'
                        }}>
                            Détails de la Facture
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Numéro Facture</span>
                                <span style={{ fontWeight: '600' }}>{invoice.number || invoice.id}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Client</span>
                                <span style={{ fontWeight: '500' }}>{invoice.client?.name || invoice.clientName}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Montant TTC</span>
                                <span style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                    {formatCurrency(invoice.amount || invoice.totalTTC)}
                                </span>
                            </div>
                            {fneGenerated && (
                                <>
                                    <div style={{
                                        borderTop: '1px solid var(--border-color)',
                                        paddingTop: '0.75rem',
                                        marginTop: '0.5rem'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Numéro FNE</span>
                                            <span style={{ fontWeight: '700', color: 'var(--success)', fontSize: '0.9375rem' }}>
                                                {fneData.number}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ color: 'var(--text-secondary)' }}>Généré le</span>
                                            <span style={{ fontSize: '0.875rem' }}>
                                                {new Date(fneData.generatedAt).toLocaleString('fr-FR')}
                                            </span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* QR Code - Only show when FNE is generated */}
                    {fneGenerated && (
                        <div style={{
                            backgroundColor: 'white',
                            border: '2px solid var(--border-color)',
                            borderRadius: 'var(--radius-md)',
                            padding: '2rem',
                            marginBottom: '2rem',
                            textAlign: 'center'
                        }}>
                            <h3 style={{
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '1.5rem',
                                color: 'var(--text-main)'
                            }}>
                                QR Code de Vérification
                            </h3>

                            <div style={{
                                display: 'inline-block',
                                padding: '1rem',
                                backgroundColor: 'white',
                                borderRadius: 'var(--radius-md)',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                {/* 
                                <QRCodeSVG
                                    value={fneData.qrCode}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                                 */}
                            </div>

                            <p style={{
                                marginTop: '1rem',
                                fontSize: '0.875rem',
                                color: 'var(--text-secondary)'
                            }}>
                                Scannez ce code pour vérifier l'authenticité de la facture
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: fneGenerated ? 'row' : 'column' }}>
                        {!fneGenerated ? (
                            <>
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    style={{ flex: 1 }}
                                    disabled={isGenerating}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    onClick={handleGenerateFNE}
                                    style={{ flex: 1 }}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? 'Génération en cours...' : 'Générer Facture FNE'}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={handleDownload}
                                    style={{ flex: 1 }}
                                >
                                    <Download size={18} /> Télécharger PDF
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    style={{ flex: 1 }}
                                >
                                    <Share2 size={18} /> Partager
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FneInvoiceModal;
