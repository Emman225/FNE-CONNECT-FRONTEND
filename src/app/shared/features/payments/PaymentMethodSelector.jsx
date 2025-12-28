import React from 'react';
import { Smartphone, CreditCard } from 'lucide-react';

const METHODS = [
    { id: 'om', name: 'Orange Money', icon: <Smartphone size={24} />, color: '#FF7900' },
    { id: 'mtn', name: 'MTN MoMo', icon: <Smartphone size={24} />, color: '#FFCC00' },
    { id: 'wave', name: 'Wave', icon: <Smartphone size={24} />, color: '#1E64EC' },
    { id: 'card', name: 'Carte Bancaire', icon: <CreditCard size={24} />, color: '#1F2937' },
];

const PaymentMethodSelector = ({ selected, onSelect }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {METHODS.map((method) => (
                <button
                    key={method.id}
                    type="button"
                    onClick={() => onSelect(method.id)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem',
                        borderRadius: '12px',
                        border: selected === method.id ? `2px solid ${method.color}` : '1px solid #E5E7EB',
                        backgroundColor: selected === method.id ? '#F9FAFB' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        textAlign: 'left'
                    }}
                >
                    <div style={{
                        color: method.color,
                        backgroundColor: selected === method.id ? 'white' : '#F3F4F6',
                        padding: '0.5rem',
                        borderRadius: '8px'
                    }}>
                        {method.icon}
                    </div>
                    <span style={{ fontWeight: '600', color: '#374151' }}>{method.name}</span>
                </button>
            ))}
        </div>
    );
};

export default PaymentMethodSelector;
