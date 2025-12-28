import React, { useState } from 'react';
import Card from '../../../../components/ui/Card';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { Lock, ShieldAlert } from 'lucide-react';

const SecuritySettings = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2rem', color: 'var(--text-main)' }}>Mot de passe</h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <Input label="Mot de passe actuel" type="password" icon={<Lock size={18} />} />
                    <Input label="Nouveau mot de passe" type="password" icon={<Lock size={18} />} />
                    <Input label="Confirmer le nouveau mot de passe" type="password" icon={<Lock size={18} />} />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn btn-outline">Mettre à jour le mot de passe</button>
                    </div>
                </div>
            </Card>

            <Card style={{ padding: '1.5rem', border: '1px solid #FECACA', backgroundColor: '#FEF2F2' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                    <div style={{ color: '#DC2626', padding: '0.75rem', backgroundColor: '#FEE2E2', borderRadius: '50%' }}>
                        <ShieldAlert size={24} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#991B1B', marginBottom: '0.5rem' }}>Double Authentification (2FA)</h4>
                        <p style={{ fontSize: '0.9rem', color: '#B91C1C', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                            Ajoutez une couche de sécurité supplémentaire à votre compte en activant la vérification par SMS ou App.
                        </p>
                        <button className="btn" style={{ backgroundColor: '#DC2626', border: 'none', color: 'white', fontWeight: '600' }}>Activer la 2FA</button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SecuritySettings;
