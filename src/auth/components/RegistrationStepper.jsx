import React from 'react';
import { Check } from 'lucide-react';

const RegistrationStepper = ({ currentStep, totalSteps = 7 }) => {
    const steps = [
        { number: 1, label: 'Compte', icon: '👤' },
        { number: 2, label: 'Identité', icon: '🪪' },
        { number: 3, label: 'Activité', icon: '💼' },
        { number: 4, label: 'Documents', icon: '📄' },
        { number: 5, label: 'Paiement', icon: '💳' },
        { number: 6, label: 'Contrat', icon: '📋' },
        { number: 7, label: 'Validation', icon: '✓' }
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '3rem',
            position: 'relative',
            padding: '0 1rem'
        }}>
            {/* Progress Line */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '0',
                right: '0',
                height: '3px',
                backgroundColor: 'var(--border-color)',
                zIndex: 0
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
                    backgroundColor: 'var(--primary)',
                    transition: 'width 0.3s ease'
                }} />
            </div>

            {/* Steps */}
            {steps.map((step) => {
                const isCompleted = step.number < currentStep;
                const isActive = step.number === currentStep;
                const isFuture = step.number > currentStep;

                return (
                    <div
                        key={step.number}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 1
                        }}
                    >
                        {/* Circle */}
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: isCompleted ? 'var(--primary)' : isActive ? 'var(--primary)' : 'white',
                            border: `3px solid ${isCompleted || isActive ? 'var(--primary)' : 'var(--border-color)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem',
                            fontWeight: '600',
                            color: isCompleted || isActive ? 'white' : 'var(--text-muted)',
                            transition: 'all 0.3s ease',
                            marginBottom: '0.5rem'
                        }}>
                            {isCompleted ? <Check size={20} /> : step.icon}
                        </div>

                        {/* Label */}
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: isActive ? '600' : '500',
                            color: isActive ? 'var(--primary)' : isFuture ? 'var(--text-muted)' : 'var(--text-secondary)',
                            textAlign: 'center',
                            whiteSpace: 'nowrap'
                        }}>
                            {step.label}
                        </span>
                    </div>
                );
            })}

            {/* Responsive styles */}
            <style>{`
                @media (max-width: 768px) {
                    /* Hide labels on mobile */
                    span {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default RegistrationStepper;
