import React, { useState, useEffect } from 'react';
import {
    FaFileInvoice, FaBuilding, FaUser, FaGlobe, FaLandmark,
    FaCreditCard, FaMoneyBillWave, FaPlus, FaTrash, FaCheck,
    FaTimes, FaCalculator, FaInfoCircle, FaSave, FaPaperclip,
    FaUpload
} from 'react-icons/fa';
import {
    DocumentType,
    BillingType,
    PaymentMethod,
    UnitOfMeasure,
    TaxRateCode,
    type InvoiceFormData,
    type LineItem,
    type AdditionalTax,
    type TotalTax,
    type InvoiceFormProps,
    DOCUMENT_TYPE_LABELS,
    BILLING_TYPE_LABELS,
    PAYMENT_METHOD_LABELS,
    UNIT_OF_MEASURE_LABELS,
    TAX_RATE_OPTIONS,
    CURRENCY_OPTIONS
} from '../../../types/invoice.types';
import {
    useInvoiceCalculations,
    calculateLineItemTotal,
    formatCurrency,
    createEmptyLineItem,
    createEmptyAdditionalTax,
    createEmptyTotalTax
} from '../../../hooks/useInvoiceCalculations';
import InvoiceCommissionModal from '../../modals/InvoiceCommissionModal';
import './InvoiceForm.css';

