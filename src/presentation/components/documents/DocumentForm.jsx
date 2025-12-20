import React, { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Plus, Trash2, Save, FileCheck, FileText } from 'lucide-react';
import { calculateInvoiceTotals, formatCurrency } from '../../../core/utils/financialUtils';
import { useNavigate } from 'react-router-dom';

const DocumentForm = ({ type = 'invoice' }) => {
    const navigate = useNavigate();
    const isQuote = type === 'quote';

    const [client, setClient] = useState({ name: '', phone: '', email: '' });
    const [items, setItems] = useState([{ id: 1, name: '', quantity: 1, price: 0 }]);
    const [config, setConfig] = useState({ applyTva: false, applyAirsi: false });
    const [validity, setValidity] = useState('30 jours'); // For quotes
    const [totals, setTotals] = useState({ totalHT: 0, tvaAmount: 0, totalTTC: 0, airsiAmount: 0, netToPay: 0 });

    useEffect(() => {
        const t = calculateInvoiceTotals(items, config.applyTva, config.applyAirsi);
        setTotals(t);
    }, [items, config]);

    const addItem = () => {
        setItems([...items, { id: Date.now(), name: '', quantity: 1, price: 0 }]);
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
        const message = isQuote ? 'Devis créé avec succès !' : 'Facture créée avec succès !';
        alert(message);
        navigate(isQuote ? '/dashboard/quotes' : '/dashboard/invoices');
    };

    // MOCK CLIENTS DATA for Invoice Form
    const MOCK_CLIENTS = [
        { id: 1, name: 'Jean Doe', phone: '0708091011', email: 'jean@gmail.com' },
        { id: 2, name: 'Entreprise ABC', phone: '0102030405', email: 'contact@abc.ci' },
        { id: 3, name: 'Marc Konan', phone: '0505050505', email: '' },
        { id: 4, name: 'Sarah Koffi', phone: '0707070707', email: 'sarah@koffi.com' }
    ];

    const handleClientChange = (e) => {
        const clientName = e.target.value;
        const selectedClient = MOCK_CLIENTS.find(c => c.name === clientName);

        if (selectedClient) {
            setClient({
                name: selectedClient.name,
                phone: selectedClient.phone,
                email: selectedClient.email || ''
            });
        } else {
            setClient({ ...client, name: clientName });
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>

                {/* Main Form Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Client Section */}
                    <Card style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: '700', color: 'var(--text-main)' }}>Informations Client</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="flex flex-col gap-1 w-full" style={{ marginBottom: '1rem' }}>
                                <label style={{
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    marginBottom: '0.5rem',
                                    color: 'var(--text-main)',
                                    display: 'block'
                                }}>
                                    Nom du client
                                </label>
                                <select
                                    className="input-field"
                                    value={client.name}
                                    onChange={handleClientChange}
                                    style={{
                                        width: '100%',
                                        height: '46px',
                                        backgroundColor: 'white'
                                    }}
                                    required
                                >
                                    <option value="">Sélectionner un client</option>
                                    {MOCK_CLIENTS.map((c) => (
                                        <option key={c.id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <Input
                                label="Téléphone"
                                placeholder="+225..."
                                value={client.phone}
                                onChange={(e) => setClient({ ...client, phone: e.target.value })}
                            />
                        </div>
                        {isQuote && (
                            <div style={{ marginTop: '1.5rem' }}>
                                <Input
                                    label="Validité de l'offre"
                                    value={validity}
                                    onChange={(e) => setValidity(e.target.value)}
                                />
                            </div>
                        )}
                    </Card>

                    {/* Items Section */}
                    <Card style={{ padding: '1.5rem' }}>
                        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>Articles & Prestations</h3>
                            <button type="button" onClick={addItem} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                <Plus size={16} /> Ajouter
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '3fr 0.8fr 1.5fr 0.5fr', gap: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                <div>Description</div>
                                <div>Qté</div>
                                <div>Prix Unitaire</div>
                                <div></div>
                            </div>
                            {items.map((item, index) => (
                                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '3fr 0.8fr 1.5fr 0.5fr', gap: '1rem', alignItems: 'center' }}>
                                    <Input
                                        placeholder="Désignation"
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                        required
                                        style={{ marginBottom: 0 }}
                                    />
                                    <Input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                        required
                                        style={{ marginBottom: 0 }}
                                    />
                                    <Input
                                        type="number"
                                        min="0"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                        required
                                        style={{ marginBottom: 0 }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        className="btn-icon"
                                        style={{ color: 'var(--danger)', alignSelf: 'center', justifySelf: 'center' }}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Sidebar Area (Totals & Actions) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Card style={{ padding: '1.5rem', position: 'sticky', top: '2rem' }}>
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
                            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                {isQuote ? <FileText size={18} /> : <FileCheck size={18} />}
                                {isQuote ? ' Enregistrer le Devis' : ' Valider la Facture'}
                            </button>
                            <button type="button" className="btn btn-light" style={{ width: '100%', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}>
                                <Save size={18} /> Enregistrer brouillon
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default DocumentForm;
