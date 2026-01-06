import React, { useState, useEffect } from 'react';
import Card from '../../../../components/ui/Card';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { Plus, Trash2, Save, FileCheck, FileText } from 'lucide-react';
import { calculateInvoiceTotals, formatCurrency } from '../../../../utils/financialUtils';
import { useNavigate } from 'react-router-dom';

const DocumentForm = ({ type = 'invoice', isPublic = false }) => {
    const navigate = useNavigate();
    const isQuote = type === 'quote';

    const [client, setClient] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        ncc: '',
        regime: 'Particulier'
    });

    const [docInfo, setDocInfo] = useState({
        date: new Date().toISOString().split('T')[0],
        reference: `INV-${Math.floor(Date.now() / 1000)}`,
        paymentMode: 'Virement',
        pdv: 'SIEGE' // Point de Vente
    });

    const [serviceType, setServiceType] = useState('Prestation de service');
    const [contractFile, setContractFile] = useState(null);
    const [items, setItems] = useState([{
        id: 1,
        ref: '',
        name: '',
        quantity: 1,
        unit: 'JOURS',
        price: 0,
        discount: 0,
        tva: 18
    }]);

    const [config, setConfig] = useState({ applyAirsi: false });
    const [validity, setValidity] = useState('30 jours');
    const [totals, setTotals] = useState({ totalHT: 0, tvaAmount: 0, totalTTC: 0, airsiAmount: 0, netToPay: 0 });

    const isComplete = client.name && client.ncc && items.every(i => i.name && i.quantity > 0 && i.price > 0);

    useEffect(() => {
        // Updated calculation logic integrating per-item tva and global airsi
        let totalHT = 0;
        let totalTVA = 0;

        items.forEach(item => {
            const lineHT = (item.quantity * item.price) * (1 - (item.discount / 100));
            totalHT += lineHT;
            totalTVA += lineHT * (item.tva / 100);
        });

        const airsiAmount = config.applyAirsi ? (totalHT * 0.05) : 0;
        const totalTTC = totalHT + totalTVA;
        const netToPay = totalTTC + airsiAmount;

        setTotals({ totalHT, tvaAmount: totalTVA, totalTTC, airsiAmount, netToPay });
    }, [items, config]);

    const addItem = () => {
        setItems([...items, {
            id: Date.now(),
            ref: '',
            name: '',
            quantity: 1,
            unit: 'JOURS',
            price: 0,
            discount: 0,
            tva: 18
        }]);
    };

    const removeItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    const updateItem = (id, field, value) => {
        setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isPublic) {
            alert("Veuillez vous abonner pour générer et télécharger ce document officiel.");
            return;
        }

        const fullDoc = {
            ...docInfo,
            type,
            client,
            items,
            totals,
            serviceType,
            validity: isQuote ? validity : null
        };

        console.log('FNE Data Payload:', fullDoc);
        alert(`${isQuote ? 'Devis' : (type === 'proforma' ? 'Facture Proforma' : 'Facture')} générée. Transmission aux services FNE...`);
        navigate(type === 'quote' ? '/dashboard/quotes' : (type === 'proforma' ? '/dashboard/proformas' : '/dashboard/invoices'));
    };

    // MOCK CLIENTS DATA based on FNE examples
    const MOCK_CLIENTS = [
        { id: 1, name: 'AFRICA PROJECT MANAGEMENT', ncc: '1339220 N', phone: '0707070707', email: 'k.dibi@apm.ci', address: 'Abidjan, Riviera' },
        { id: 2, name: 'SITE COTE D\'IVOIRE', ncc: '1441119U', phone: '0704729820', email: 'loss4fr@yahoo.fr', address: 'BP 3321 ABIDJAN' },
    ];

    const handleClientChange = (e) => {
        const clientName = e.target.value;
        const selectedClient = MOCK_CLIENTS.find(c => c.name === clientName);

        if (selectedClient) {
            setClient({
                name: selectedClient.name,
                ncc: selectedClient.ncc,
                phone: selectedClient.phone,
                email: selectedClient.email || '',
                address: selectedClient.address || '',
                regime: 'TEE' // Default for company mock
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            maxWidth: '1600px',
            margin: '0 auto',
            position: 'relative',
            padding: '0 1rem'
        }}>
            {isPublic && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    fontSize: '120px',
                    fontWeight: '900',
                    color: 'rgba(239, 68, 68, 0.1)',
                    pointerEvents: 'none',
                    zIndex: 10,
                    whiteSpace: 'nowrap',
                    textTransform: 'uppercase',
                    userSelect: 'none'
                }}>
                    Brouillon
                </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'start' }}>

                {/* Left Side: Header & Client (Grid span 8) */}
                <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Header Facture */}
                    <Card style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <Input
                                label="N° Pièce (ID FNE)"
                                value={docInfo.reference}
                                onChange={(e) => setDocInfo({ ...docInfo, reference: e.target.value })}
                            />
                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Mode de Paiement</label>
                                <select className="input-field" value={docInfo.paymentMode} onChange={(e) => setDocInfo({ ...docInfo, paymentMode: e.target.value })} style={{ backgroundColor: 'white' }}>
                                    <option value="Virement">Virement</option>
                                    <option value="Espèces">Espèces</option>
                                    <option value="Chèque">Chèque</option>
                                    <option value="Mobile Money">Mobile Money</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    {/* Client (Standard FNE) */}
                    <Card style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.5rem' }}>Informations Client (Obligatoires FNE)</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Sélectionner Client</label>
                                <select className="input-field" onChange={handleClientChange} style={{ backgroundColor: 'white' }}>
                                    <option value="">-- Nouveau Client / Autre --</option>
                                    {MOCK_CLIENTS.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <Input
                                label="Nom / Raison Sociale"
                                value={client.name}
                                onChange={(e) => setClient({ ...client, name: e.target.value })}
                                required
                            />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                            <Input
                                label="NCC (Numéro de Compte Contribuable)"
                                placeholder="Ex: 1234567 A"
                                value={client.ncc}
                                onChange={(e) => setClient({ ...client, ncc: e.target.value })}
                                required
                            />
                            <div className="flex flex-col gap-1">
                                <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Régime d'Imposition</label>
                                <select className="input-field" value={client.regime} onChange={(e) => setClient({ ...client, regime: e.target.value })} style={{ backgroundColor: 'white' }}>
                                    <option value="TEE">TEE</option>
                                    <option value="Réel Normal">Réel Normal</option>
                                    <option value="Réel Simplifié">Réel Simplifié</option>
                                    <option value="Microentreprise">Microentreprise</option>
                                    <option value="Particulier">Particulier</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1rem' }}>
                            <Input
                                label="Téléphone / E-mail"
                                value={client.phone || client.email}
                                placeholder="Contact..."
                                onChange={(e) => setClient({ ...client, phone: e.target.value })}
                            />
                            <Input
                                label="Adresse / Localisation"
                                value={client.address}
                                placeholder="Abidjan, CI..."
                                onChange={(e) => setClient({ ...client, address: e.target.value })}
                            />
                        </div>

                        {!isQuote && (
                            <div style={{ marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                                <label style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.8rem', display: 'block' }}>Bon de commande / Contrat joint</label>
                                <div style={{
                                    border: '2px dashed var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: '1rem',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: 'var(--bg-main)'
                                }}
                                    onClick={() => document.getElementById('contract-upload').click()}
                                >
                                    <input
                                        id="contract-upload"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => setContractFile(e.target.files[0])}
                                    />
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                        {contractFile ? contractFile.name : 'Joindre un document (Optionnel)'}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Right Side: Totals (Grid span 4) */}
                <div style={{ gridColumn: 'span 4', position: 'sticky', top: '2rem' }}>
                    <Card style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Résumé</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.925rem' }}>
                            <div className="flex-between">
                                <span style={{ color: 'var(--text-secondary)' }}>Total HT</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>{formatCurrency(totals.totalHT)}</span>
                            </div>

                            <div className="flex-between">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
                                    <input type="checkbox" checked={config.applyTva} onChange={(e) => setConfig({ ...config, applyTva: e.target.checked })} style={{ accentColor: 'var(--primary)' }} />
                                    TVA (18%)
                                </label>
                                <span>{formatCurrency(totals.tvaAmount)}</span>
                            </div>

                            <div className="flex-between">
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>
                                    <input type="checkbox" checked={config.applyAirsi} onChange={(e) => setConfig({ ...config, applyAirsi: e.target.checked })} style={{ accentColor: 'var(--primary)' }} />
                                    AIRSI (5%)
                                </label>
                                <span style={{ color: 'var(--danger)' }}>-{formatCurrency(totals.airsiAmount)}</span>
                            </div>

                            <div style={{ borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }}></div>

                            <div className="flex-between" style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>
                                <span>{isQuote ? 'Total TTC' : 'Net à Payer'}</span>
                                <span>{formatCurrency(totals.netToPay)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center' }}
                                disabled={!isComplete && !isPublic}
                            >
                                {isQuote ? <FileText size={18} /> : (type === 'proforma' ? <FileText size={18} /> : <FileCheck size={18} />)}
                                {isPublic ? ' Générer (Abonnement requis)' : (isQuote ? ' Enregistrer le Devis' : (type === 'proforma' ? ' Valider la Proforma' : ' Valider la Facture'))}
                            </button>
                            {!isPublic && (
                                <button
                                    type="button"
                                    onClick={() => alert('Brouillon enregistré avec succès !')}
                                    className="btn btn-light"
                                    style={{ width: '100%', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', backgroundColor: 'white' }}
                                >
                                    <Save size={18} /> Enregistrer brouillon
                                </button>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Bottom Part: Item Table (Full Width - Grid span 12) */}
                <div style={{ gridColumn: 'span 12', marginTop: '1rem' }}>
                    <Card style={{ padding: '2rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>Détails de la Vente</h3>
                            <button type="button" onClick={addItem} className="btn-secondary" style={{ padding: '0.6rem 1rem' }}><Plus size={18} /> Ajouter une ligne</button>
                        </div>

                        <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 4.5fr 1.5fr 0.8fr 1.2fr 0.8fr 0.8fr 0.5fr', gap: '1rem', padding: '1.25rem 1.5rem', backgroundColor: 'var(--bg-main)', borderBottom: '2px solid var(--border-color)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--text-main)', textAlign: 'center' }}>
                                <div>Réf</div>
                                <div style={{ textAlign: 'left' }}>Désignation</div>
                                <div>P.U HT (FCFA)</div>
                                <div>Qté</div>
                                <div>Unité</div>
                                <div>TVA (%)</div>
                                <div>Rem (%)</div>
                                <div></div>
                            </div>
                            <div style={{ backgroundColor: 'white' }}>
                                {items.map((item) => (
                                    <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '1fr 4.5fr 1.5fr 0.8fr 1.2fr 0.8fr 0.8fr 0.5fr', gap: '1rem', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                                        <Input value={item.ref} onChange={(e) => updateItem(item.id, 'ref', e.target.value)} style={{ marginBottom: 0 }} placeholder="REF" />
                                        <Input value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} style={{ marginBottom: 0 }} placeholder="Description de l'article ou service..." required />
                                        <Input type="number" value={item.price} onChange={(e) => updateItem(item.id, 'price', e.target.value)} style={{ marginBottom: 0, textAlign: 'right' }} />
                                        <Input type="number" value={item.quantity} onChange={(e) => updateItem(item.id, 'quantity', e.target.value)} style={{ marginBottom: 0, textAlign: 'center' }} />
                                        <div className="flex flex-col">
                                            <select className="input-field" value={item.unit} onChange={(e) => updateItem(item.id, 'unit', e.target.value)} style={{ height: '46px', backgroundColor: 'white', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                                                <option value="JOURS">JOURS</option>
                                                <option value="MOIS">MOIS</option>
                                                <option value="FORFAIT">FORFAIT</option>
                                            </select>
                                        </div>
                                        <Input type="number" value={item.tva} onChange={(e) => updateItem(item.id, 'tva', e.target.value)} style={{ marginBottom: 0, textAlign: 'center' }} />
                                        <Input type="number" value={item.discount} onChange={(e) => updateItem(item.id, 'discount', e.target.value)} style={{ marginBottom: 0, textAlign: 'center' }} />
                                        <button type="button" onClick={() => removeItem(item.id)} className="hover-lift" style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                                            <Trash2 size={22} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default DocumentForm;