const InvoiceForm: React.FC<InvoiceFormProps> = ({
    invoiceId,
    initialData,
    onSubmit,
    onCancel,
    onSaveDraft,
    isLoading = false,
    readonly = false,
    watermarkText,
    submitLabel,
    headerTitle
}) => {
    const isEditMode = !!invoiceId;
    const [isCommissionModalOpen, setIsCommissionModalOpen] = useState(false);
    const [pendingFormData, setPendingFormData] = useState<InvoiceFormData | null>(null);

    // ==================== ÉTAT DU FORMULAIRE ====================

    // Style pour le watermark
    const watermarkStyle: React.CSSProperties = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontSize: '8rem',
        fontWeight: '900',
        color: 'rgba(0, 0, 0, 0.05)',
        pointerEvents: 'none',
        zIndex: 0,
        whiteSpace: 'nowrap',
        userSelect: 'none'
    };

    const [formData, setFormData] = useState<InvoiceFormData>({
        documentType: initialData?.documentType || DocumentType.INVOICE,
        billingType: initialData?.billingType || BillingType.B2B,
        serviceType: initialData?.serviceType || 'vente_article',
        paymentMethod: initialData?.paymentMethod || PaymentMethod.BANK_TRANSFER,
        hasRNE: initialData?.hasRNE || false,
        rneNumber: initialData?.rneNumber || '',

        clientInfo: initialData?.clientInfo || {
            clientName: '',
            phone: '',
            email: '',
            additionalNotes: '',
            footerText: '',
            ncc: '',
            currency: 'XAF',
            exchangeRate: 1
        },

        lineItems: initialData?.lineItems || [createEmptyLineItem() as LineItem],
        additionalTaxes: initialData?.additionalTaxes || [],
        globalDiscount: initialData?.globalDiscount || { percent: 0, amount: 0 },
        totalTaxes: initialData?.totalTaxes || [],
        purchaseOrderFile: initialData?.purchaseOrderFile,
        deliveryNoteFile: initialData?.deliveryNoteFile,
        acompte: initialData?.acompte || 0,

        totals: initialData?.totals || {
            subtotalHT: 0,
            totalDiscount: 0,
            totalAfterDiscount: 0,
            totalTaxAmount: 0,
            totalAdditionalTaxes: 0,
            totalTTCTaxes: 0,
            totalTTC: 0,
            netAPayer: 0,
            taxSummary: []
        }
    });

    // Calculs automatiques
    const calculatedTotals = useInvoiceCalculations(
        formData.lineItems,
        formData.additionalTaxes,
        formData.globalDiscount,
        formData.totalTaxes,
        formData.acompte
    );

    // Mettre à jour les totaux calculés
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            totals: calculatedTotals
        }));
    }, [calculatedTotals]);

    // Mettre à jour le formulaire quand initialData change (mode édition)
    useEffect(() => {
        if (initialData && Object.keys(initialData).length > 0) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
                clientInfo: { ...prev.clientInfo, ...initialData.clientInfo },
                lineItems: initialData.lineItems || prev.lineItems,
                totals: initialData.totals || prev.totals
            }));
        }
    }, [initialData]);

    // ==================== HANDLERS ====================

    const handleBillingTypeChange = (type: BillingType) => {
        setFormData(prev => ({
            ...prev,
            billingType: type,
            clientInfo: {
                ...prev.clientInfo,
                ncc: type === BillingType.B2B ? prev.clientInfo.ncc : undefined,
                currency: type === BillingType.B2F ? prev.clientInfo.currency : undefined,
                exchangeRate: type === BillingType.B2F ? prev.clientInfo.exchangeRate : undefined
            }
        }));
    };

    const handleClientInfoChange = (field: string, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            clientInfo: {
                ...prev.clientInfo,
                [field]: value
            }
        }));
    };

    const handleLineItemChange = (id: string, field: keyof LineItem, value: any) => {
        setFormData(prev => ({
            ...prev,
            lineItems: prev.lineItems.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, [field]: value };
                    // Recalculer le total de la ligne
                    updatedItem.totalHT = calculateLineItemTotal(updatedItem);
                    return updatedItem;
                }
                return item;
            })
        }));
    };

    const addLineItem = () => {
        setFormData(prev => ({
            ...prev,
            lineItems: [...prev.lineItems, createEmptyLineItem() as LineItem]
        }));
    };

    const removeLineItem = (id: string) => {
        if (formData.lineItems.length > 1) {
            setFormData(prev => ({
                ...prev,
                lineItems: prev.lineItems.filter(item => item.id !== id)
            }));
        }
    };

    const addAdditionalTax = () => {
        setFormData(prev => ({
            ...prev,
            additionalTaxes: [...prev.additionalTaxes, createEmptyAdditionalTax() as AdditionalTax]
        }));
    };

    const removeAdditionalTax = (id: string) => {
        setFormData(prev => ({
            ...prev,
            additionalTaxes: prev.additionalTaxes.filter(tax => tax.id !== id)
        }));
    };

    const handleAdditionalTaxChange = (id: string, field: keyof AdditionalTax, value: any) => {
        setFormData(prev => ({
            ...prev,
            additionalTaxes: prev.additionalTaxes.map(tax =>
                tax.id === id ? { ...tax, [field]: value } : tax
            )
        }));
    };

    const addTotalTax = () => {
        setFormData(prev => ({
            ...prev,
            totalTaxes: [...prev.totalTaxes, createEmptyTotalTax() as TotalTax]
        }));
    };

    const removeTotalTax = (id: string) => {
        setFormData(prev => ({
            ...prev,
            totalTaxes: prev.totalTaxes.filter(tax => tax.id !== id)
        }));
    };

    const handleTotalTaxChange = (id: string, field: keyof TotalTax, value: any) => {
        setFormData(prev => ({
            ...prev,
            totalTaxes: prev.totalTaxes.map(tax =>
                tax.id === id ? { ...tax, [field]: value } : tax
            )
        }));
    };

    const addLineItemTax = (itemId: string) => {
        setFormData(prev => ({
            ...prev,
            lineItems: prev.lineItems.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        additionalTaxes: [...(item.additionalTaxes || []), createEmptyAdditionalTax() as AdditionalTax]
                    };
                }
                return item;
            })
        }));
    };

    const removeLineItemTax = (itemId: string, taxId: string) => {
        setFormData(prev => ({
            ...prev,
            lineItems: prev.lineItems.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        additionalTaxes: (item.additionalTaxes || []).filter(t => t.id !== taxId)
                    };
                }
                return item;
            })
        }));
    };

    const handleLineItemAdditionalTaxChange = (itemId: string, taxId: string, field: keyof AdditionalTax, value: any) => {
        setFormData(prev => ({
            ...prev,
            lineItems: prev.lineItems.map(item => {
                if (item.id === itemId) {
                    return {
                        ...item,
                        additionalTaxes: (item.additionalTaxes || []).map(t =>
                            t.id === taxId ? { ...t, [field]: value } : t
                        )
                    };
                }
                return item;
            })
        }));
    };

    const handleFileChange = (field: 'purchaseOrderFile' | 'deliveryNoteFile', file: File | null) => {
        setFormData(prev => ({
            ...prev,
            [field]: file || undefined
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!readonly && onSubmit) {
            // Si c'est une nouvelle facture (pas en mode édition), ouvrir le modal de commission
            if (!isEditMode) {
                setPendingFormData(formData);
                setIsCommissionModalOpen(true);
            } else {
                // En mode édition, soumettre directement sans redemander la commission
                await onSubmit(formData);
            }
        }
    };

    const handleCommissionPaymentSuccess = async (paymentMethod: string, transactionRef: string) => {
        if (pendingFormData && onSubmit) {
            // Ajouter les informations de commission aux données de la facture
            const commissionRate = 0.025; // 2.5%
            const commissionAmount = pendingFormData.totals.totalTTC * commissionRate;

            const invoiceWithCommission: InvoiceFormData = {
                ...pendingFormData,
                commission: {
                    rate: commissionRate,
                    amount: commissionAmount,
                    status: 'paid',
                    paidAt: new Date(),
                    paymentMethod,
                    transactionRef
                }
            };

            // Fermer le modal
            setIsCommissionModalOpen(false);
            setPendingFormData(null);

            // Soumettre la facture avec les informations de commission
            await onSubmit(invoiceWithCommission);
        }
    };

    const handleCommissionModalClose = () => {
        setIsCommissionModalOpen(false);
        setPendingFormData(null);
    };

    const handleSaveDraft = async () => {
        if (!readonly && onSaveDraft) {
            await onSaveDraft({
                ...formData,
                status: 'draft'
            });
        }
    };

    // ==================== RENDER HELPERS ====================

    const getBillingTypeIcon = (type: BillingType) => {
        switch (type) {
            case BillingType.B2B: return <FaBuilding />;
            case BillingType.B2C: return <FaUser />;
            case BillingType.B2F: return <FaGlobe />;
            case BillingType.B2G: return <FaLandmark />;
            default: return <FaBuilding />;
        }
    };

    // ==================== RENDER ====================


    return (
        <div className="invoice-form-container" style={{ position: 'relative' }}>
            {watermarkText && (
                <div style={watermarkStyle}>
                    {watermarkText}
                </div>
            )}
            {/* HEADER */}
            <div className="invoice-form-header">
                <h1>
                    <FaFileInvoice />
                    {headerTitle || (isEditMode ? `Modifier ${DOCUMENT_TYPE_LABELS[formData.documentType]}` : DOCUMENT_TYPE_LABELS[formData.documentType])}
                    {!headerTitle && (
                        <span className="document-badge">
                            {formData.documentType}
                        </span>
                    )}
                </h1>
                <p>Créez et gérez vos documents de facturation professionnels</p>
            </div>

            {/* FORMULAIRE */}
            <form className="invoice-form" onSubmit={handleSubmit}>

                {/* SECTION 1: TYPE DE FACTURATION */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaCreditCard />
                        </div>
                        <div className="section-header-content">
                            <h2>Type de facturation et paiement</h2>
                            <p>Sélectionnez le type de client et le mode de paiement</p>
                        </div>
                    </div>

                    <div className="section-body">
                        <div className="form-grid form-grid-2">
                            {/* Type de facturation */}
                            <div className="form-field">
                                <label className="form-label">
                                    Type de facturation <span className="form-label-required">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    value={formData.billingType}
                                    onChange={(e) => handleBillingTypeChange(e.target.value as BillingType)}
                                    disabled={readonly}
                                    required
                                >
                                    {Object.entries(BILLING_TYPE_LABELS).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                                <span className="form-help-text">
                                    {getBillingTypeIcon(formData.billingType)} {BILLING_TYPE_LABELS[formData.billingType]}
                                </span>
                            </div>

                            {/* Type de vente */}
                            <div className="form-field">
                                <label className="form-label">
                                    Type de vente <span className="form-label-required">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    value={formData.serviceType || 'vente_article'}
                                    onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value as 'vente_article' | 'prestation_services' }))}
                                    disabled={readonly}
                                    required
                                >
                                    <option value="vente_article">Vente d'articles</option>
                                    <option value="prestation_services">Prestation de services</option>
                                </select>
                            </div>

                            {/* Mode de paiement */}
                            <div className="form-field">
                                <label className="form-label">
                                    Mode de paiement <span className="form-label-required">*</span>
                                </label>
                                <select
                                    className="form-select"
                                    value={formData.paymentMethod}
                                    onChange={(e) => setFormData(prev => ({ ...prev, paymentMethod: e.target.value as PaymentMethod }))}
                                    disabled={readonly}
                                    required
                                >
                                    {Object.entries(PAYMENT_METHOD_LABELS).map(([value, label]) => (
                                        <option key={value} value={value}>{label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* RNE */}
                            <div className="form-field full-width">
                                <div className="form-checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="hasRNE"
                                        className="form-checkbox"
                                        checked={formData.hasRNE}
                                        onChange={(e) => setFormData(prev => ({ ...prev, hasRNE: e.target.checked }))}
                                        disabled={readonly}
                                    />
                                    <label htmlFor="hasRNE" className="form-checkbox-label">
                                        Régime Normal d'Entreprise (RNE)
                                    </label>
                                </div>
                            </div>

                            {/* Champ RNE conditionnel */}
                            {formData.hasRNE && (
                                <div className="form-field full-width conditional-field">
                                    <label className="form-label">
                                        Numéro RNE <span className="form-label-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.rneNumber || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, rneNumber: e.target.value }))}
                                        placeholder="Ex: RNE123456789"
                                        disabled={readonly}
                                        required={formData.hasRNE}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* SECTION 1.5: DOCUMENTS joints */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaPaperclip />
                        </div>
                        <div className="section-header-content">
                            <h2>Documents justificatifs</h2>
                            <p>Ajoutez les documents liés à cette facture</p>
                        </div>
                    </div>

                    <div className="section-body">
                        <div className="form-grid form-grid-2">
                            {/* Bon de commande ou contrat */}
                            <div className="form-field">
                                <label className="form-label">
                                    Bon de commande ou contrat
                                </label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        id="purchaseOrderFile"
                                        className="file-upload-input"
                                        onChange={(e) => handleFileChange('purchaseOrderFile', e.target.files?.[0] || null)}
                                        disabled={readonly}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="purchaseOrderFile" className="file-upload-label" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        background: '#f8fafc',
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '12px',
                                        cursor: readonly ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        color: '#64748b'
                                    }}>
                                        <FaUpload style={{ color: '#3b82f6' }} />
                                        <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {formData.purchaseOrderFile ? (typeof formData.purchaseOrderFile === 'string' ? 'Document déjà joint' : (formData.purchaseOrderFile as File).name) : 'Choisir un fichier...'}
                                        </span>
                                    </label>
                                </div>
                                <span className="form-help-text">PDF, JPG ou PNG (Max. 5Mo)</span>
                            </div>

                            {/* Bon de livraison */}
                            <div className="form-field">
                                <label className="form-label">
                                    Bon de livraison
                                </label>
                                <div className="file-upload-container">
                                    <input
                                        type="file"
                                        id="deliveryNoteFile"
                                        className="file-upload-input"
                                        onChange={(e) => handleFileChange('deliveryNoteFile', e.target.files?.[0] || null)}
                                        disabled={readonly}
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="deliveryNoteFile" className="file-upload-label" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        padding: '0.75rem 1rem',
                                        background: '#f8fafc',
                                        border: '2px dashed #e2e8f0',
                                        borderRadius: '12px',
                                        cursor: readonly ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.2s',
                                        color: '#64748b'
                                    }}>
                                        <FaUpload style={{ color: '#3b82f6' }} />
                                        <span style={{ fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {formData.deliveryNoteFile ? (typeof formData.deliveryNoteFile === 'string' ? 'Document déjà joint' : (formData.deliveryNoteFile as File).name) : 'Choisir un fichier...'}
                                        </span>
                                    </label>
                                </div>
                                <span className="form-help-text">PDF, JPG ou PNG (Max. 5Mo)</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: INFORMATIONS CLIENT */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            {getBillingTypeIcon(formData.billingType)}
                        </div>
                        <div className="section-header-content">
                            <h2>Informations client</h2>
                            <p>Détails du client pour la facturation</p>
                        </div>
                    </div>

                    <div className="section-body">
                        <div className="form-grid form-grid-2">
                            {/* NCC (uniquement pour B2B) */}
                            {formData.billingType === BillingType.B2B && (
                                <div className="form-field conditional-field">
                                    <label className="form-label">
                                        NCC du client <span className="form-label-required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.clientInfo.ncc || ''}
                                        onChange={(e) => handleClientInfoChange('ncc', e.target.value)}
                                        placeholder="Numéro de Compte Contribuable"
                                        disabled={readonly}
                                        required
                                    />
                                </div>
                            )}

                            {/* Nom du client */}
                            <div className="form-field">
                                <label className="form-label">
                                    Nom de la société / du client <span className="form-label-required">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formData.clientInfo.clientName}
                                    onChange={(e) => handleClientInfoChange('clientName', e.target.value)}
                                    placeholder="Nom complet"
                                    disabled={readonly}
                                    required
                                />
                            </div>

                            {/* Téléphone */}
                            <div className="form-field">
                                <label className="form-label">
                                    Téléphone {formData.billingType === BillingType.B2B && <span className="form-label-required">*</span>}
                                </label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={formData.clientInfo.phone || ''}
                                    onChange={(e) => handleClientInfoChange('phone', e.target.value)}
                                    placeholder="+237 6XX XXX XXX"
                                    disabled={readonly}
                                    required={formData.billingType === BillingType.B2B}
                                />
                            </div>

                            {/* Email */}
                            <div className="form-field">
                                <label className="form-label">
                                    Email {formData.billingType === BillingType.B2B && <span className="form-label-required">*</span>}
                                </label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={formData.clientInfo.email || ''}
                                    onChange={(e) => handleClientInfoChange('email', e.target.value)}
                                    placeholder="email@example.com"
                                    disabled={readonly}
                                    required={formData.billingType === BillingType.B2B}
                                />
                            </div>

                            {/* Devise (uniquement pour B2F) */}
                            {formData.billingType === BillingType.B2F && (
                                <>
                                    <div className="form-field conditional-field">
                                        <label className="form-label">
                                            Devise <span className="form-label-required">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            value={formData.clientInfo.currency || 'XAF'}
                                            onChange={(e) => handleClientInfoChange('currency', e.target.value)}
                                            disabled={readonly}
                                            required
                                        >
                                            {CURRENCY_OPTIONS.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-field conditional-field">
                                        <label className="form-label">
                                            Taux de change <span className="form-label-required">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            className="form-input"
                                            value={formData.clientInfo.exchangeRate || 1}
                                            onChange={(e) => handleClientInfoChange('exchangeRate', parseFloat(e.target.value))}
                                            placeholder="1.00"
                                            disabled={readonly}
                                            required
                                        />
                                    </div>
                                </>
                            )}

                            {/* Autres mentions */}
                            <div className="form-field full-width">
                                <label className="form-label">
                                    Autres mentions
                                </label>
                                <textarea
                                    className="form-textarea"
                                    value={formData.clientInfo.additionalNotes || ''}
                                    onChange={(e) => handleClientInfoChange('additionalNotes', e.target.value)}
                                    placeholder="Informations complémentaires..."
                                    disabled={readonly}
                                    rows={3}
                                />
                            </div>

                            {/* Pied de page */}
                            <div className="form-field full-width">
                                <label className="form-label">
                                    Pied de page
                                </label>
                                <textarea
                                    className="form-textarea"
                                    value={formData.clientInfo.footerText || ''}
                                    onChange={(e) => handleClientInfoChange('footerText', e.target.value)}
                                    placeholder="Texte à afficher en bas du document..."
                                    disabled={readonly}
                                    rows={2}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: ARTICLES */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaCalculator />
                        </div>
                        <div className="section-header-content">
                            <h2>Articles et lignes de facturation</h2>
                            <p>Ajoutez les produits ou services à facturer</p>
                        </div>
                    </div>

                    <div className="section-body">
                        <div style={{ overflowX: 'auto' }}>
                            <table className="line-items-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '80px' }}>Qté</th>
                                        <th style={{ width: '120px' }}>Référence</th>
                                        <th style={{ minWidth: '200px' }}>Désignation</th>
                                        <th style={{ width: '120px' }}>Unité</th>
                                        <th style={{ width: '120px' }}>Prix Unit. HT</th>
                                        <th style={{ width: '100px' }}>Remise %</th>
                                        <th style={{ width: '100px' }}>Taxe</th>
                                        <th style={{ width: '130px' }}>Total HT</th>
                                        <th style={{ width: '50px' }}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formData.lineItems.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.quantity}
                                                    onChange={(e) => handleLineItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                                                    min="0"
                                                    step="1"
                                                    disabled={readonly}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={item.reference}
                                                    onChange={(e) => handleLineItemChange(item.id, 'reference', e.target.value)}
                                                    placeholder="REF-001"
                                                    disabled={readonly}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={item.designation}
                                                    onChange={(e) => handleLineItemChange(item.id, 'designation', e.target.value)}
                                                    placeholder="Description du produit/service"
                                                    disabled={readonly}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="table-select"
                                                    value={item.unitOfMeasure}
                                                    onChange={(e) => handleLineItemChange(item.id, 'unitOfMeasure', e.target.value as UnitOfMeasure)}
                                                    disabled={readonly}
                                                >
                                                    {Object.entries(UNIT_OF_MEASURE_LABELS).map(([value, label]) => (
                                                        <option key={value} value={value}>{label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.unitPriceHT}
                                                    onChange={(e) => handleLineItemChange(item.id, 'unitPriceHT', parseFloat(e.target.value) || 0)}
                                                    min="0"
                                                    step="0.01"
                                                    disabled={readonly}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="table-input"
                                                    value={item.discountPercent}
                                                    onChange={(e) => handleLineItemChange(item.id, 'discountPercent', parseFloat(e.target.value) || 0)}
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    disabled={readonly}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    className="table-select"
                                                    value={item.taxCode}
                                                    onChange={(e) => handleLineItemChange(item.id, 'taxCode', e.target.value as TaxRateCode)}
                                                    disabled={readonly}
                                                >
                                                    {TAX_RATE_OPTIONS.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
                                                {!readonly && (
                                                    <button
                                                        type="button"
                                                        onClick={() => addLineItemTax(item.id)}
                                                        style={{
                                                            fontSize: '10px',
                                                            marginTop: '2px',
                                                            display: 'block',
                                                            color: 'var(--primary)',
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontWeight: '600'
                                                        }}
                                                    >
                                                        + Autre taxe
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                <span className="table-total">
                                                    {formatCurrency(item.totalHT, formData.clientInfo.currency)}
                                                </span>
                                            </td>
                                            <td>
                                                {formData.lineItems.length > 1 && !readonly && (
                                                    <button
                                                        type="button"
                                                        className="table-delete-btn"
                                                        onClick={() => removeLineItem(item.id)}
                                                        title="Supprimer la ligne"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* LINE ADDITIONAL TAXES DISPLAY */}
                        {formData.lineItems.some(item => (item.additionalTaxes ?? []).length > 0) && (
                            <div className="line-additional-taxes-summary" style={{ marginTop: '1rem', padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--primary)' }}>
                                    <FaMoneyBillWave size={16} /> Taxes additionnelles par ligne
                                </h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                                    {formData.lineItems.map(item =>
                                        (item.additionalTaxes ?? []).length > 0 && (
                                            <div key={`line-tax-${item.id}`} style={{ padding: '1rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                                                <div style={{ fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--bg-secondary)', paddingBottom: '0.5rem' }}>
                                                    {item.designation || item.reference || 'Sans nom'}
                                                </div>
                                                {(item.additionalTaxes ?? []).map(tax => (
                                                    <div key={tax.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                        <input
                                                            type="text"
                                                            className="table-input"
                                                            style={{ flex: 2 }}
                                                            value={tax.name}
                                                            onChange={(e) => handleLineItemAdditionalTaxChange(item.id, tax.id, 'name', e.target.value)}
                                                            placeholder="Nom taxe"
                                                        />
                                                        <input
                                                            type="number"
                                                            className="table-input"
                                                            style={{ flex: 1 }}
                                                            value={tax.percent}
                                                            onChange={(e) => handleLineItemAdditionalTaxChange(item.id, tax.id, 'percent', parseFloat(e.target.value) || 0)}
                                                            placeholder="%"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeLineItemTax(item.id, tax.id)}
                                                            style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0.5rem' }}
                                                        >
                                                            <FaTrash size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}

                        {!readonly && (
                            <button
                                type="button"
                                className="add-item-btn"
                                onClick={addLineItem}
                            >
                                <FaPlus /> Ajouter une ligne
                            </button>
                        )}
                    </div>
                </section>

                {/* SECTION 4: AUTRES TAXES */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaMoneyBillWave />
                        </div>
                        <div className="section-header-content">
                            <h2>Autres taxes</h2>
                            <p>Taxes supplémentaires sur le sous-total</p>
                        </div>
                    </div>

                    <div className="section-body">
                        {formData.additionalTaxes.length > 0 && (
                            <div className="form-grid form-grid-3">
                                {formData.additionalTaxes.map((tax) => (
                                    <React.Fragment key={tax.id}>
                                        <div className="form-field">
                                            <label className="form-label">Nom de la taxe</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={tax.name}
                                                onChange={(e) => handleAdditionalTaxChange(tax.id, 'name', e.target.value)}
                                                placeholder="Ex: Taxe municipale"
                                                disabled={readonly}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="form-label">Taxe %</label>
                                            <input
                                                type="number"
                                                className="form-input"
                                                value={tax.percent}
                                                onChange={(e) => handleAdditionalTaxChange(tax.id, 'percent', parseFloat(e.target.value) || 0)}
                                                min="0"
                                                max="100"
                                                step="0.01"
                                                disabled={readonly}
                                            />
                                        </div>
                                        <div className="form-field" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {!readonly && (
                                                <button
                                                    type="button"
                                                    className="table-delete-btn"
                                                    onClick={() => removeAdditionalTax(tax.id)}
                                                    style={{ width: '100%', padding: '0.75rem' }}
                                                >
                                                    <FaTrash /> Supprimer
                                                </button>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {!readonly && (
                            <button
                                type="button"
                                className="add-item-btn"
                                onClick={addAdditionalTax}
                            >
                                <FaPlus /> Ajouter une taxe
                            </button>
                        )}
                    </div>
                </section>

                {/* SECTION 5: REMISE GLOBALE */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaCalculator />
                        </div>
                        <div className="section-header-content">
                            <h2>Remise globale</h2>
                            <p>Réduction sur le total HT</p>
                        </div>
                    </div>

                    <div className="section-body">
                        <div className="form-grid form-grid-2">
                            <div className="form-field">
                                <label className="form-label">
                                    Remise %
                                    <span className="form-label-info">0 - 100%</span>
                                </label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={formData.globalDiscount.percent}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        globalDiscount: {
                                            ...prev.globalDiscount,
                                            percent: parseFloat(e.target.value) || 0
                                        }
                                    }))}
                                    min="0"
                                    max="100"
                                    step="0.01"
                                    disabled={readonly}
                                />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Montant de la remise</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={formatCurrency(formData.totals.totalDiscount, formData.clientInfo.currency)}
                                    disabled
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: TAXES SUR TOTAL TTC */}
                <section className="form-section">
                    <div className="section-header">
                        <div className="section-header-icon">
                            <FaCalculator />
                        </div>
                        <div className="section-header-content">
                            <h2 style={{ textTransform: 'uppercase', fontSize: '1rem' }}>TAXES SUR TOTAL TTC</h2>
                            <p>Taxes appliquées après le calcul du TTC</p>
                        </div>
                    </div>

                    <div className="section-body">
                        {formData.totalTaxes.length > 0 && (
                            <div className="form-grid" style={{ gridTemplateColumns: 'minmax(200px, 2fr) 1fr 1.5fr auto', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="form-label" style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Nom</div>
                                <div className="form-label" style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Taxe (%)</div>
                                <div className="form-label" style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600 }}>Montant de la taxe sur le total TTC</div>
                                <div></div>

                                {formData.totalTaxes.map((tax) => {
                                    // Base = TTC avant les taxes finales
                                    const baseForTTC = formData.totals.totalTTC - formData.totals.totalTTCTaxes;
                                    const amount = (baseForTTC * tax.percent) / 100;

                                    return (
                                        <React.Fragment key={tax.id}>
                                            <div className="form-field">
                                                <input
                                                    type="text"
                                                    className="form-input"
                                                    value={tax.name}
                                                    onChange={(e) => handleTotalTaxChange(tax.id, 'name', e.target.value)}
                                                    placeholder="Ex: AIRSI"
                                                    disabled={readonly}
                                                />
                                            </div>
                                            <div className="form-field">
                                                <input
                                                    type="number"
                                                    className="form-input"
                                                    value={tax.percent}
                                                    onChange={(e) => handleTotalTaxChange(tax.id, 'percent', parseFloat(e.target.value) || 0)}
                                                    min="0"
                                                    max="100"
                                                    step="0.01"
                                                    disabled={readonly}
                                                />
                                            </div>
                                            <div className="form-field">
                                                <div className="form-input" style={{ backgroundColor: '#f8fafc', textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderStyle: 'solid', borderColor: '#e2e8f0', color: '#64748b' }}>
                                                    {formatCurrency(amount, formData.clientInfo.currency)}
                                                </div>
                                            </div>
                                            <div className="form-field" style={{ display: 'flex', alignItems: 'center' }}>
                                                {!readonly && (
                                                    <button
                                                        type="button"
                                                        className="table-delete-btn"
                                                        onClick={() => removeTotalTax(tax.id)}
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        )}

                        {!readonly && (
                            <button
                                type="button"
                                className="add-item-btn"
                                onClick={addTotalTax}
                                style={{ border: 'none', background: 'none', color: '#0ea5e9', fontSize: '0.85rem', padding: 0, justifyContent: 'flex-start', boxShadow: 'none', transform: 'none' }}
                            >
                                <FaPlus size={10} /> <span style={{ textDecoration: 'underline' }}>Ajouter une taxe</span>
                            </button>
                        )}
                    </div>
                </section>

                {/* RÉSUMÉ DE LA FACTURE */}
                {/* RÉSUMÉ DE LA FACTURE UNIFIÉ */}
                <div className="invoice-summary" style={{
                    background: '#f1f8fe',
                    borderRadius: '24px',
                    padding: '2.5rem',
                    marginTop: '2rem',
                    border: '1px solid #e1eefc'
                }}>
                    <h3 style={{
                        color: '#106bbd',
                        textTransform: 'uppercase',
                        fontSize: '0.9rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        RÉSUMÉ DE LA FACTURE
                    </h3>

                    {/* Bloc Haut: Tableau des taxes (en blanc pour la distinction) */}
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '1.5rem',
                        marginBottom: '2rem',
                        border: '1px solid rgba(16, 107, 189, 0.1)',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={{ textAlign: 'left', padding: '0.75rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>CATÉGORIE</th>
                                    <th style={{ textAlign: 'right', padding: '0.75rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SOUS-TOTAL</th>
                                    <th style={{ textAlign: 'center', padding: '0.75rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>TAUX</th>
                                    <th style={{ textAlign: 'right', padding: '0.75rem', fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>TOTAL TVA</th>
                                </tr>
                            </thead>
                            <tbody>
                                {formData.totals.taxSummary.map((tax, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '0.875rem 0.75rem', fontSize: '0.85rem', color: '#334155' }}>{tax.label}</td>
                                        <td style={{ textAlign: 'right', padding: '0.875rem 0.75rem', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>{formatCurrency(tax.baseHT, formData.clientInfo.currency)}</td>
                                        <td style={{ textAlign: 'center', padding: '0.875rem 0.75rem', fontSize: '0.85rem', color: '#334155' }}>{tax.rate}%</td>
                                        <td style={{ textAlign: 'right', padding: '0.875rem 0.75rem', fontSize: '0.85rem', color: '#334155', fontWeight: 600 }}>{formatCurrency(tax.amount, formData.clientInfo.currency)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bloc Bas: Totaux */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Total HT</span>
                            <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>{formatCurrency(formData.totals.subtotalHT, formData.clientInfo.currency)}</span>
                        </div>
                        {formData.totals.totalDiscount > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                                <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Remise ({formData.globalDiscount.percent}%)</span>
                                <span style={{ fontSize: '1.1rem', color: '#10b981', fontWeight: 700 }}>- {formatCurrency(formData.totals.totalDiscount, formData.clientInfo.currency)}</span>
                            </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Total HT après remise</span>
                            <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>{formatCurrency(formData.totals.totalAfterDiscount, formData.clientInfo.currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Total TVA</span>
                            <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>{formatCurrency(formData.totals.totalTaxAmount, formData.clientInfo.currency)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                            <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Total TTC</span>
                            <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>{formatCurrency(formData.totals.totalTTC - formData.totals.totalTTCTaxes, formData.clientInfo.currency)}</span>
                        </div>
                        {formData.totals.totalTTCTaxes > 0 && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: '1px solid #e1eefc' }}>
                                <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>Autres taxes</span>
                                <span style={{ fontSize: '1.1rem', color: '#1e293b', fontWeight: 700 }}>{formatCurrency(formData.totals.totalTTCTaxes, formData.clientInfo.currency)}</span>
                            </div>
                        )}
                    </div>

                    {/* NET A PAYER Block */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.75rem 2.5rem',
                        background: 'linear-gradient(90deg, #10b981 0%, #0369a1 100%)',
                        borderRadius: '16px',
                        color: 'white',
                        boxShadow: '0 10px 15px -3px rgba(3, 105, 161, 0.2)'
                    }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>NET A PAYER</span>
                        <span style={{ fontSize: '1.85rem', fontWeight: 800 }}>{formatCurrency(formData.totals.totalTTC, formData.clientInfo.currency)}</span>
                    </div>

                    {/* Acompte / Reste à payer if relevant */}
                    {formData.acompte > 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '1rem',
                            padding: '1.5rem 2.5rem',
                            background: 'linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)',
                            borderRadius: '16px',
                            color: 'white',
                            boxShadow: '0 8px 12px -3px rgba(29, 78, 216, 0.2)'
                        }}>
                            <span style={{ fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase' }}>Reste à payer</span>
                            <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatCurrency(formData.totals.netAPayer, formData.clientInfo.currency)}</span>
                        </div>
                    )}
                </div>

                {/* ACTIONS */}
                {!readonly && (
                    <div className="form-actions">
                        {onCancel && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                <FaTimes /> Annuler
                            </button>
                        )}
                        {onSaveDraft && (
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={handleSaveDraft}
                                disabled={isLoading}
                            >
                                <FaSave /> Brouillon
                            </button>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>Enregistrement...</>
                            ) : (
                                <>
                                    <FaCheck /> {submitLabel || (isEditMode ? 'Enregistrer les modifications' : `Créer ${DOCUMENT_TYPE_LABELS[formData.documentType].toLowerCase()}`)}
                                </>
                            )}
                        </button>
                    </div>
                )}
            </form>

            {/* Commission Payment Modal */}
            {pendingFormData && (
                <InvoiceCommissionModal
                    isOpen={isCommissionModalOpen}
                    onClose={handleCommissionModalClose}
                    onPaymentSuccess={handleCommissionPaymentSuccess}
                    invoice={pendingFormData}
                    commissionRate={0.025}
                />
            )}
        </div>
    );
};

export default InvoiceForm;
