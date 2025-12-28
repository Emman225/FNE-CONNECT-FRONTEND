import React from 'react';

const Stepper = ({ currentStep, totalSteps = 6 }) => {
    const progress = ((currentStep) / (totalSteps)) * 100;

    return (
        <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>
                <span>Étape {currentStep} sur {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: 'var(--color-primary)',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                }}></div>
            </div>
        </div>
    );
};

export default Stepper;
