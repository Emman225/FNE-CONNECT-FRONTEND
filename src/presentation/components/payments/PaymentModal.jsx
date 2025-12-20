import React, { useState } from 'react';
import { X, ShieldCheck, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import PaymentMethodSelector from './PaymentMethodSelector';
import Input from '../ui/Input';

const PaymentModal = ({ isOpen, onClose, invoice }) => {
    const [step, setStep] = useState(1); // 1: Method, 2: Phone/Card, 3: Processing, 4: Success
    const [method, setMethod] = useState(null);
    const [phone, setPhone] = useState('');

    if (!isOpen) return null;

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
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Pour régler la facture {invoice?.number}</p>
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
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>La facture a été réglée avec succès.</p>
                        <Button onClick={onClose} style={{ width: '100%' }}>Fermer</Button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PaymentModal;
