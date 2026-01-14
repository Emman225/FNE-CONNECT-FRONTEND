import React, { useState, useEffect } from 'react';
import {
    FaFileInvoice, FaBuilding, FaUser, FaGlobe, FaLandmark,
    FaCreditCard, FaMoneyBillWave, FaPlus, FaTrash, FaCheck,
    FaTimes, FaCalculator, FaInfoCircle, FaSave
} from 'react-icons/fa';
import {
    DocumentType,
    BillingType,
    PaymentMethod,
    UnitOfMeasure,
    TaxRate,
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

        totals: initialData?.totals || {
            subtotalHT: 0,
            totalDiscount: 0,
            totalAfterDiscount: 0,
            totalTaxAmount: 0,
            totalAdditionalTaxes: 0,
            totalTTCTaxes: 0,
            totalTTC: 0
        }
    });

    // Calculs automatiques
    const calculatedTotals = useInvoiceCalculations(
        formData.lineItems,
        formData.additionalTaxes,
        formData.globalDiscount,
        formData.totalTaxes
    );

    // Mettre à jour les totaux calculés
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            totals: calculatedTotals
        }));
    }, [calculatedTotals]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!readonly && onSubmit) {
            await onSubmit(formData);
        }
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
                                                    value={item.taxRate}
                                                    onChange={(e) => handleLineItemChange(item.id, 'taxRate', parseFloat(e.target.value) as TaxRate)}
                                                    disabled={readonly}
                                                >
                                                    {TAX_RATE_OPTIONS.map(option => (
                                                        <option key={option.value} value={option.value}>{option.label}</option>
                                                    ))}
                                                </select>
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
                            <FaMoneyBillWave />
                        </div>
                        <div className="section-header-content">
                            <h2>Taxes sur le total TTC</h2>
                            <p>Taxes appliquées après le calcul du TTC</p>
                        </div>
                    </div>

                    <div className="section-body">
                        {formData.totalTaxes.length > 0 && (
                            <div className="form-grid form-grid-3">
                                {formData.totalTaxes.map((tax) => (
                                    <React.Fragment key={tax.id}>
                                        <div className="form-field">
                                            <label className="form-label">Nom de la taxe</label>
                                            <input
                                                type="text"
                                                className="form-input"
                                                value={tax.name}
                                                onChange={(e) => handleTotalTaxChange(tax.id, 'name', e.target.value)}
                                                placeholder="Ex: CTP"
                                                disabled={readonly}
                                            />
                                        </div>
                                        <div className="form-field">
                                            <label className="form-label">Taxe %</label>
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
                                        <div className="form-field" style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            {!readonly && (
                                                <button
                                                    type="button"
                                                    className="table-delete-btn"
                                                    onClick={() => removeTotalTax(tax.id)}
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
                                onClick={addTotalTax}
                            >
                                <FaPlus /> Ajouter une taxe
                            </button>
                        )}
                    </div>
                </section>

                {/* RÉCAPITULATIF */}
                <div className="invoice-summary">
                    <h3>
                        <FaInfoCircle /> Récapitulatif
                    </h3>

                    <div className="summary-row">
                        <span className="summary-label">Sous-total HT</span>
                        <span className="summary-value">
                            {formatCurrency(formData.totals.subtotalHT, formData.clientInfo.currency)}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span className="summary-label">Remise globale ({formData.globalDiscount.percent}%)</span>
                        <span className="summary-value">
                            - {formatCurrency(formData.totals.totalDiscount, formData.clientInfo.currency)}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span className="summary-label">Total après remise</span>
                        <span className="summary-value">
                            {formatCurrency(formData.totals.totalAfterDiscount, formData.clientInfo.currency)}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span className="summary-label">Taxes (lignes)</span>
                        <span className="summary-value">
                            {formatCurrency(formData.totals.totalTaxAmount, formData.clientInfo.currency)}
                        </span>
                    </div>

                    {formData.additionalTaxes.length > 0 && (
                        <div className="summary-row">
                            <span className="summary-label">Autres taxes</span>
                            <span className="summary-value">
                                {formatCurrency(formData.totals.totalAdditionalTaxes, formData.clientInfo.currency)}
                            </span>
                        </div>
                    )}

                    {formData.totalTaxes.length > 0 && (
                        <div className="summary-row">
                            <span className="summary-label">Taxes sur TTC</span>
                            <span className="summary-value">
                                {formatCurrency(formData.totals.totalTTCTaxes, formData.clientInfo.currency)}
                            </span>
                        </div>
                    )}

                    <div className="summary-row total">
                        <span className="summary-label">TOTAL TTC</span>
                        <span className="summary-value">
                            {formatCurrency(formData.totals.totalTTC, formData.clientInfo.currency)}
                        </span>
                    </div>
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
        </div>
    );
};

export default InvoiceForm;
