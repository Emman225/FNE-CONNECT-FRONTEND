import React, { useState } from 'react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import Button from '../../../../components/ui/Button';
import PaymentMethodSelector from './PaymentMethodSelector';
import Input from '../../../../components/ui/Input';

const PaymentModal = ({ isOpen, onClose, invoice, type = 'invoice' }) => {
    const [step, setStep] = useState(1); // 1: Method, 2: Phone/Card, 3: Processing, 4: Success
    const [method, setMethod] = useState(null);
    const [phone, setPhone] = useState('');

    if (!isOpen) return null;

    const isFneInvoice = type === 'invoice';

    const handleProcess = () => {
        setStep(3);
        setTimeout(() => {
            setStep(4);
        }, 2500); // Fake processing time
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
        }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '480px', padding: '2rem', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={20} /></button>

                {step === 1 && (
                    <>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Choisir un moyen de paiement</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Pour régler {isFneInvoice ? 'la facture' : (type === 'quote' ? 'le devis' : 'la proforma')} {invoice?.number}</p>
                        <div style={{ marginBottom: '2rem' }}>
                            <PaymentMethodSelector selected={method} onSelect={setMethod} />
                        </div>
                        <Button disabled={!method} onClick={() => setStep(2)} style={{ width: '100%' }}>Continuer</Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Entrez vos coordonnées</h3>
                        <Input
                            label={method === 'card' ? "Numéro de carte" : "Numéro de téléphone"}
                            placeholder={method === 'card' ? "0000 0000 0000 0000" : "01 02 03 04 05"}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ marginBottom: '2rem' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Button variant="outline" onClick={() => setStep(1)} style={{ width: '100%' }}>Retour</Button>
                            <Button onClick={handleProcess} style={{ width: '100%' }}>Payer {invoice?.amount?.toLocaleString()} F</Button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <Loader2 size={48} className="spin" style={{ color: 'var(--color-primary)', marginBottom: '1rem', animation: 'spin 1s linear infinite' }} />
                        <h3 style={{ fontWeight: '600' }}>Traitement en cours...</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>Veuillez valider sur votre mobile.</p>
                        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                    </div>
                )}

                {step === 4 && (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ width: '64px', height: '64px', backgroundColor: '#DCFCE7', color: '#16A34A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                            <ShieldCheck size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Paiement Réussi !</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>Votre règlement a été pris en compte.</p>

                        {isFneInvoice ? (
                            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem', borderLeft: '4px solid var(--primary)' }}>
                                <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: '500' }}>FNE CONNECT vérifie actuellement vos informations.</p>
                                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Une fois validée, votre facture FNE vous sera envoyée directement par mail.</p>
                            </div>
                        ) : (
                            <div style={{ backgroundColor: 'var(--bg-main)', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'left', fontSize: '0.9rem', borderLeft: '4px solid var(--success)' }}>
                                <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: '500' }}>Votre {type === 'quote' ? 'devis' : 'proforma'} a été généré avec succès.</p>
                                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>Vous pouvez maintenant le télécharger ou l'envoyer directement à votre client.</p>
                            </div>
                        )}

                        <Button onClick={onClose} style={{ width: '100%' }}>Compris, fermer</Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PaymentModal;
