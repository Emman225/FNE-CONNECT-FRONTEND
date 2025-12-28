import React, { useState } from 'react';
import Button from '../../../../components/ui/Button';
import { Download, FileText, Calendar, Filter } from 'lucide-react';
import { MOCK_AML_ALERTS } from '../../../data/mockData';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNotifications } from '../../../context/NotificationContext';

const CentifReportGenerator = () => {
    const { showSuccess, showLoading, dismissToast } = useNotifications();
    const [reportPeriod, setReportPeriod] = useState('current_month');
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
    const [includeResolved, setIncludeResolved] = useState(true);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        const loadingToast = showLoading('Génération du rapport CENTIF en cours...');

        // Simulate report generation
        setTimeout(() => {
            dismissToast(loadingToast);
            showSuccess('Rapport CENTIF généré avec succès !');
            setIsGenerating(false);

            // Simulate download
            console.log('Downloading CENTIF report:', {
                period: reportPeriod,
                startDate,
                endDate,
                includeResolved
            });
        }, 2500);
    };

    const getAlertStats = () => {
        const alerts = MOCK_AML_ALERTS;
        return {
            total: alerts.length,
            pending: alerts.filter(a => a.status === 'pending').length,
            reviewed: alerts.filter(a => a.status === 'reviewed').length,
            high: alerts.filter(a => a.severity === 'high').length,
            medium: alerts.filter(a => a.severity === 'medium').length,
            low: alerts.filter(a => a.severity === 'low').length
        };
    };

    const stats = getAlertStats();

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '2px solid var(--border-color)'
            }}>
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-lighter)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <FileText size={28} color="var(--primary)" />
                </div>
                <div>
                    <h2 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        marginBottom: '0.25rem',
                        color: 'var(--text-main)'
                    }}>
                        Rapport CENTIF
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Cellule Nationale de Traitement des Informations Financières
                    </p>
                </div>
            </div>

            {/* Stats Preview */}
            <div style={{
                backgroundColor: 'var(--bg-main)',
                borderRadius: 'var(--radius-md)',
                padding: '1.5rem',
                marginBottom: '2rem'
            }}>
                <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--text-main)'
                }}>
                    Aperçu des Données
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '1rem'
                }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Total Alertes
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                            {stats.total}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            En Attente
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#D97706' }}>
                            {stats.pending}
                        </p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                            Haute Priorité
                        </p>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#DC2626' }}>
                            {stats.high}
                        </p>
                    </div>
                </div>
            </div>

            {/* Period Selection */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: 'var(--text-main)'
                }}>
                    Période du rapport
                </label>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                    {[
                        { value: 'current_month', label: 'Mois en cours' },
                        { value: 'last_month', label: 'Mois dernier' },
                        { value: 'quarter', label: 'Trimestre' },
                        { value: 'custom', label: 'Personnalisé' }
                    ].map((option) => (
                        <label
                            key={option.value}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                border: reportPeriod === option.value ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                cursor: 'pointer',
                                backgroundColor: reportPeriod === option.value ? 'var(--primary-lighter)' : 'white',
                                textAlign: 'center',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                transition: 'all var(--transition-normal)'
                            }}
                        >
                            <input
                                type="radio"
                                name="period"
                                value={option.value}
                                checked={reportPeriod === option.value}
                                onChange={(e) => setReportPeriod(e.target.value)}
                                style={{ display: 'none' }}
                            />
                            {option.label}
                        </label>
                    ))}
                </div>

                {reportPeriod === 'custom' && (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)'
                            }}>
                                Date de début
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>
                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginBottom: '0.5rem',
                                color: 'var(--text-main)'
                            }}>
                                Date de fin
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: '0.9375rem'
                                }}
                                className="input-field"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Options */}
            <div style={{ marginBottom: '2rem' }}>
                <label style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    color: 'var(--text-main)'
                }}>
                    Options du rapport
                </label>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    <label style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '1rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        backgroundColor: 'white'
                    }}>
                        <input
                            type="checkbox"
                            checked={includeResolved}
                            onChange={(e) => setIncludeResolved(e.target.checked)}
                            style={{ width: '18px', height: '18px' }}
                        />
                        <div>
                            <div style={{ fontWeight: '500', fontSize: '0.9375rem' }}>
                                Inclure les alertes résolues
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                Ajouter les alertes déjà traitées dans le rapport
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            {/* Info Box */}
            <div style={{
                backgroundColor: '#DBEAFE',
                border: '1px solid #3B82F6',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '2rem'
            }}>
                <p style={{ fontSize: '0.875rem', color: '#1E40AF', fontWeight: '500' }}>
                    ℹ️ Le rapport sera généré au format PDF conforme aux exigences de la CENTIF. Il inclura toutes les alertes AML, les actions prises, et les justifications.
                </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem' }}>
                <Button
                    variant="outline"
                    style={{ flex: 1 }}
                    disabled={isGenerating}
                >
                    <Filter size={18} /> Prévisualiser
                </Button>
                <Button
                    onClick={handleGenerateReport}
                    style={{ flex: 1 }}
                    disabled={isGenerating}
                >
                    <Download size={18} /> {isGenerating ? 'Génération...' : 'Générer le rapport'}
                </Button>
            </div>
        </div>
    );
};

export default CentifReportGenerator;
