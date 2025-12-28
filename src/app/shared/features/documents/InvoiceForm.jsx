import React, { useState, useEffect } from 'react';
import Card from '../../../../components/ui/Card';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { Plus, Trash2, Save, FileCheck } from 'lucide-react';
import { calculateInvoiceTotals, formatCurrency } from '../../../../utils/financialUtils';
import { useNavigate } from 'react-router-dom';

const InvoiceForm = () => {
    const navigate = useNavigate();
    const [client, setClient] = useState({ name: '', phone: '', email: '' });
    const [items, setItems] = useState([{ id: 1, name: '', quantity: 1, price: 0 }]);
    const [config, setConfig] = useState({ applyTva: false, applyAirsi: false });
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
        // Logic to save
        alert('Facture enregistrée avec succès !');
        navigate('/dashboard/invoices');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', alignItems: 'start' }}>

                {/* Main Form Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Client Section */}
                    <Card>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: '600' }}>Informations Client</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input
                                label="Nom du client"
                                placeholder="Rechercher ou saisir..."
                                value={client.name}
                                onChange={(e) => setClient({ ...client, name: e.target.value })}
                                required
                            />
                            <Input
                                label="Téléphone"
                                placeholder="+225..."
                                value={client.phone}
                                onChange={(e) => setClient({ ...client, phone: e.target.value })}
                            />
                        </div>
                    </Card>

                    {/* Items Section */}
                    <Card>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>Articles & Prestations</h3>
                            <Button type="button" variant="outline" onClick={addItem} size="sm">
                                <Plus size={16} /> Ajouter une ligne
                            </Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {items.map((item, index) => (
                                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1.5fr 0.5fr', gap: '1rem', alignItems: 'end', paddingBottom: '1rem', borderBottom: '1px solid #F3F4F6' }}>
                                    <Input
                                        label={index === 0 ? "Description" : ""}
                                        placeholder="Désignation"
                                        value={item.name}
                                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                                        required
                                    />
                                    <Input
                                        label={index === 0 ? "Qté" : ""}
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    <Input
                                        label={index === 0 ? "Prix Unitaire" : ""}
                                        type="number"
                                        min="0"
                                        value={item.price}
                                        onChange={(e) => updateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        style={{ color: 'var(--color-danger)', border: 'none', background: 'none', cursor: 'pointer', padding: '0.5rem' }}
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
                    <Card>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: '600' }}>Résumé</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Total HT</span>
                                <span style={{ fontWeight: '600' }}>{formatCurrency(totals.totalHT)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={config.applyTva} onChange={(e) => setConfig({ ...config, applyTva: e.target.checked })} />
                                    TVA (18%)
                                </label>
                                <span>{formatCurrency(totals.tvaAmount)}</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={config.applyAirsi} onChange={(e) => setConfig({ ...config, applyAirsi: e.target.checked })} />
                                    AIRSI (5%)
                                </label>
                                <span style={{ color: 'var(--color-danger)' }}>-{formatCurrency(totals.airsiAmount)}</span>
                            </div>

                            <div style={{ borderTop: '1px solid #E5E7EB', margin: '0.5rem 0' }}></div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.125rem', fontWeight: '700', color: 'var(--color-primary)' }}>
                                <span>Net à Payer</span>
                                <span>{formatCurrency(totals.netToPay)}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <Button type="submit" style={{ width: '100%' }}>
                                <FileCheck size={18} /> Valider la facture
                            </Button>
                            <Button type="button" variant="outline" style={{ width: '100%' }}>
                                <Save size={18} /> Enregistrer brouillon
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </form>
    );
};

export default InvoiceForm;
