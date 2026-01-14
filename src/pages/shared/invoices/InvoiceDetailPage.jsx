import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min.js';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import DocumentHistoryTimeline from '../../../app/shared/features/documents/DocumentHistoryTimeline';
import StatusBadge from '../../../app/shared/features/documents/StatusBadge';
import { ArrowLeft, Download, Share2, Printer, Mail, ShieldCheck, CheckCircle, FileText } from 'lucide-react';
import { useDashboardPath } from '../../../hooks/useDashboardPath';
import { formatCurrency } from '../../../utils/financialUtils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import showAlert from '../../../utils/sweetAlert';
import emailService from '../../../services/emailService';

const InvoiceDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { basePath } = useDashboardPath();
    const [loading, setLoading] = useState(true);
    const [document, setDocument] = useState(null);
    const documentRef = useRef();

    useEffect(() => {
        const path = window.location.pathname;
        let type = 'invoice';
        if (path.includes('/quotes/')) type = 'quote';
        if (path.includes('/proformas/')) type = 'proforma';

        setTimeout(() => {
            const isInvoice = type === 'invoice';
            const isQuote = type === 'quote';
            const isProforma = type === 'proforma';

            const mockData = {
                id: id,
                number: isInvoice ? `1441119U250000000001` :
                    isQuote ? `DEV-2023-${id.toString().padStart(3, '0')}` :
                        `PRO-2023-${id.toString().padStart(3, '0')}`,
                type: type,
                issuer: {
                    name: 'SITE COTE D\'IVOIRE',
                    ncc: '1441119U',
                    regime: 'TEE',
                    center: '965 Impôts de la Riviera I',
                    rccm: 'ciabj2014b22650 du 07-11-2014',
                    bank: 'SITE COTE D\'IVOIRE-UBA- CI150 01001 101090010792 57',
                    establishment: 'SITE COTE D\'IVOIRE',
                    address: 'BP 3321 ABIDJAN (VILLE) 03',
                    phone: '0704729820',
                    email: 'loss4fr@yahoo.fr',
                    seller: 'Gestionnaire principal LOSSENI',
                    pdv: 'SIEGE',
                    location: 'CITE FEDERME',
                    legalFooter: 'SITE-CÔTE D\'IVOIRE, SARL au Capital de 1 000 000-RCCM N° CI-ABJ-2014-B-22650, CC N°1441119 IN, CNPS N°244489'
                },
                client: {
                    name: 'AFRICA PROJECT MANAGEMENT',
                    phone: '0707070707',
                    email: 'k.dibi@apm.ci',
                    address: 'Abidjan, CI',
                    ncc: '1339220 N',
                    regime: 'Particulier'
                },
                dateAt: '05/11/2025 22:13:39',
                createdAt: '2025-11-05T22:13:39',
                paymentMode: 'Virement',
                items: [
                    { id: 1, ref: '01APM082025', name: 'Facture prestation de service PMO du Mois d\'Aout 2025', quantity: 11, unit: 'JOURS', price: 50000, discount: 0, tvaRate: 0 }
                ],
                totalHT: 550000,
                tvaAmount: 0,
                totalTTC: 550000,
                otherTaxes: 0,
                netToPay: 550000,
                status: isInvoice
                    ? (['1', '104'].includes(id) ? 'fne_generated' : ['4', '5', '101', '102', '103'].includes(id) ? 'verifying' : id === '2' ? 'pending' : 'draft')
                    : 'draft',
                fneNumber: isInvoice && ['1', '104'].includes(id) ? '1441119U250000000001' : null
            };
            setDocument(mockData);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading || !document) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--primary-lighter)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'loading 1s linear infinite' }}></div>
            </div>
        );
    }

    const typeLabels = {
        invoice: 'Facture de vente',
        quote: 'Devis',
        proforma: 'Facture Proforma'
    };

    const isFneGenerated = document.status === 'fne_generated';
    const isVerifying = document.status === 'verifying';
    const isDraft = !isFneGenerated && (document.status === 'draft' || isVerifying || (document.type === 'invoice' && document.status !== 'paid'));

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        const element = documentRef.current;
        const opt = {
            margin: 0,
            filename: `${document.number}.pdf`,
            image: { type: 'jpeg', quality: 1 },
            html2canvas: {
                scale: 3,
                useCORS: true,
                letterRendering: true
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        showAlert.success('Téléchargement', 'La génération du PDF est en cours...');
        html2pdf().set(opt).from(element).save();
    };

    const handleShare = async () => {
        const senderEmail = 'emmanuelmanu286@gmail.com';

        const { value: recipientEmail, isConfirmed } = await showAlert.prompt(
            'Partager par email',
            `Expéditeur : ${senderEmail}\n\nVeuillez saisir l'adresse email du destinataire :`,
            document.client.email
        );

        if (isConfirmed && recipientEmail) {
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(recipientEmail)) {
                return showAlert.error('Erreur', 'Veuillez saisir une adresse email valide.');
            }

            showAlert.loading('Envoi en cours', `Transmission du document vers ${recipientEmail}...`);

            try {
                const result = await emailService.sendEmail({
                    recipientEmail,
                    senderEmail,
                    invoiceNumber: document.number,
                    clientName: document.client.name,
                    sellerName: document.issuer.name,
                    invoiceDate: document.dateAt,
                    invoiceAmount: document.netToPay.toLocaleString()
                });

                if (result.success) {
                    showAlert.success(
                        'Document Envoyé',
                        `Le document #${document.number} a été transmis avec succès.\n\nDe : ${senderEmail}\nÀ : ${recipientEmail}`
                    );
                } else {
                    // Fallback to mailto if EmailJS is not configured yet
                    showAlert.warning(
                        'Service non configuré',
                        'Le service d\'envoi automatique n\'est pas encore configuré. Ouverture de votre client mail local...'
                    );

                    const subject = `${typeLabels[document.type]} N° ${document.number}`;
                    const body = `Bonjour ${document.client.name},\n\nVeuillez trouver ci-joint votre document.\n\nLien du document : ${window.location.href}`;

                    setTimeout(() => {
                        window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                    }, 1500);
                }
            } catch (error) {
                console.error('EmailJS Error Detail:', error);
                showAlert.error(
                    'Erreur d\'envoi',
                    `Une erreur est survenue lors de l'envoi : ${error.text || error.message || 'Erreur inconnue'}`
                );
            }
        }
    };

    return (
        <div className="fade-in" style={{ paddingBottom: '3rem' }}>
            {/* Action Bar (Dashboard UI) */}
            <div className="flex-between" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={() => navigate(-1)}
                        className="btn-icon"
                        style={{ background: 'white', border: '1px solid var(--border-color)', width: '42px', height: '42px' }}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                                {typeLabels[document.type]} #{document.id}
                            </h1>
                            <StatusBadge status={document.status} />
                        </div>
                    </div>
                </div>
                {isFneGenerated && (
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button onClick={handlePrint} className="btn btn-secondary"><Printer size={18} /> Imprimer</button>
                        <button onClick={handleDownload} className="btn btn-secondary"><Download size={18} /> Télécharger</button>
                        <button onClick={handleShare} className="btn btn-primary"><Mail size={18} /> Partager</button>
                    </div>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(800px, 9fr) 3fr', gap: '3rem', alignItems: 'start' }}>

                {/* Official Document Visual Container */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        ref={documentRef}
                        className="printable-document"
                        style={{
                            width: '100%',
                            maxWidth: '850px',
                            backgroundColor: 'white',
                            padding: '3.5rem',
                            position: 'relative',
                            boxShadow: '0 0 40px rgba(0,0,0,0.1)',
                            color: '#333',
                            minHeight: '1150px',
                            fontFamily: '"Times New Roman", Times, serif', // More formal Font
                        }}
                    >

                        {/* Brouillon Watermark (Dynamic) */}
                        {isDraft && (
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%) rotate(-45deg)',
                                fontSize: '80px',
                                fontWeight: '900',
                                color: 'rgba(239, 68, 68, 0.08)',
                                whiteSpace: 'nowrap',
                                pointerEvents: 'none',
                                zIndex: 100,
                                textTransform: 'uppercase',
                                border: '15px solid rgba(239, 68, 68, 0.08)',
                                padding: '30px',
                                textAlign: 'center'
                            }}>
                                {isVerifying ? 'Payé - En vérification' : (document.type === 'invoice' ? 'Facture Brouillon' : document.type === 'quote' ? 'Devis Brouillon' : 'Proforma Brouillon')}
                                <div style={{ fontSize: '20px', marginTop: '10px' }}>CERTIFICATION FNE EN ATTENTE</div>
                            </div>
                        )}

                        {/* Top Headers Section */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'start' }}>
                            {/* Issuer Container (Rounded Rectangle) */}
                            <div style={{
                                border: '1.5px solid #000',
                                borderRadius: '12px',
                                padding: '0.8rem 1.2rem',
                                width: '48%',
                                fontSize: '0.9rem',
                                lineHeight: '1.4'
                            }}>
                                <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.4rem' }}>{document.issuer.name}</div>
                                <div>NCC : {document.issuer.ncc}</div>
                                <div>Régime d'imposition : {document.issuer.regime}</div>
                                <div>Centre des impôts : {document.issuer.center}</div>
                            </div>

                            {/* Logo & Doc Title Section */}
                            <div style={{ textAlign: 'right', width: '40%' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem' }}>
                                    <ShieldCheck size={28} color="#2563eb" />
                                    <div style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>SITE <span style={{ color: '#f59e0b' }}>Côte d'Ivoire</span></div>
                                </div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                                    {typeLabels[document.type]} N° {document.number}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                                    {/* Verification QR Code (Official) */}
                                    <div style={{ width: '105px', height: '105px', border: '1px solid #000', padding: '4px' }}>
                                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #eee 25%, #fff 25%, #fff 50%, #eee 50%, #eee 75%, #fff 75%, #fff 100%)', backgroundSize: '10px 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ShieldCheck size={40} style={{ opacity: 0.1 }} />
                                        </div>
                                    </div>
                                    {/* FNE Certification Round Shield */}
                                    <div style={{ width: '105px', height: '105px', borderRadius: '50%', border: '4px solid #f59e0b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5px', textAlign: 'center', color: '#f59e0b' }}>
                                        <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>FNE</div>
                                        <CheckCircle size={24} />
                                        <div style={{ fontSize: '0.45rem', fontWeight: 'bold', lineHeight: '1.1' }}>FACTURE NORMALISÉE<br />ÉLECTRONIQUE</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Professional Meta & Client Info Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            {/* Left: Seller Legal Details */}
                            <div style={{ fontSize: '0.85rem', lineHeight: '1.5' }}>
                                <div style={{ marginBottom: '0.8rem' }}>RCCM : <b>{document.issuer.rccm}</b></div>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <div>Références bancaires :</div>
                                    <div style={{ fontWeight: '600' }}>{document.issuer.bank}</div>
                                </div>
                                <div style={{ marginBottom: '0.8rem' }}>
                                    <div>Établissement : {document.issuer.establishment}</div>
                                    <div>Adresse : {document.issuer.address}</div>
                                    <div>N° Tel : <b>{document.issuer.phone}</b></div>
                                    <div>Mail : {document.issuer.email}</div>
                                </div>
                                <div style={{ backgroundColor: '#fcfcfc', padding: '0.5rem', borderLeft: '3px solid #eee' }}>
                                    <div>Nom du vendeur : {document.issuer.seller}</div>
                                    <div>Nom de PDV : {document.issuer.pdv}</div>
                                    <div>Date et heure : <b>{document.dateAt}</b></div>
                                    <div>Mode de paiement : <b>{document.paymentMode}</b></div>
                                </div>
                                <div style={{ marginTop: '1rem', fontWeight: 'bold', fontSize: '0.9rem' }}>ADRESSE : {document.issuer.location}</div>
                            </div>

                            {/* Right: Client Header & Info */}
                            <div style={{ paddingLeft: '2.5rem' }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    borderBottom: '2px solid #333',
                                    marginBottom: '1rem',
                                    paddingBottom: '2px',
                                    display: 'inline-block'
                                }}>Client</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}><span>Nom :</span> <b>{document.client.name}</b></div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}><span>Adresse :</span> <span>{document.client.address}</span></div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}><span>NCC :</span> <b>{document.client.ncc}</b></div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}><span>Régime :</span> <span>{document.client.regime}</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Items Official Table (Solid Borders) */}
                        <div style={{ marginBottom: '2.5rem' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #000' }}>
                                <thead style={{ backgroundColor: '#f9f9f9' }}>
                                    <tr style={{ borderBottom: '2px solid #000', fontSize: '0.85rem' }}>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'left', width: '15%' }}>Réf</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'left', width: '30%' }}>Désignation</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'right', width: '10%' }}>P.U HT</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'center', width: '5%' }}>Qté</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'left', width: '8%' }}>Unité</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'center', width: '12%' }}>Taxes (%)</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'center', width: '8%' }}>Rem. (%)</th>
                                        <th style={{ padding: '0.6rem', textAlign: 'right', width: '12%' }}>Montant HT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {document.items.map((item, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #000', fontSize: '0.85rem' }}>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem' }}>{item.ref}</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem' }}>{item.name}</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem', textAlign: 'right' }}>{item.price.toLocaleString()}</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem', textAlign: 'center' }}>{item.quantity}</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem' }}>{item.unit}</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem', textAlign: 'center' }}>STVAD ({item.tvaRate})</td>
                                            <td style={{ borderRight: '1.5px solid #000', padding: '0.75rem', textAlign: 'center' }}>{item.discount}</td>
                                            <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    {/* Placeholder Spacer Rows */}
                                    <tr style={{ height: '50px' }}>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td style={{ borderRight: '1.5px solid #000' }}></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Sum Totals Official Recap Card */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem' }}>
                            <table style={{ width: '50%', borderCollapse: 'collapse', border: '2px solid #000', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                <tbody>
                                    <tr style={{ borderBottom: '1.5px solid #000' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem 1.2rem', textAlign: 'right', backgroundColor: '#f9f9f9', width: '60%' }}>TOTAL HT</td>
                                        <td style={{ padding: '0.6rem 1.2rem', textAlign: 'right' }}>{document.totalHT.toLocaleString()}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1.5px solid #000' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem 1.2rem', textAlign: 'right', backgroundColor: '#f9f9f9' }}>TVA</td>
                                        <td style={{ padding: '0.6rem 1.2rem', textAlign: 'right' }}>{document.tvaAmount.toLocaleString()}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1.5px solid #000' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem 1.2rem', textAlign: 'right', backgroundColor: '#f9f9f9' }}>TOTAL TTC</td>
                                        <td style={{ padding: '0.6rem 1.2rem', textAlign: 'right' }}>{document.totalTTC.toLocaleString()}</td>
                                    </tr>
                                    <tr style={{ borderBottom: '1.5px solid #000' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem 1.2rem', textAlign: 'right', backgroundColor: '#f9f9f9' }}>AUTRES TAXES</td>
                                        <td style={{ padding: '0.6rem 1.2rem', textAlign: 'right' }}>{document.otherTaxes.toLocaleString()}</td>
                                    </tr>
                                    <tr style={{ backgroundColor: '#fff', fontSize: '1.05rem' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.8rem 1.2rem', textAlign: 'right', backgroundColor: '#f9f9f9' }}>TOTAL A PAYER</td>
                                        <td style={{ padding: '0.8rem 1.2rem', textAlign: 'right', fontWeight: '900', color: '#000' }}>{document.netToPay.toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Official Summary of Taxes Table (RESUME DE LA FACTURE) */}
                        <div style={{ marginBottom: '4rem' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.6rem', color: '#000' }}>RESUME DE LA FACTURE</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1.5px solid #000', fontSize: '0.8rem' }}>
                                <thead style={{ backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
                                    <tr style={{ borderBottom: '1.5px solid #000' }}>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.5rem', textAlign: 'left', width: '40%' }}>CATEGORIE</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.5rem', textAlign: 'right' }}>SOUS-TOTAL</th>
                                        <th style={{ borderRight: '1.5px solid #000', padding: '0.5rem', textAlign: 'center' }}>TAUX (%)</th>
                                        <th style={{ padding: '0.5rem', textAlign: 'right' }}>TOTAL TAXES</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem' }}>TVA exo.lég - Pas de TVA sur HT 00,00% - D</td>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'right' }}>{document.totalHT.toLocaleString()}</td>
                                        <td style={{ borderRight: '1.5px solid #000', padding: '0.6rem', textAlign: 'center' }}>0%</td>
                                        <td style={{ padding: '0.6rem', textAlign: 'right' }}>0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Absolute Footer with Seller's Legal Information */}
                        <div style={{
                            position: 'absolute',
                            bottom: '2.5rem',
                            left: '3.5rem',
                            right: '3.5rem',
                            borderTop: '1px solid #000',
                            paddingTop: '1.2rem',
                            textAlign: 'center',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#444'
                        }}>
                            {document.issuer.legalFooter}
                        </div>
                    </div>
                </div>

                {/* Dashboard Side Info (Navigation / Status) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <Card style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ShieldCheck size={20} color="var(--primary)" /> État de Certification
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ padding: '1rem', backgroundColor: 'var(--bg-main)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>FNE / DGI</div>
                                <div style={{ fontWeight: '800', color: document.fneNumber ? 'var(--success)' : 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {document.fneNumber ? <><CheckCircle size={16} /> CERTIFIÉ DGI</> : <><FileText size={16} /> BROUILLON UNITAIRE</>}
                                </div>
                            </div>
                            <div style={{ padding: '1rem', backgroundColor: isDraft ? 'var(--warning-light)' : 'var(--success-light)', borderRadius: 'var(--radius-md)' }}>
                                <div style={{ fontSize: '0.8rem', color: isDraft ? 'var(--warning)' : 'var(--success)', marginBottom: '0.4rem' }}>Statut de Vente</div>
                                <div style={{ fontWeight: '800', color: isDraft ? 'var(--warning)' : 'var(--success)' }}>
                                    {isVerifying ? 'PAYÉ - EN VÉRIFICATION' : isDraft ? 'EN ATTENTE DE RÈGLEMENT' : 'DOCUMENT VALIDÉ'}
                                </div>
                            </div>
                        </div>
                    </Card>

                    <div style={{ flex: 1 }}>
                        <DocumentHistoryTimeline document={document} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailPage;
