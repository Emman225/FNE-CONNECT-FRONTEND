import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../app/public/components/Navbar';
import RegistrationStepper from '../../../auth/components/RegistrationStepper';
import Step1Compte from './registration/Step1Compte';
import Step2Identite from './registration/Step2Identite';
import Step3Activite from './registration/Step3Activite';
import Step4Documents from './registration/Step4Documents';
import Step5Paiement from './registration/Step5Paiement';
import Step6Contrat from './registration/Step6Contrat';
import Step7Validation from './registration/Step7Validation';

const RegisterPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1
        phone: '',
        password: '',
        confirmPassword: '',
        // Step 2
        civilite: '',
        nationalite: '',
        nom: '',
        prenoms: '',
        dateNaissance: '',
        lieuNaissance: '',
        adresse: '',
        email: '',
        // Step 3
        typeActivite: '',
        descriptionActivite: '',
        nomCommercial: '',
        anneeDebut: '',
        // Step 4
        cniRecto: null,
        cniVerso: null,
        cniSelfie: null,
        justificatifDomicile: null,
        // Step 5
        typeComptePaiement: '',
        telPaiement: '',
        // Step 6
        agreements: {
            cgu: false,
            confidentialite: false,
            contratFiscal: false
        }
    });

    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 7));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = () => {
        // Handle final submission
        console.log('Final form data:', formData);
        // Simulate API call
        setTimeout(() => {
            nextStep(); // Go to validation step
        }, 1000);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1Compte data={formData} updateData={updateFormData} onNext={nextStep} />;
            case 2:
                return <Step2Identite data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <Step3Activite data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <Step4Documents data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 5:
                return <Step5Paiement data={formData} updateData={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 6:
                return <Step6Contrat data={formData} updateData={updateFormData} onSubmit={handleSubmit} onBack={prevStep} />;
            case 7:
                return <Step7Validation />;
            default:
                return <Step1Compte data={formData} updateData={updateFormData} onNext={nextStep} />;
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
            {/* Public Navbar */}
            <Navbar />

            {/* Main Content */}
            <div style={{ padding: '3rem 1rem', maxWidth: '900px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: 'var(--primary)',
                        marginBottom: '0.5rem'
                    }}>
                        Créer votre compte
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                        Étape {currentStep} sur 7
                    </p>
                </div>

                {/* Stepper */}
                <RegistrationStepper currentStep={currentStep} totalSteps={7} />

                {/* Step Content */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2.5rem',
                    boxShadow: 'var(--shadow-md)',
                    marginBottom: '2rem'
                }}>
                    {renderStep()}
                </div>

                {/* Bottom Link - Only show on first step */}
                {currentStep === 1 && (
                    <div style={{
                        marginTop: '2rem',
                        textAlign: 'center',
                        fontSize: '0.9rem'
                    }}>
                        Déjà un compte ? <Link to="/auth/login" style={{ fontWeight: '600', color: 'var(--primary)' }}>Se connecter</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RegisterPage;
